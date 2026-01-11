"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"
import { ArrowLeft, CreditCard, Shield, Truck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total, itemCount } = useCart()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (itemCount === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Your cart is empty
          </h1>
          <Link href="/product">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const taxes = total * 0.1
  const shippingCost = 0
  const grandTotal = total + taxes + shippingCost

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-[#fafafa]"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="lg:hidden">
          <div className={`p-4 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
            <Link href="/cart" className="flex items-center gap-2 text-orange-500">
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-4 lg:p-8">
          <div className="space-y-6">
            <div className="hidden lg:block">
              <Link href="/cart" className="flex items-center gap-2 text-orange-500 mb-6">
                <ArrowLeft className="w-5 h-5" />
                Back to Cart
              </Link>
            </div>

            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Checkout
            </h1>

            <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}>
              <h2 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Contact Information
              </h2>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className={`w-full p-3 rounded-lg border ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                />
              </div>
            </div>

            <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}>
              <h2 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className={`p-3 rounded-lg border ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className={`p-3 rounded-lg border ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                />
                <input
                  type="text"
                  placeholder="Address"
                  className={`col-span-2 p-3 rounded-lg border ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                />
                <input
                  type="text"
                  placeholder="City"
                  className={`p-3 rounded-lg border ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className={`p-3 rounded-lg border ${theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                />
              </div>
            </div>

            <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}>
              <h2 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Payment Method
              </h2>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 border-orange-500 ${theme === "dark" ? "bg-zinc-800" : "bg-orange-50"}`}>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-orange-500" />
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Credit Card
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}>
              <h2 className={`text-xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                      {item.name} × {item.quantity}
                    </span>
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`space-y-3 pt-4 border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
                <div className="flex justify-between">
                  <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>Subtotal</span>
                  <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>Taxes</span>
                  <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>Shipping</span>
                  <span className="text-green-500 font-semibold">FREE</span>
                </div>
                <div className={`flex justify-between text-lg font-bold pt-3 border-t ${theme === "dark" ? "border-zinc-800 text-white" : "border-gray-200 text-gray-900"}`}>
                  <span>Total</span>
                  <span className="text-orange-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-bold"
                onClick={() => router.push('/order-processing')}
              >
                Complete Order
              </Button>

              <div className={`mt-6 space-y-3 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Secure SSL encryption
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-500" />
                  Free shipping worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
