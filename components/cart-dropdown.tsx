"use client"

import { ShoppingCart, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, removeItem, total, itemCount } = useCart()
  const { theme } = useTheme()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40 md:hidden" onClick={onClose} />

      <div
        ref={dropdownRef}
        className={`fixed md:absolute top-full right-0 left-0 md:left-auto mt-2 md:w-96 w-full max-w-md mx-auto md:mx-0 rounded-xl shadow-2xl border z-50 ${
          theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            theme === "dark" ? "border-zinc-800" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className={`w-5 h-5 ${theme === "dark" ? "text-orange-500" : "text-orange-600"}`} />
            <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Shopping Cart ({itemCount})
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              theme === "dark" ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <ShoppingCart className={`w-16 h-16 mb-4 ${theme === "dark" ? "text-zinc-700" : "text-gray-300"}`} />
              <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Your cart is empty</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-3 p-3 rounded-lg border ${
                    theme === "dark" ? "border-zinc-800 bg-zinc-800/50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {item.name}
                    </h4>
                    {item.variant && (
                      <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                        {item.variant}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        ${item.price}
                      </span>
                      <span className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}>
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className={`p-2 rounded-lg transition-colors self-start ${
                      theme === "dark"
                        ? "hover:bg-zinc-700 text-zinc-400 hover:text-red-400"
                        : "hover:bg-gray-200 text-gray-500 hover:text-red-500"
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={`p-4 border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`font-medium ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>Subtotal:</span>
              <span className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                ${total.toFixed(2)}
              </span>
            </div>
            <Link href="/cart" onClick={onClose}>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-2">View Cart</Button>
            </Link>
            <Link href="/checkout" onClick={onClose}>
              <Button
                variant="outline"
                className={`w-full ${
                  theme === "dark"
                    ? "border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
                    : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
