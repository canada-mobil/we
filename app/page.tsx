"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { Check, Star, Shield, Truck, RefreshCw, Clock, Play, Sparkles, Volume2, Gift } from "lucide-react"

export default function LandingPage() {
  const { theme } = useTheme()
  const [timeLeft, setTimeLeft] = useState({ hours: 83, minutes: 45, seconds: 30 })
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          hours = 83
          minutes = 45
          seconds = 30
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const benefits = [
    {
      icon: Sparkles,
      title: "True 4K Cinema",
      desc: "3840×2160 native resolution with HDR10+ support for stunning clarity",
    },
    {
      icon: Volume2,
      title: "Premium Sound System",
      desc: "Built-in stereo speakers (10W-40W depending on package) with Dolby Atmos on Ultimate",
    },
    {
      icon: Gift,
      title: "FREE Bonus Gift",
      desc: "Professional white screen backdrop ($49.99 value) included free with every projector",
    },
    { icon: Truck, title: "Fast Delivery", desc: "Free 2-3 day shipping across USA & Canada from regional warehouses" },
  ]

  const specs = [
    { label: "Native Resolution", value: "3840 × 2160 (4K UHD)" },
    { label: "Brightness", value: "9500 ANSI Lumens" },
    { label: "Contrast Ratio", value: "10,000:1 Native" },
    { label: "Projection Range", value: '40" - 300" Diagonal' },
    { label: "Lamp Lifespan", value: "50,000 Hours LED" },
    { label: "Connectivity", value: "HDMI 2.1, USB-C, WiFi 6" },
  ]

  const reviews = [
    {
      name: "Michael Richardson",
      role: "Home Theater Enthusiast",
      rating: 5,
      text: "This replaced my $15,000 Sony projector. The image quality is absolutely breathtaking.",
      verified: true,
    },
    {
      name: "Sarah Thompson",
      role: "Interior Designer",
      rating: 5,
      text: "Sleek design that fits perfectly in luxury homes. My clients love it.",
      verified: true,
    },
    {
      name: "David Chen",
      role: "Tech Reviewer",
      rating: 5,
      text: "Best projector under $1000. Period. The 4K clarity is unmatched at this price point.",
      verified: true,
    },
  ]

  const comparison = [
    { feature: "True 4K Native Resolution", us: true, them: false },
    { feature: "9500 Lumens Brightness", us: true, them: false },
    { feature: "HDR10+ Support", us: true, them: true },
    { feature: "AI Scene Optimization", us: true, them: false },
    { feature: "50,000 Hour Lamp Life", us: true, them: false },
    { feature: "Warranty", us: "Up to Lifetime", them: "1 Year" },
    { feature: "Price", us: "$29.99+", them: "$180+" },
  ]

  const faqs = [
    {
      q: "Can it produce cinema-quality images in daylight?",
      a: "Absolutely. With 9500 ANSI lumens and advanced anti-glare technology, our projector delivers stunning images even in well-lit rooms.",
    },
    {
      q: "How long does shipping take?",
      a: "We offer FREE 2-3 day shipping across USA & Canada. Orders placed before 2 PM EST ship same day from our regional warehouses.",
    },
    {
      q: "How does it compare to high-end TV displays?",
      a: "Our 4K projector offers screen sizes up to 300 inches - something impossible with TVs. You get true cinematic scale with better color accuracy.",
    },
    {
      q: "What's your warranty and return policy?",
      a: "We offer up to a 5-year comprehensive warranty plus a 30-day money-back guarantee. If you're not satisfied, we'll refund 100%.",
    },
  ]

  if (!mounted) return null

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div
          className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5" : ""}`}
        />
        {theme === "dark" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold rounded-full border backdrop-blur-sm ${theme === "dark" ? "bg-gradient-to-r from-orange-500/20 to-purple-500/20 border-orange-500/30" : "bg-orange-50 border-orange-200"}`}
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span
                className={
                  theme === "dark"
                    ? "bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"
                    : "text-orange-600"
                }
              >
                Limited Offer - 47 Units Remaining
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Cinema-Grade
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-purple-500 bg-clip-text text-transparent">
                Home Theater
              </span>
              <br />
              <span
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
              >
                Redefined
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
            >
              Experience the pinnacle of home entertainment with true 4K projection, 9500 lumens brightness, and
              professional-grade color accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/product" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold shadow-2xl shadow-orange-500/30 border border-orange-400/20"
                >
                  <span className="truncate">Shop Now</span>
                  <span className="hidden lg:inline ml-2">- Starting at $29.99</span>
                  <span className="hidden sm:inline lg:hidden ml-2">$29.99</span>
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const videoSection = document.querySelector('video');
                  if (videoSection) {
                    videoSection.scrollIntoView({ behavior: 'smooth' });
                    // Optional: Auto-play the video when scrolled to
                    setTimeout(() => {
                      videoSection.play();
                    }, 500);
                  }
                }}
                className={`w-full sm:w-auto px-6 sm:px-10 py-6 sm:py-7 text-base sm:text-lg backdrop-blur-sm ${theme === "dark" ? "border-zinc-700 text-white hover:bg-zinc-900 bg-transparent" : "border-gray-300 text-gray-900 hover:bg-gray-100"}`}
              >
                <Play className="w-5 h-5 mr-2" />
                <span className="truncate">Watch Demo</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-left">
                  <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Free Shipping
                  </div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Worldwide</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-left">
                  <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Up to 5-Year Warranty
                  </div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Full Coverage</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-left">
                  <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    30-Day Returns
                  </div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Money-Back</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-5xl mx-auto">
            <div
              className={`relative aspect-video rounded-2xl overflow-hidden border shadow-2xl ${theme === "dark" ? "border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800" : "border-gray-200 bg-gray-100"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-purple-500/10" />
              <img
                src="/image1.jpg"
                alt="4K Projector Hero Image"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div
                  className={`backdrop-blur-xl border rounded-xl p-3 md:p-4 text-center ${theme === "dark" ? "bg-zinc-900/90 border-zinc-800" : "bg-white/90 border-gray-200"}`}
                >
                  <div className="text-xl md:text-2xl font-bold text-orange-500">15,000+</div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    Happy Customers
                  </div>
                </div>
                <div
                  className={`backdrop-blur-xl border rounded-xl p-3 md:p-4 text-center ${theme === "dark" ? "bg-zinc-900/90 border-zinc-800" : "bg-white/90 border-gray-200"}`}
                >
                  <div className="text-xl md:text-2xl font-bold text-orange-500">4.9/5</div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                    Average Rating
                  </div>
                </div>
                <div
                  className={`backdrop-blur-xl border rounded-xl p-3 md:p-4 text-center ${theme === "dark" ? "bg-zinc-900/90 border-zinc-800" : "bg-white/90 border-gray-200"}`}
                >
                  <div className="text-xl md:text-2xl font-bold text-orange-500">50,000h</div>
                  <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Lamp Lifespan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className={`px-4 py-20 md:py-28 ${theme === "dark" ? "bg-gradient-to-b from-zinc-950 to-zinc-900" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Engineering Excellence
            </h2>
            <p className={`text-lg md:text-xl ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              Precision-crafted for the ultimate viewing experience
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div
                  key={i}
                  className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 group hover:border-orange-500/50 ${theme === "dark" ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800" : "bg-white border-gray-200 hover:shadow-lg"}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {benefit.title}
                  </h3>
                  <p className={`leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                    {benefit.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section className={`px-4 py-20 ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              See the Difference
            </h2>
            <p className={`text-lg md:text-xl ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              Watch our 4K projector in action
            </p>
          </div>
          <div
            className={`relative aspect-video rounded-2xl overflow-hidden border shadow-2xl group cursor-pointer ${theme === "dark" ? "border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800" : "border-gray-200 bg-gray-100"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-purple-500/10" />
            <video
              className="w-full h-full object-cover"
              controls
              poster="/img/61lopDncM+L._AC_SX425_.jpg"
            >
              <source src="/img/snaptik_7565663003035634962_v2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-80 transition-opacity">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-500/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-orange-500/50">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className={`px-4 py-20 ${theme === "dark" ? "bg-zinc-950/50" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Technical Specifications
            </h2>
            <p className={`text-lg md:text-xl ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              Professional-grade performance in every detail
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {specs.map((spec, i) => (
              <div
                key={i}
                className={`border p-6 md:p-8 rounded-xl transition-all hover:border-orange-500/30 ${theme === "dark" ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800" : "bg-white border-gray-200"}`}
              >
                <div
                  className={`text-sm mb-2 uppercase tracking-wider ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
                >
                  {spec.label}
                </div>
                <div className={`text-xl md:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className={`px-4 py-20 ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 md:w-8 md:h-8 fill-orange-500 text-orange-500" />
              ))}
            </div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Loved by Professionals
            </h2>
            <p className={`text-lg md:text-xl ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              Join thousands of satisfied customers worldwide
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 rounded-2xl border transition-all hover:border-orange-500/30 ${theme === "dark" ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800" : "bg-white border-gray-200"}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className={`text-lg mb-6 leading-relaxed ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {review.name}
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>{review.role}</p>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-xs bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20">
                      <Check className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Offer Countdown */}
      <section className="px-4 py-20 relative overflow-hidden">
        <div
          className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-r from-orange-950/50 via-zinc-950 to-purple-950/50" : "bg-gradient-to-r from-orange-100 via-white to-purple-100"}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold rounded-full border ${theme === "dark" ? "bg-orange-500/20 border-orange-500/30" : "bg-orange-100 border-orange-300"}`}
          >
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-orange-500">Launch Special Ends Soon</span>
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-6xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Save Up To $80 Today
          </h2>
          <p className={`text-lg md:text-xl mb-12 ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
            Limited inventory - only 47 units available at this exclusive price
          </p>
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
            <div
              className={`backdrop-blur-sm border rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] ${theme === "dark" ? "bg-zinc-900/80 border-orange-500/30" : "bg-white border-orange-300"}`}
            >
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className={`text-xs md:text-sm mt-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                Hours
              </div>
            </div>
            <div className="text-2xl md:text-3xl text-orange-500">:</div>
            <div
              className={`backdrop-blur-sm border rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] ${theme === "dark" ? "bg-zinc-900/80 border-orange-500/30" : "bg-white border-orange-300"}`}
            >
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className={`text-xs md:text-sm mt-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                Minutes
              </div>
            </div>
            <div className="text-2xl md:text-3xl text-orange-500">:</div>
            <div
              className={`backdrop-blur-sm border rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] ${theme === "dark" ? "bg-zinc-900/80 border-orange-500/30" : "bg-white border-orange-300"}`}
            >
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className={`text-xs md:text-sm mt-2 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                Seconds
              </div>
            </div>
          </div>
          <Link href="/product">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 md:px-12 py-6 md:py-7 text-lg md:text-xl font-bold shadow-2xl shadow-orange-500/30"
            >
              Claim Your Discount Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className={`px-4 py-20 ${theme === "dark" ? "bg-zinc-900/30" : "bg-gray-50"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              The Clear Choice
            </h2>
            <p className={`text-lg md:text-xl ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
              See how we compare to premium alternatives
            </p>
          </div>
          <div
            className={`border rounded-2xl overflow-hidden shadow-2xl ${theme === "dark" ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800" : "bg-white border-gray-200"}`}
          >
            <div className={`grid grid-cols-3 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}>
              <div className={`p-4 md:p-6 ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>Feature</div>
              <div className="p-4 md:p-6 text-center bg-orange-500/10 font-bold text-orange-500">Our Projector</div>
              <div className={`p-4 md:p-6 text-center ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                Competitors
              </div>
            </div>
            {comparison.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b last:border-0 ${theme === "dark" ? "border-zinc-800" : "border-gray-200"}`}
              >
                <div className={`p-4 md:p-6 text-sm md:text-base ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {row.feature}
                </div>
                <div className="p-4 md:p-6 text-center bg-orange-500/5">
                  {typeof row.us === "boolean" ? (
                    row.us ? (
                      <Check className="w-5 h-5 md:w-6 md:h-6 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-red-500">✕</span>
                    )
                  ) : (
                    <span className="text-orange-500 font-bold text-sm md:text-base">{row.us}</span>
                  )}
                </div>
                <div className={`p-4 md:p-6 text-center ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
                  {typeof row.them === "boolean" ? (
                    row.them ? (
                      <Check className="w-5 h-5 md:w-6 md:h-6 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-red-500">✕</span>
                    )
                  ) : (
                    <span className="text-orange-500 font-bold text-sm md:text-base">{row.them}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
