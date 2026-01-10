"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"
import { useRouter } from "next/navigation"
import {
  Check,
  Star,
  Shield,
  Truck,
  ChevronRight,
  ShoppingCart,
  Award,
  Zap,
  Package,
  Crown,
  Sparkles,
  Clock,
  Play,
  ChevronDown,
  ChevronUp,
  Factory,
  TrendingUp,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-hot-toast"

export default function ProductPage() {
  const router = useRouter()
  const { addItem } = useCart()
  const { theme } = useTheme()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const packages = [
    {
      id: "starter",
      name: "Lumina 4K X1", // Added realistic projector name
      subtitle: "Essential Home Cinema",
      price: 29.99, // Updated from $399 to $299
      originalPrice: 69.99, // Updated from $799 to $699
      icon: Package,
      image: "/img/61lopDncM+L._AC_SX425_.jpg",
      features: [
        "4K UHD Projector",
        "7500 Lumens",
        "Basic Remote",
        "HDMI Cable",
        "Built-in Stereo Speakers (10W)",
        "2-Year Warranty",
      ],
    },
    {
      id: "professional",
      name: "Lumina 4K Pro", // Added realistic projector name
      subtitle: "Most Popular Choice",
      price: 59.99,
      originalPrice: 109.99,
      icon: Crown,
      badge: "BEST SELLER",
      popular: true,
      image: "/4k-projector-professional-package-with-screen-prem.jpg",
      features: [
        "4K UHD Projector",
        "9500 Lumens",
        "Smart Remote",
        '100" Screen Included',
        "Ceiling Mount",
        "Enhanced Sound System (20W Stereo)",
        "5-Year Warranty",
      ],
    },
    {
      id: "ultimate",
      name: "Lumina 4K Ultra", // Added realistic projector name
      subtitle: "Complete Cinema Experience",
      price: 129.99,
      originalPrice: 209.99,
      icon: Sparkles,
      badge: "BEST VALUE",
      image: "/img/ultr.jpg",
      features: [
        "4K UHD + HDR10+",
        "9500 Lumens",
        "Voice Control",
        '120" ALR Screen',
        "Premium Sound System (40W Dolby Atmos)",
        "Lifetime Warranty",
      ],
    },
  ]

  const reviews = [
    {
      name: "Michael R.",
      avatar: "M",
      rating: 5,
      package: "Professional",
      date: "2 days ago",
      text: "Absolutely blown away by the picture quality. The Professional package was the perfect choice.",
      verified: true,
    },
    {
      name: "Sarah T.",
      avatar: "S",
      rating: 5,
      package: "Ultimate",
      date: "1 week ago",
      text: "The HDR10+ makes movies look absolutely gorgeous. My living room is now better than most cinemas!",
      verified: true,
    },
    {
      name: "James W.",
      avatar: "J",
      rating: 5,
      package: "Starter",
      date: "3 days ago",
      text: "Amazing quality for the price. Started with Starter but planning to upgrade soon!",
      verified: true,
    },
  ]

  const faqs = [
    {
      q: "Which package should I choose?",
      a: "For most customers, we recommend the Professional package. It includes everything you need for an exceptional home cinema experience.",
    },
    {
      q: "How long does shipping take?",
      a: "We offer FREE 2-3 day shipping across USA & Canada. Orders placed before 2 PM EST ship same day from our regional warehouses.",
    },
    {
      q: "Can I return or exchange my projector?",
      a: "Yes! We offer a 14-day return policy with full refund. No questions asked if you're not completely satisfied.",
    },
    {
      q: "How does the warranty work?",
      a: "All warranties cover manufacturing defects and hardware failures. Extended warranties also include accidental damage protection.",
    },
  ]

  const handleAddToCart = (pkg: (typeof packages)[0]) => {
    addItem({
      id: `projector-${pkg.id}`,
      name: `${pkg.name} Cinema Projector`, // Updated to use projector model names
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      image: pkg.image,
      variant: pkg.name,
    })
    toast.success("Product added to cart!", { icon: "🛒" })
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-[#fafafa]"}`}>
      {/* Hero Section */}
      <section className="px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div
            className={`flex items-center gap-2 text-sm mb-6 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
          >
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>Shop</span>
          </div>

          <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold bg-orange-500/10 text-orange-500 rounded-full">
              <Zap className="w-3 h-3" />
              Limited Time: Save Up To $80
            </span>
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Choose Your Cinema Package
            </h1>
            <p
              className={`text-base md:text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
            >
              Direct from the manufacturer • 50,000+ units produced annually • We supply Best Buy, Amazon & major
              retailers
            </p>
          </div>

          {/* Packages Grid - Apple Style Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {packages.map((pkg) => {
              const Icon = pkg.icon
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 ${
                    pkg.popular
                      ? `ring-2 ring-orange-500 ${theme === "dark" ? "bg-zinc-900" : "bg-white"} shadow-xl`
                      : `${theme === "dark" ? "bg-zinc-900/50 hover:bg-zinc-900" : "bg-white hover:shadow-lg"} border ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full">
                      {pkg.badge}
                    </div>
                  )}

                  {/* Product Image */}
                  <div className={`relative aspect-[4/3] ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}>
                    <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {pkg.name}
                        </h3>
                        <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                          {pkg.subtitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl md:text-2xl font-bold text-orange-500">${pkg.price.toFixed(2)}</div>
                        <div className={`text-xs line-through ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}>
                          ${pkg.originalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-1.5 mb-4">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          <span className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex flex-col gap-2">
                      <Link href={`/product/${pkg.id}`} className="w-full">
                        <Button
                          className={`w-full text-sm font-semibold py-2.5 ${
                            pkg.popular
                              ? "bg-orange-500 hover:bg-orange-600 text-white"
                              : theme === "dark"
                                ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                                : "bg-gray-900 hover:bg-gray-800 text-white"
                          }`}
                        >
                          View Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleAddToCart(pkg)}
                        variant="outline"
                        className={`w-full text-xs py-2 ${theme === "dark" ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust Bar - Compact */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl ${theme === "dark" ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-gray-200"}`}
          >
            {[
              { icon: Truck, label: "Free Shipping", sub: "Worldwide" },
              { icon: Shield, label: "Secure Payment", sub: "256-bit SSL" },
              { icon: Clock, label: "Fast Delivery", sub: "3-5 Days" },
              { icon: Award, label: "Top Rated", sub: "15,000+ Reviews" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 justify-center">
                <item.icon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div
                    className={`font-semibold text-sm truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {item.label}
                  </div>
                  <div className={`text-[10px] ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Direct Section */}
      <section className={`px-4 py-16 ${theme === "dark" ? "bg-zinc-900/30" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Why Our Prices Are Unbeatable
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              We manufacture, we ship, we support. No middlemen, no markup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              className={`p-6 rounded-2xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Direct Manufacturing
              </h3>
              <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                We produce 50,000+ projectors annually in our own facilities. Same premium quality that Best Buy and
                Amazon sell, but at 60% less because you buy direct from the source.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Bulk Production Capacity
              </h3>
              <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                Need 100+ units for your company? We handle bulk orders for Fortune 500 companies, universities, and
                cinema chains. Volume discounts available with dedicated account management.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-gray-50 border border-gray-200"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                2-3 Day Delivery
              </h3>
              <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                Strategic warehouses across USA & Canada ensure lightning-fast delivery. Order today, enjoy your cinema
                by this weekend. Free shipping on all orders.
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div
            className={`p-6 md:p-8 rounded-2xl ${theme === "dark" ? "bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20" : "bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200"}`}
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              The Retailer Markup Problem
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-5 rounded-xl ${theme === "dark" ? "bg-zinc-900/80" : "bg-white"}`}>
                <div
                  className={`text-sm font-semibold mb-3 uppercase tracking-wide ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
                >
                  Traditional Retail Price
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>Our Cost:</span>
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>$29.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>
                      Retailer Markup (200%):
                    </span>
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>+$59.98</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>Marketing Costs:</span>
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>+$20.00</span>
                  </div>
                  <div
                    className={`pt-2 border-t ${theme === "dark" ? "border-zinc-700" : "border-gray-200"} flex justify-between font-bold`}
                  >
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>Final Price:</span>
                    <span className="text-red-500">$109.97</span>
                  </div>
                </div>
              </div>

              <div className={`p-5 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white`}>
                <div className="text-sm font-semibold mb-3 uppercase tracking-wide opacity-90">Our Direct Price</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">Production Cost:</span>
                    <span>$29.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">Our Margin (Fair):</span>
                    <span>+$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">Direct Shipping:</span>
                    <span>FREE</span>
                  </div>
                  <div className="pt-2 border-t border-white/20 flex justify-between font-bold text-lg">
                    <span>You Pay:</span>
                    <span>$29.99</span>
                  </div>
                </div>
                <div className="text-xs opacity-90 bg-white/10 p-3 rounded-lg text-center">
                  Save $80.00 by buying direct from the manufacturer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={`px-4 py-12 ${theme === "dark" ? "bg-zinc-900/30" : "bg-gray-100/50"}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              See It In Action
            </h2>
            <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              Watch how our 4K projector transforms any room
            </p>
          </div>
          <div
            className={`relative aspect-video rounded-2xl overflow-hidden border ${theme === "dark" ? "border-zinc-800 bg-zinc-900" : "border-gray-200 bg-white"} shadow-lg group cursor-pointer`}
          >
            <Image
              src="/home-cinema-room-with-4k-projector-dark-ambient-li.jpg"
              alt="Video thumbnail"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play className="w-7 h-7 text-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
              ))}
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Customer Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl ${theme === "dark" ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-gray-200"}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`font-semibold text-sm truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {review.name}
                    </div>
                    <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                      {review.package} • {review.date}
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
                  "{review.text}"
                </p>
                {review.verified && (
                  <div className="mt-3 inline-flex items-center gap-1 text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                    <Check className="w-2.5 h-2.5" />
                    Verified Purchase
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`px-4 py-12 ${theme === "dark" ? "bg-zinc-900/30" : "bg-gray-100/50"}`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full p-4 flex items-center justify-between text-left ${theme === "dark" ? "hover:bg-zinc-800/50" : "hover:bg-gray-50"}`}
                >
                  <span className={`font-semibold text-sm pr-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp
                      className={`w-4 h-4 flex-shrink-0 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
                    />
                  ) : (
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
                    />
                  )}
                </button>
                {openFaq === i && (
                  <div
                    className={`px-4 pb-4 text-sm leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
