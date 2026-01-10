"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { Footer } from "@/components/footer"
import { XCircle, Mail, Phone, MessageCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function OrderFailedPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [referenceNumber] = useState(`REF-${Math.floor(Math.random() * 100000)}`)

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
          <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-rose-600/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <XCircle className="w-12 h-12 text-red-500" />
            <div className="absolute inset-0 rounded-full border-4 border-red-500/20 animate-pulse" />
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Order Processing Issue
          </h1>
          <p className={`text-lg md:text-xl mb-3 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
            We encountered a problem with your order
          </p>
          <p className={`text-base mb-8 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Don't worry - your payment has NOT been charged. Our team will contact you shortly to resolve this issue.
          </p>

          <div
            className={`rounded-xl p-6 mb-8 ${theme === "dark" ? "bg-zinc-800 border border-zinc-700" : "bg-gradient-to-br from-red-50 to-rose-50 border border-red-200"}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                Reference Number
              </span>
              <span className={`font-mono font-bold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                #{referenceNumber}
              </span>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 mb-8 text-left ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700" : "bg-amber-50 border border-amber-200"}`}
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`}
              />
              <div>
                <h3 className={`font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Common Reasons:
                </h3>
                <ul
                  className={`text-sm space-y-1 list-disc list-inside ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                >
                  <li>Payment method declined by your bank</li>
                  <li>Incorrect billing address information</li>
                  <li>Card security verification failed</li>
                  <li>Temporary system issue (very rare)</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            We're Here to Help
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <a
              href="mailto:support@Lumina4K.com"
              className={`rounded-xl p-5 text-center transition-all hover:scale-105 ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700 hover:border-orange-500" : "bg-gray-50 border border-gray-200 hover:border-orange-400 hover:shadow-md"}`}
            >
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-orange-500" />
              </div>
              <h4 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Email Us</h4>
              <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                Response within 1 hour
              </p>
            </a>

            <a
              href="tel:+18887654321"
              className={`rounded-xl p-5 text-center transition-all hover:scale-105 ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700 hover:border-orange-500" : "bg-gray-50 border border-gray-200 hover:border-orange-400 hover:shadow-md"}`}
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Call Us</h4>
              <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>1-888-765-4321</p>
            </a>

            <a
              href="/contact"
              className={`rounded-xl p-5 text-center transition-all hover:scale-105 ${theme === "dark" ? "bg-zinc-800/50 border border-zinc-700 hover:border-orange-500" : "bg-gray-50 border border-gray-200 hover:border-orange-400 hover:shadow-md"}`}
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <h4 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Live Chat</h4>
              <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>Available 24/7</p>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout" className="flex-1 sm:flex-none">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 w-full">
                Try Again
              </Button>
            </Link>
            <Link href="/cart" className="flex-1 sm:flex-none">
              <Button
                variant="outline"
                className={`px-8 py-6 w-full ${theme === "dark" ? "border-zinc-700 text-white hover:bg-zinc-800" : "border-gray-300 text-gray-900 hover:bg-gray-100"}`}
              >
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
