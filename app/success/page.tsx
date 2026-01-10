"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { Footer } from "@/components/footer"
import { Check, Package, Mail, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [orderNumber] = useState(`ORD-2026-${Math.floor(Math.random() * 10000)}`)

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
          className={`max-w-2xl w-full p-8 md:p-12 rounded-2xl text-center ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <Check className="w-10 h-10 text-green-500" />
            <Sparkles className="w-6 h-6 text-green-400 absolute -top-1 -right-1 animate-pulse" />
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Order Confirmed!
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Thank you for your purchase
          </p>

          <div
            className={`rounded-xl p-6 mb-8 ${theme === "dark" ? "bg-zinc-800 border border-zinc-700" : "bg-gray-100 border border-gray-200"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={theme === "dark" ? "text-zinc-400" : "text-gray-500"}>Order Number</span>
              <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>#{orderNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme === "dark" ? "text-zinc-400" : "text-gray-500"}>Estimated Delivery</span>
              <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                3-5 Business Days
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div
              className={`rounded-xl p-6 text-left ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Track Your Order
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    We'll send you tracking information once your order ships
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`rounded-xl p-6 text-left ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Order Confirmation
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    Check your email for the receipt and order details
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link href="/product">
              <Button
                variant="outline"
                className={`px-8 py-6 w-full sm:w-auto ${theme === "dark" ? "border-zinc-700 text-white hover:bg-zinc-800 bg-transparent" : "border-gray-300 text-gray-900 hover:bg-gray-100"}`}
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
