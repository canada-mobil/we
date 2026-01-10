"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Gift, Sparkles, Check, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    total,
    itemCount,
    freeShippingProgress,
    freeShippingThreshold,
  } = useCart()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showDiscount, setShowDiscount] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (discount > 0) {
      setTimeout(() => setShowDiscount(true), 500)
    }
  }, [discount])

  if (!mounted) return null

  if (itemCount === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}
      >
        <div className="text-center max-w-md">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === "dark" ? "bg-zinc-900" : "bg-gray-200"}`}
          >
            <ShoppingBag className={`w-12 h-12 ${theme === "dark" ? "text-zinc-700" : "text-gray-400"}`} />
          </div>
          <h1 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Your Cart is Empty
          </h1>
          <p className={`mb-8 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Add some amazing products to get started!
          </p>
          <Link href="/product">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const shippingAmount = 0

  return (
    <div className={`min-h-screen py-8 md:py-12 px-4 ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Items */}
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-4 md:p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}
                      >
                        <ShoppingBag className={`w-10 h-10 ${theme === "dark" ? "text-zinc-600" : "text-gray-400"}`} />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-lg font-bold mb-1 truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p
                        className={`text-sm mb-2 ${item.price === 0 ? "text-green-500 font-semibold" : theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
                      >
                        {item.variant === "FREE BONUS" ? (
                          <span className="flex items-center gap-1">
                            <Gift className="w-4 h-4" />
                            {item.variant}
                          </span>
                        ) : (
                          `${item.variant} Package`
                        )}
                      </p>
                    )}

                    {/* Price with Discount */}
                    <div className="flex items-center gap-2 mb-4">
                      {item.price === 0 ? (
                        <span className="text-xl md:text-2xl font-bold text-green-500">FREE</span>
                      ) : (
                        <span className="text-xl md:text-2xl font-bold text-orange-500">${item.price}</span>
                      )}
                      {item.originalPrice > item.price && (
                        <>
                          <span
                            className={`text-sm line-through ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}
                          >
                            ${item.originalPrice}
                          </span>
                          {item.price > 0 && (
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-semibold rounded-full">
                              -${(item.originalPrice - item.price).toFixed(2)}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {item.price > 0 ? (
                        <>
                          {/* Quantity Controls */}
                          <div
                            className={`flex items-center gap-2 rounded-lg border p-1 ${theme === "dark" ? "bg-zinc-800 border-zinc-700" : "bg-gray-100 border-gray-200"}`}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className={`h-8 w-8 ${theme === "dark" ? "text-white hover:bg-zinc-700" : "text-gray-900 hover:bg-gray-200"}`}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span
                              className={`font-semibold w-8 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                            >
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className={`h-8 w-8 ${theme === "dark" ? "text-white hover:bg-zinc-700" : "text-gray-900 hover:bg-gray-200"}`}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-950/20"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm text-green-500">(Included automatically)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className={`p-6 rounded-xl sticky top-24 ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className={`flex justify-between ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  <span>Subtotal ({itemCount} items)</span>
                  <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Animated Discount */}
                {discount > 0 && (
                  <div
                    className={`flex justify-between items-center transition-all duration-500 ${showDiscount ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                  >
                    <span className="flex items-center gap-2 text-green-500">
                      <Tag className="w-4 h-4" />
                      Discount Applied
                    </span>
                    <span className="font-semibold text-green-500 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className={`flex justify-between ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  <span>Shipping</span>
                  <span className="font-semibold text-green-500 flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    FREE
                  </span>
                </div>

                <div className={`border-t pt-4 ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Total
                    </span>
                    <span className="text-2xl font-bold text-orange-500">${(total + shippingAmount).toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-500 text-right">You're saving ${discount.toFixed(2)}!</p>
                  )}
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-bold mb-4">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/product">
                <Button
                  variant="outline"
                  className={`w-full ${theme === "dark" ? "border-zinc-700 text-white hover:bg-zinc-800 bg-transparent" : "border-gray-300 text-gray-900 hover:bg-gray-100"}`}
                >
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div
                className={`mt-6 pt-6 border-t space-y-3 ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}
              >
                <div
                  className={`flex items-center gap-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                >
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  Secure checkout with SSL encryption
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                >
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  30-day money-back guarantee
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                >
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  24/7 customer support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
