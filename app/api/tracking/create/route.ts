import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Generate unique tracking number
function generateTrackingNumber(): string {
  const prefix = 'LM4K'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    // Check if tracking already exists for this order
    const existingTracking = await prisma.trackingOrder.findUnique({
      where: { orderId: orderId }
    })

    if (existingTracking) {
      return NextResponse.json(existingTracking)
    }

    // Get order details
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Generate unique tracking number with retry logic
    let trackingNumber = generateTrackingNumber()
    let attempts = 0
    const maxAttempts = 5

    while (attempts < maxAttempts) {
      const existingTrackingNumber = await prisma.trackingOrder.findUnique({
        where: { trackingNumber }
      })

      if (!existingTrackingNumber) {
        break
      }

      trackingNumber = generateTrackingNumber()
      attempts++
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json({ error: 'Failed to generate unique tracking number' }, { status: 500 })
    }

    // Calculate timestamps for automatic progression
    const now = new Date()
    const confirmedAt = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour
    const transitAt = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 1 day
    const issueAt = new Date(now.getTime() + 36 * 60 * 60 * 1000) // 1.5 days
    const refundAt = new Date(now.getTime() + 72 * 60 * 60 * 1000) // 3 days
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days

    // Create tracking order
    const trackingOrder = await prisma.trackingOrder.create({
      data: {
        trackingNumber,
        orderId,
        customerName: `${order.firstName} ${order.lastName}`,
        email: order.email,
        phone: order.phone,
        status: 'confirmation',
        statusMessage: 'Votre commande a été reçue et est en cours de traitement.',
        confirmedAt,
        transitAt,
        issueAt,
        refundAt,
        expiresAt
      }
    })

    return NextResponse.json(trackingOrder)

  } catch (error) {
    console.error('Error creating tracking:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
