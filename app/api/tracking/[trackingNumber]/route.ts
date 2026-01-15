import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Update tracking status based on timestamps
function updateTrackingStatus(tracking: any): any {
  const now = new Date()
  
  if (tracking.refundAt && now >= new Date(tracking.refundAt)) {
    return {
      ...tracking,
      status: 'refund_processing',
      statusMessage: 'Votre commande a été remboursée en raison de problèmes de livraison.'
    }
  } else if (tracking.issueAt && now >= new Date(tracking.issueAt)) {
    return {
      ...tracking,
      status: 'delivery_issue',
      statusMessage: 'Il y a eu un problème avec la livraison. Notre équipe travaille à résoudre cela.'
    }
  } else if (tracking.transitAt && now >= new Date(tracking.transitAt)) {
    return {
      ...tracking,
      status: 'in_transit',
      statusMessage: 'Votre commande est en transit et sera livrée bientôt.'
    }
  } else if (tracking.confirmedAt && now >= new Date(tracking.confirmedAt)) {
    return {
      ...tracking,
      status: 'confirmed',
      statusMessage: 'Votre commande a été confirmée et est en préparation.'
    }
  }
  
  return tracking
}

export async function GET(
  request: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    const { trackingNumber } = params

    if (!trackingNumber) {
      return NextResponse.json({ error: 'Tracking number is required' }, { status: 400 })
    }

    // Find tracking order
    let tracking = await prisma.trackingOrder.findUnique({
      where: { trackingNumber },
      include: {
        order: {
          include: {
            orderItems: {
              include: {
                product: true
              }
            }
          }
        }
      }
    })

    if (!tracking) {
      return NextResponse.json({ error: 'Tracking number not found' }, { status: 404 })
    }

    // Check if expired (auto-cleanup)
    const now = new Date()
    if (tracking.expiresAt && now >= new Date(tracking.expiresAt)) {
      // Delete expired tracking
      await prisma.trackingOrder.delete({
        where: { trackingNumber }
      })
      return NextResponse.json({ error: 'Tracking information has expired' }, { status: 404 })
    }

    // Update status based on timestamps
    const updatedTracking = updateTrackingStatus(tracking)
    
    // Update in database if status changed
    if (updatedTracking.status !== tracking.status) {
      tracking = await prisma.trackingOrder.update({
        where: { trackingNumber },
        data: {
          status: updatedTracking.status,
          statusMessage: updatedTracking.statusMessage
        },
        include: {
          order: {
            include: {
              orderItems: {
                include: {
                  product: true
                }
              }
            }
          }
        }
      })
    }

    // Generate timeline for display
    const timeline = [
      {
        status: 'confirmation',
        label: 'Commande reçue',
        description: 'Votre commande a été reçue et est en cours de traitement',
        timestamp: tracking.createdAt,
        completed: true
      },
      {
        status: 'confirmed',
        label: 'Commande confirmée',
        description: 'Votre commande a été confirmée et est en préparation',
        timestamp: tracking.confirmedAt,
        completed: tracking.status !== 'confirmation'
      },
      {
        status: 'in_transit',
        label: 'En transit',
        description: 'Votre commande est en route vers vous',
        timestamp: tracking.transitAt,
        completed: ['in_transit', 'delivery_issue', 'refund_processing'].includes(tracking.status)
      },
      {
        status: 'delivery_issue',
        label: 'Problème de livraison',
        description: 'Il y a eu un problème avec la livraison',
        timestamp: tracking.issueAt,
        completed: ['delivery_issue', 'refund_processing'].includes(tracking.status)
      },
      {
        status: 'refund_processing',
        label: 'Remboursement en cours',
        description: 'Votre commande a été remboursée',
        timestamp: tracking.refundAt,
        completed: tracking.status === 'refund_processing'
      }
    ]

    return NextResponse.json({
      ...tracking,
      timeline
    })

  } catch (error) {
    console.error('Error fetching tracking:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
