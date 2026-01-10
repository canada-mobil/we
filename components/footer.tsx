"use client"

import Link from "next/link"
import { Star, Mail, Phone, Globe, CreditCard } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import { useState } from "react"

export function Footer() {
  const { theme } = useTheme()
  const [selectedCountry, setSelectedCountry] = useState("CA")
  const [selectedLanguage, setSelectedLanguage] = useState("EN")

  const paymentLogos = [
    { name: "Visa", src: "https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg" },
    { name: "Mastercard", src: "https://secure.payment-ca.com/assets/img/mastercard.svg" },
    { name: "Amex", src: "https://secure.payment-ca.com/assets/img/amex.svg" },
    { name: "UnionPay", src: "https://secure.payment-ca.com/assets/img/unionpay.svg" },
    { name: "JCB", src: "https://secure.payment-ca.com/assets/img/jcb.svg" },
    { name: "Discover", src: "https://secure.payment-ca.com/assets/img/discover.svg" },
    { name: "Diners", src: "https://secure.payment-ca.com/assets/img/diners.svg" },
  ]

  return (
    <footer
      className={`px-4 py-12 border-t ${theme === "dark" ? "bg-zinc-950 border-zinc-900" : "bg-[#f5f5f7] border-gray-200"}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">4K</span>
              </div>
              <span className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Lumina4K
              </span>
            </div>
            <p className={`text-xs leading-relaxed mb-3 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              Premium 4K projection for home theater enthusiasts.
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              ))}
              <span className={`font-semibold text-xs ml-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                4.9/5
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4
              className={`font-semibold mb-3 text-xs uppercase tracking-wide ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Product
            </h4>
            <ul className={`space-y-2 text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              <li>
                <Link href="/product" className="hover:text-orange-500 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-orange-500 transition-colors">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/specifications" className="hover:text-orange-500 transition-colors">
                  Specifications
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-orange-500 transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className={`font-semibold mb-3 text-xs uppercase tracking-wide ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Support
            </h4>
            <ul className={`space-y-2 text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-orange-500 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-orange-500 transition-colors">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`font-semibold mb-3 text-xs uppercase tracking-wide ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Contact
            </h4>
            <ul className={`space-y-2 text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-orange-500 flex-shrink-0" />
                <span className="truncate">support@cinema.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-orange-500 flex-shrink-0" />
                1-800-CINEMA
              </li>
              <li className={`text-[10px] mt-2 ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>
                24/7 Customer Support
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className={`py-5 border-t border-b mb-5 ${theme === "dark" ? "border-zinc-900" : "border-gray-300"}`}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentLogos.map((logo) => (
              <div
                key={logo.name}
                className={`h-8 px-2 rounded border flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    : "bg-white border-gray-300 hover:border-gray-400"
                }`}
              >
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-5 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Country & Language Selector */}
          <div className="flex items-center gap-2">
            <button
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
              onClick={() => setSelectedCountry(selectedCountry === "CA" ? "US" : "CA")}
            >
              <Globe className="w-3 h-3" />
              <span className="font-medium">{selectedCountry === "CA" ? "🇨🇦 Canada" : "🇺🇸 USA"}</span>
              <span className={`text-[10px] ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>
                {selectedCountry === "CA" ? "CAD $" : "USD $"}
              </span>
            </button>
            <button
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
              onClick={() => setSelectedLanguage(selectedLanguage === "EN" ? "FR" : "EN")}
            >
              <span className="font-medium">{selectedLanguage === "EN" ? "English" : "Français"}</span>
            </button>
          </div>

          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className={`text-[10px] ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>
              © 2026 Lumina4K. All rights reserved.
            </p>
            <div
              className={`flex items-center gap-3 text-[10px] ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
            >
              <Link href="/privacy" className="hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-orange-500 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/refund" className="hover:text-orange-500 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
