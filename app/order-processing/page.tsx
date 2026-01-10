"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { Footer } from "@/components/footer"
import { Package, Truck, Mail, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"

export default function OrderProcessingPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [orderNumber] = useState(`HT4K-${Math.floor(Math.random() * 100000)}`)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center px-4 py-12 ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}
      >
        <div
          className={`max-w-2xl w-full p-8 md:p-12 rounded-2xl text-center ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200 shadow-lg"}`}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
            <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-pulse" />
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            We're Preparing Your Order
          </h1>
          <p className={`text-lg md:text-xl mb-3 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
            Thank you for your purchase!
          </p>
          <p className={`text-base mb-8 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Your order has been received and is being processed by our team
          </p>

          <div
            className={`rounded-xl p-6 mb-8 ${theme === "dark" ? "bg-zinc-800 border border-zinc-700" : "bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200"}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>Order Number</span>
              <span className={`font-mono font-bold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                #{orderNumber}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8 text-left">
            <div
              className={`rounded-xl p-5 flex items-start gap-4 ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Order Confirmed
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  Your payment has been processed successfully
                </p>
              </div>
            </div>

            <div
              className={`rounded-xl p-5 flex items-start gap-4 ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Preparing for Shipment
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  Our warehouse team is carefully packaging your projector
                </p>
              </div>
            </div>

            <div
              className={`rounded-xl p-5 flex items-start gap-4 ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Shipping Soon
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  You'll receive tracking information within 2-4 hours
                </p>
              </div>
            </div>

            <div
              className={`rounded-xl p-5 flex items-start gap-4 ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Email Confirmation
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  Check your inbox for order details and tracking link
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 mb-6 ${theme === "dark" ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20" : "bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200"}`}
          >
            <p className={`text-sm font-medium ${theme === "dark" ? "text-orange-300" : "text-orange-800"}`}>
              🚚 Free Shipping • Estimated Delivery: 2-3 Days
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="flex-1 sm:flex-none">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 w-full">
                Back to Home
              </Button>
            </Link>
            <Link href="/product" className="flex-1 sm:flex-none">
              <Button
                variant="outline"
                className={`px-8 py-6 w-full ${theme === "dark" ? "border-zinc-700 text-white hover:bg-zinc-800" : "border-gray-300 text-gray-900 hover:bg-gray-100"}`}
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
