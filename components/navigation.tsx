"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"
import { useState, useEffect } from "react"
import { CartDropdown } from "./cart-dropdown"

export function Navigation() {
  const { itemCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50"
            : "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
          : theme === "dark"
            ? "bg-zinc-950/80 backdrop-blur-xl"
            : "bg-white/80 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Mobile Menu Button - LEFT */}
          <Button
            variant="ghost"
            size="icon"
            className={`w-9 h-9 md:hidden ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Logo - CENTER on mobile, LEFT on desktop */}
          <Link
            href="/"
            className="flex items-center gap-2 md:flex-none absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">4K</span>
            </div>
            <span
              className={`font-bold text-base hidden sm:block ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Lumina4K
            </span>
            {/* Canadian Flag */}
            <div className="w-6 h-4 ml-1 hidden sm:block">
              <svg viewBox="0 0 36 18" className="w-full h-full">
                <rect width="36" height="18" fill="#FF0000"/>
                <rect x="9" y="0" width="18" height="18" fill="#FFFFFF"/>
                <path d="M18 3l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3z" fill="#FF0000"/>
              </svg>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm transition-colors ${theme === "dark" ? "text-zinc-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              Home
            </Link>
            <Link
              href="/product"
              className={`text-sm transition-colors ${theme === "dark" ? "text-zinc-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors ${theme === "dark" ? "text-zinc-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              About
            </Link>
          </div>

          {/* Right Side - Theme + Cart */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`w-9 h-9 ${theme === "dark" ? "text-zinc-300 hover:text-white hover:bg-zinc-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
            </Button>

            {/* Cart - Now opens dropdown instead of redirecting */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(!cartOpen)}
                className={`w-9 h-9 relative ${theme === "dark" ? "text-zinc-300 hover:text-white hover:bg-zinc-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
              >
                <ShoppingCart className="w-4 h-4" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>

              <CartDropdown isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            </div>

            {/* Shop Now Button - Desktop only */}
            <Link href="/product" className="hidden md:inline-block ml-2">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t ${theme === "dark" ? "bg-zinc-950 border-zinc-800" : "bg-white border-gray-200"}`}
        >
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/"
              className={`block py-2.5 px-3 rounded-lg text-sm ${theme === "dark" ? "text-zinc-300 hover:bg-zinc-900" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/product"
              className={`block py-2.5 px-3 rounded-lg text-sm ${theme === "dark" ? "text-zinc-300 hover:bg-zinc-900" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/compare"
              className={`block py-2.5 px-3 rounded-lg text-sm ${theme === "dark" ? "text-zinc-300 hover:bg-zinc-900" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Compare
            </Link>
            <Link
              href="/contact"
              className={`block py-2.5 px-3 rounded-lg text-sm ${theme === "dark" ? "text-zinc-300 hover:bg-zinc-900" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/about"
              className={`block py-2.5 px-3 rounded-lg text-sm ${theme === "dark" ? "text-zinc-300 hover:bg-zinc-900" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2">
              <Link href="/product" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
