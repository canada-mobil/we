"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"
import { useRouter, useParams } from "next/navigation"
import {
  Check,
  Star,
  Shield,
  Truck,
  ChevronRight,
  ShoppingCart,
  Zap,
  ZoomIn,
  ChevronLeft,
  Heart,
  Share2,
  Package,
  Clock,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"

const productImages = [
  "/img/ultr.jpg",
  "/img/ultra.jpg",
  "/img/ultrr.jpg",
  "/img/ultrrr.jpg",
]

const packages = [
  {
    id: "starter",
    name: "Lumina 4K X1", // Added realistic projector name
    price: 29.99, // Updated from $399 to $29.99
    originalPrice: 69.99, // Updated from $799 to $69.99
    features: [
      "4K UHD Projector (3840×2160)",
      "7500 Lumens Brightness",
      "Basic Remote Control",
      "HDMI Cable (6ft)",
      "Built-in Stereo Speakers (10W)",
      "FREE White Screen Backdrop",
      "Power Adapter",
      "Quick Start Guide",
      "2-Year Warranty",
      "Email Support",
    ],
  },
  {
    id: "professional",
    name: "Lumina 4K Pro", // Added realistic projector name
    price: 59.99, // Updated from $699 to $59.99
    originalPrice: 109.99, // Updated from $1199 to $109.99
    badge: "MOST POPULAR",
    features: [
      "4K UHD Projector (3840×2160)",
      "9500 Lumens Brightness",
      "Premium Smart Remote",
      "HDMI 2.1 Cable (10ft)",
      "Enhanced Sound System (20W Stereo)",
      "Premium Carrying Case",
      '100" Motorized Screen',
      "FREE White Screen Backdrop",
      "Ceiling Mount Kit",
      "5-Year Extended Warranty",
      "Priority Phone Support",
      "Free Professional Setup Guide",
    ],
  },
  {
    id: "ultimate",
    name: "Lumina 4K Ultra", // Added realistic projector name
    price: 129.99, // Updated from $999 to $129.99
    originalPrice: 209.99, // Updated from $1799 to $209.99
    badge: "BEST VALUE",
    features: [
      "4K UHD Projector (3840×2160)",
      "9500 Lumens + HDR10+",
      "Premium Smart Remote + Voice Control",
      "HDMI 2.1 Cable (15ft) × 2",
      "Premium Sound System (40W Dolby Atmos)",
      "Premium Hardshell Case",
      '120" ALR Premium Screen',
      "FREE White Screen Backdrop",
      "Premium Ceiling Mount",
      "Lifetime Premium Warranty",
      "24/7 VIP Support Line",
      "Lifetime Software Updates",
    ],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { theme } = useTheme()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState(1) // Professional by default
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description")

  const currentPackage = packages[selectedPackage]

  const handleAddToCart = () => {
    addItem({
      id: `projector-${currentPackage.id}`,
      name: `${currentPackage.name} Cinema Projector`, // Updated to use projector model names
      price: currentPackage.price,
      originalPrice: currentPackage.originalPrice,
      image: productImages[0],
      variant: currentPackage.name,
      quantity,
    })
    router.push("/cart")
  }

  const specs = [
    { label: "Native Resolution", value: "4K UHD (3840 × 2160)" },
    { label: "Brightness", value: "9500 ANSI Lumens" },
    { label: "Contrast Ratio", value: "3000:1" },
    { label: "Lamp Life", value: "50,000 hours" },
    { label: "Throw Ratio", value: "1.2:1" },
    { label: "Screen Size", value: '40" - 300"' },
    { label: "HDR Support", value: "HDR10, HDR10+, HLG" },
    { label: "Inputs", value: "HDMI 2.1 × 2, USB 3.0, Ethernet" },
    { label: "Audio", value: "Built-in 20W Stereo Speakers" },
    { label: "Connectivity", value: "WiFi 6, Bluetooth 5.2" },
    { label: "Operating System", value: "Android TV 12" },
    { label: "Dimensions", value: "15.7 × 12.2 × 6.3 inches" },
  ]

  const reviews = [
    {
      name: "Michael R.",
      rating: 5,
      date: "2 days ago",
      package: "Professional",
      verified: true,
      text: "Absolutely blown away by the picture quality. The Professional package was the perfect choice - the included screen alone is worth hundreds. Setup took about 30 minutes and the image is stunning. Gaming on PS5 is incredible with the low latency mode!",
    },
    {
      name: "Sarah T.",
      rating: 5,
      date: "1 week ago",
      package: "Ultimate",
      verified: true,
      text: "The HDR10+ makes movies look absolutely gorgeous. My living room is now better than most cinemas. No regrets going with the Ultimate package - the lifetime warranty and premium support are incredible!",
    },
    {
      name: "James W.",
      rating: 5,
      date: "3 days ago",
      package: "Starter",
      verified: true,
      text: "Started with Starter to test it out - immediately wished I'd gone for Professional. Still amazing quality though, just had to buy the screen separately. Planning to upgrade next month!",
    },
    {
      name: "David L.",
      rating: 5,
      date: "5 days ago",
      package: "Professional",
      verified: true,
      text: "Best tech purchase I've made in years. The brightness is insane - I can watch movies with lights on. The motorized screen is super convenient. Customer support helped me through setup via video call. Highly recommend!",
    },
  ]

  return (
    <>
      <div className={`min-h-screen pt-20 ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className={`flex items-center gap-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
            <a href="/" className="hover:text-orange-500 transition-colors">
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="/product" className="hover:text-orange-500 transition-colors">
              Shop
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>4K Cinema Projector</span>
          </div>
        </div>

        {/* Product Layout */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div
                className={`relative aspect-square rounded-2xl overflow-hidden group ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-gray-100 border border-gray-200"}`}
              >
                <Image
                  src={productImages[selectedImage] || "/placeholder.svg"}
                  alt="4K Projector"
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl ${theme === "dark" ? "bg-zinc-900/80 text-white hover:bg-zinc-800" : "bg-white/80 text-gray-900 hover:bg-white"} transition-all`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl ${theme === "dark" ? "bg-zinc-900/80 text-white hover:bg-zinc-800" : "bg-white/80 text-gray-900 hover:bg-white"} transition-all`}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <button className="absolute bottom-4 right-4 px-4 py-2 rounded-full backdrop-blur-xl bg-zinc-900/80 text-white text-sm flex items-center gap-2 hover:bg-zinc-800 transition-all">
                  <ZoomIn className="w-4 h-4" />
                  Zoom
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-orange-500"
                        : theme === "dark"
                          ? "border-zinc-800 hover:border-zinc-700"
                          : "border-gray-200 hover:border-gray-300"
                    } ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"}`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`View ${idx + 1}`}
                      width={100}
                      height={100}
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-semibold rounded-full border border-orange-500/20">
                    ⚡ Limited Time Offer
                  </span>
                  <span className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    Only 7 left in stock
                  </span>
                </div>

                <h1
                  className={`text-3xl md:text-4xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Premium 4K Cinema Projector
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>4.9/5</span>
                  <span className={`${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>(2,847 reviews)</span>
                </div>

                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
                  Direct from the manufacturer that supplies Best Buy, Amazon, and major retailers. We produce in bulk,
                  cutting out middlemen to offer you premium 4K projection at revolutionary prices. Fast 2-3 day
                  delivery across USA & Canada.
                </p>
              </div>

              {/* Key Benefits */}
              <div
                className={`grid grid-cols-3 gap-3 p-4 rounded-xl ${theme === "dark" ? "bg-zinc-900/50 border border-zinc-800" : "bg-gray-50 border border-gray-200"}`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    4K UHD
                  </div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Crystal Clear</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    9500 Lumens
                  </div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Bright Image</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    16ms Latency
                  </div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Gaming Ready</div>
                </div>
              </div>

              {/* Package Selection */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Choose Your Package
                </h3>
                <div className="space-y-3">
                  {packages.map((pkg, idx) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(idx)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedPackage === idx
                          ? "border-orange-500 bg-orange-500/5"
                          : theme === "dark"
                            ? "border-zinc-800 hover:border-zinc-700"
                            : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mx-auto ${
                              selectedPackage === idx ? "border-orange-500" : "border-gray-400"
                            }`}
                          >
                            {selectedPackage === idx && <div className="w-3 h-3 rounded-full bg-orange-500" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {pkg.name}
                              </span>
                              {pkg.badge && (
                                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                                  {pkg.badge}
                                </span>
                              )}
                            </div>
                            <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                              {pkg.features.length} items included
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-500">${pkg.price}</div>
                          <div
                            className={`text-sm line-through ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}
                          >
                            ${pkg.originalPrice}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Quantity
                </h3>
                <div
                  className={`inline-flex items-center gap-4 rounded-xl border p-2 ${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-gray-100 border-gray-200"}`}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-gray-200"}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <span
                    className={`font-bold text-xl min-w-[40px] text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className={theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-gray-200"}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-bold shadow-lg shadow-orange-500/30"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${currentPackage.price * quantity}
                </Button>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className={`py-3 rounded-lg ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"}`}>
                    <Truck className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <div className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Free Shipping
                    </div>
                  </div>
                  <div className={`py-3 rounded-lg ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"}`}>
                    <Shield className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <div className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      5-Year Warranty
                    </div>
                  </div>
                  <div className={`py-3 rounded-lg ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"}`}>
                    <Package className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <div className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      30-Day Returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            {/* Tab Headers */}
            <div className={`flex gap-8 border-b mb-8 ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
              {(["description", "specs", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold transition-colors capitalize relative ${
                    activeTab === tab
                      ? "text-orange-500"
                      : theme === "dark"
                        ? "text-zinc-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === "description" && (
                <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
                  <h2 className={theme === "dark" ? "text-white" : "text-gray-900"}>Factory-Direct Cinema Quality</h2>
                  <p className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>
                    We're not just a retailer—we're the manufacturer. Our factory produces over 50,000 projectors
                    annually, supplying major brands and retailers across North America. By selling directly to you, we
                    eliminate retailer markups and pass massive savings to our customers.
                  </p>
                  <h3 className={theme === "dark" ? "text-white" : "text-gray-900"}>Why Our Prices Are Unbeatable</h3>
                  <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>
                    <li>
                      <strong>We Own the Factory:</strong> Complete control over production means lower costs and higher
                      quality standards
                    </li>
                    <li>
                      <strong>Bulk Production Scale:</strong> Manufacturing 50,000+ units annually drives down per-unit
                      costs dramatically
                    </li>
                    <li>
                      <strong>No Middlemen:</strong> Direct-to-consumer model eliminates retailer markups of 200-400%
                    </li>
                    <li>
                      <strong>We Supply the Competition:</strong> The same projectors in big-box stores at 3x the price
                      come from our factory
                    </li>
                  </ul>
                  <h3 className={theme === "dark" ? "text-white" : "text-gray-900"}>Lightning-Fast Delivery</h3>
                  <p className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>
                    With warehouses strategically located across the USA and Canada, we ship from the facility closest
                    to you. Most orders arrive in 2-3 business days with free expedited shipping. Track your order in
                    real-time from our facility to your door.
                  </p>
                  <h3 className={theme === "dark" ? "text-white" : "text-gray-900"}>Enterprise-Grade Support</h3>
                  <p className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>
                    We don't just sell projectors—we stand behind them. As the manufacturer, our support team has direct
                    access to engineering, allowing us to solve issues faster than any retailer could. Corporate bulk
                    orders welcome for businesses, schools, and institutions.
                  </p>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                  {specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className={`py-4 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}
                    >
                      <div className={`text-sm mb-1 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                        {spec.label}
                      </div>
                      <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Review Stats */}
                  <div
                    className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-gray-50 border border-gray-200"}`}
                  >
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-orange-500 mb-2">4.9</div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                          ))}
                        </div>
                        <div className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                          Based on 2,847 reviews
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3">
                            <span className={`text-sm w-12 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                              {stars} stars
                            </span>
                            <div
                              className={`flex-1 h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-zinc-800" : "bg-gray-200"}`}
                            >
                              <div
                                className="h-full bg-orange-500"
                                style={{ width: stars === 5 ? "92%" : stars === 4 ? "6%" : "2%" }}
                              />
                            </div>
                            <span
                              className={`text-sm w-12 text-right ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                            >
                              {stars === 5 ? "92%" : stars === 4 ? "6%" : "2%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  {reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-xl ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {review.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {review.name}
                              </div>
                              <div className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                                {review.package} Package • {review.date}
                              </div>
                            </div>
                            {review.verified && (
                              <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-semibold rounded-full border border-green-500/20 flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1 mb-3">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                            ))}
                          </div>
                          <p className={theme === "dark" ? "text-zinc-300" : "text-gray-600"}>{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
