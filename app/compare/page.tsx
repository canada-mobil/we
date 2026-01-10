"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-hot-toast"

const packages = [
  {
    id: "starter",
    name: "Lumina 4K X1",
    price: 29.99,
    originalPrice: 69.99,
    image: "/img/61lopDncM+L._AC_SX425_.jpg",
    features: {
      "4K Resolution": true,
      "7500 Lumens": true,
      "HDR10 Support": true,
      '100" Screen Included': false,
      "Ceiling Mount": false,
      "Built-in Sound System (10W)": true,
      "FREE White Screen Backdrop": true,
      "2-Year Warranty": true,
    },
  },
  {
    id: "professional",
    name: "Lumina 4K Pro",
    price: 59.99,
    originalPrice: 109.99,
    image: "/4k-projector-professional-package-with-screen-prem.jpg",
    popular: true,
    features: {
      "4K Resolution": true,
      "9500 Lumens": true,
      "HDR10 Support": true,
      '100" Screen Included': true,
      "Ceiling Mount": true,
      "Enhanced Sound System (20W)": true,
      "FREE White Screen Backdrop": true,
      "5-Year Warranty": true,
    },
  },
  {
    id: "ultimate",
    name: "Lumina 4K Ultra",
    price: 129.99,
    originalPrice: 209.99,
    image: "/img/ultr.jpg",
    features: {
      "4K Resolution": true,
      "9500 Lumens": true,
      "HDR10 Support": true,
      '100" Screen Included': true,
      "Ceiling Mount": true,
      "Premium Sound System (40W Dolby Atmos)": true,
      "FREE White Screen Backdrop": true,
      "Lifetime Warranty": true,
    },
  },
]

export default function ComparePage() {
  const { theme } = useTheme()
  const { addItem } = useCart()

  const handleAddToCart = (pkg: (typeof packages)[0]) => {
    addItem({
      id: `projector-${pkg.id}`,
      name: `${pkg.name} Cinema Projector`,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      image: pkg.image,
      variant: pkg.name,
    })
    toast.success(`${pkg.name} added to cart!`, { icon: "🛒" })
  }

  const allFeatures = [
    "4K Resolution",
    "9500 Lumens",
    "HDR10 Support",
    '100" Screen Included',
    "Ceiling Mount",
    "Built-in Sound System (10W)",
    "Enhanced Sound System (20W)",
    "Premium Sound System (40W Dolby Atmos)",
    "FREE White Screen Backdrop",
    "2-Year Warranty",
    "5-Year Warranty",
    "Lifetime Warranty",
  ]

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Compare Packages
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Choose the perfect home cinema setup for your needs
          </p>
        </div>

        {/* Comparison Table - Mobile */}
        <div className="md:hidden space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border p-6 ${
                pkg.popular
                  ? "border-orange-500 bg-gradient-to-b from-orange-500/10 to-transparent"
                  : theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-gray-200 bg-white"
              }`}
            >
              {pkg.popular && (
                <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-4">
                  BEST SELLER
                </div>
              )}
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {pkg.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  ${pkg.price.toFixed(2)}
                </span>
                <span className={`text-lg line-through ${theme === "dark" ? "text-zinc-600" : "text-gray-400"}`}>
                  ${pkg.originalPrice.toFixed(2)}
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {allFeatures.map((feature) => {
                  const hasFeature = pkg.features[feature as keyof typeof pkg.features]
                  return (
                    <li key={feature} className="flex items-center gap-2">
                      {hasFeature ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          hasFeature
                            ? theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                            : theme === "dark"
                              ? "text-zinc-600"
                              : "text-gray-400"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <Button
                onClick={() => handleAddToCart(pkg)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-6 text-left">
                  <span className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Features
                  </span>
                </th>
                {packages.map((pkg) => (
                  <th key={pkg.id} className="pb-6 px-4">
                    <div
                      className={`rounded-2xl border p-6 ${
                        pkg.popular
                          ? "border-orange-500 bg-gradient-to-b from-orange-500/10 to-transparent"
                          : theme === "dark"
                            ? "border-zinc-800 bg-zinc-900/50"
                            : "border-gray-200 bg-white"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-4">
                          BEST SELLER
                        </div>
                      )}
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.name}
                        width={250}
                        height={150}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className={`text-lg font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {pkg.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          ${pkg.price.toFixed(2)}
                        </span>
                        <span
                          className={`text-sm line-through ${theme === "dark" ? "text-zinc-600" : "text-gray-400"}`}
                        >
                          ${pkg.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(pkg)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, idx) => (
                <tr key={feature} className={`border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
                  <td className="py-4 pr-4">
                    <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {feature}
                    </span>
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="py-4 px-4 text-center">
                      {pkg.features[feature as keyof typeof pkg.features] ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className={`text-lg mb-6 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Still have questions? We're here to help.
          </p>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className={
                theme === "dark"
                  ? "border-zinc-700 text-white hover:bg-zinc-900"
                  : "border-gray-300 text-gray-900 hover:bg-gray-100"
              }
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
