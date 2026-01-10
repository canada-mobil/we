"use client"

import { Truck, RefreshCcw, Shield, Clock, MapPin, Package } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ShippingPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Shipping & Returns
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Fast, free shipping with hassle-free returns
          </p>
        </div>

        {/* Free Shipping Section */}
        <div
          className={`rounded-2xl p-8 mb-8 ${theme === "dark" ? "bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30" : "bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200"}`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                FREE Express Shipping
              </h2>
              <p className={`text-lg mb-4 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
                All orders ship free to USA and Canada
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Clock className={`w-5 h-5 mt-0.5 ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`} />
                  <div>
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      2-3 Business Days Delivery
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                      Maximum delivery time to your door
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 mt-0.5 ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`} />
                  <div>
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Strategic Warehouses
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                      Locations in Toronto, Vancouver & New York
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div
          className={`rounded-2xl border p-8 mb-8 ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Shipping Details
          </h2>
          <div className="space-y-6">
            <div>
              <h3
                className={`font-semibold mb-2 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                <Package className="w-5 h-5 text-orange-500" />
                Processing Time
              </h3>
              <p className={`${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                Orders are processed within 24 hours Monday-Friday. Orders placed on weekends are processed on Monday.
              </p>
            </div>
            <div>
              <h3
                className={`font-semibold mb-2 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                <Truck className="w-5 h-5 text-orange-500" />
                Shipping Carriers
              </h3>
              <p className={`${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                We use FedEx Express and UPS Next Day Air for all shipments to ensure fast, reliable delivery.
              </p>
            </div>
            <div>
              <h3
                className={`font-semibold mb-2 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                <Shield className="w-5 h-5 text-orange-500" />
                Package Insurance
              </h3>
              <p className={`${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                All shipments are fully insured and require a signature upon delivery for your protection.
              </p>
            </div>
          </div>
        </div>

        {/* Returns Section */}
        <div
          className={`rounded-2xl border p-8 mb-8 ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <RefreshCcw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                14-Day Return Policy
              </h2>
              <p className={`${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                Not completely satisfied? Return it within 14 days for a full refund, no questions asked.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg ${theme === "dark" ? "bg-zinc-800/50" : "bg-white border border-gray-200"}`}
            >
              <h3 className={`font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Return Requirements
              </h3>
              <ul className={`space-y-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Product must be in original condition with all accessories and packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Return must be initiated within 14 days of delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Free return shipping label provided for all returns</span>
                </li>
              </ul>
            </div>

            <div
              className={`p-4 rounded-lg ${theme === "dark" ? "bg-zinc-800/50" : "bg-white border border-gray-200"}`}
            >
              <h3 className={`font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Refund Processing
              </h3>
              <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                Refunds are processed within 2-3 business days after we receive your return. The refund will be issued
                to your original payment method.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className={`mb-6 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Have questions about shipping or returns?
          </p>
          <Link href="/contact">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
