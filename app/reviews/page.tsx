"use client"

import { Star, ThumbsUp, CheckCircle, TrendingUp } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

export default function ReviewsPage() {
  const { theme } = useTheme()

  const stats = [
    { label: "Average Rating", value: "4.9/5", icon: Star },
    { label: "Total Reviews", value: "2,847", icon: TrendingUp },
    { label: "Verified Purchases", value: "98%", icon: CheckCircle },
    { label: "Recommend Rate", value: "97%", icon: ThumbsUp },
  ]

  const ratingBreakdown = [
    { stars: 5, percentage: 89, count: 2534 },
    { stars: 4, percentage: 8, count: 228 },
    { stars: 3, percentage: 2, count: 57 },
    { stars: 2, percentage: 0.5, count: 14 },
    { stars: 1, percentage: 0.5, count: 14 },
  ]

  const reviews = [
    {
      id: 1,
      name: "Michael Chen",
      package: "Ultimate Package",
      rating: 5,
      date: "2 days ago",
      verified: true,
      helpful: 234,
      review:
        "Absolutely incredible! The picture quality is beyond anything I've experienced. The 4K resolution is crystal clear, even on my 150\" screen. The whole setup was seamless with the included guide. Worth every penny!",
    },
    {
      id: 2,
      name: "Sarah Thompson",
      package: "Professional Package",
      rating: 5,
      date: "1 week ago",
      verified: true,
      helpful: 189,
      review:
        "Best purchase I've made this year. Upgraded from a 1080p projector and the difference is night and day. The brightness is perfect even with some ambient light. Gaming on this is an experience - the low input lag makes it perfect for my PS5.",
    },
    {
      id: 3,
      name: "David Martinez",
      package: "Starter Package",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      helpful: 156,
      review:
        "For the price, this is unbeatable. I was skeptical about buying direct from the manufacturer, but the quality exceeded my expectations. Shipping was fast, and customer support answered all my questions promptly. Highly recommend!",
    },
    {
      id: 4,
      name: "Jennifer Lee",
      package: "Ultimate Package",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      helpful: 143,
      review:
        "This projector transformed our basement into a real home theater. The sound system that comes with the Ultimate package is surprisingly good. We've hosted multiple movie nights and everyone is blown away. The 5-year warranty gives great peace of mind.",
    },
    {
      id: 5,
      name: "Robert Johnson",
      package: "Professional Package",
      rating: 4,
      date: "1 month ago",
      verified: true,
      helpful: 98,
      review:
        "Excellent projector overall. The only minor issue is the fan noise, which is noticeable in very quiet scenes, but it's not a deal-breaker. Picture quality is outstanding and the HDR support really makes movies pop. Very happy with this purchase.",
    },
    {
      id: 6,
      name: "Emma Wilson",
      package: "Starter Package",
      rating: 5,
      date: "1 month ago",
      verified: true,
      helpful: 87,
      review:
        "Perfect entry-level projector! I didn't need all the bells and whistles of the higher packages. This does exactly what I need - beautiful 4K picture for movies and shows. Setup was easy and it looks great in my living room.",
    },
  ]

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Customer Reviews
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Real reviews from real customers who love their home theaters
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`rounded-xl border p-6 text-center ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
              >
                <Icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className={`text-2xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Rating Breakdown */}
        <div
          className={`rounded-2xl border p-8 mb-12 ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Rating Breakdown
          </h2>
          <div className="space-y-3">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {item.stars}
                  </span>
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                </div>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
                <span className={`text-sm w-12 text-right ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`rounded-2xl border p-6 ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{review.name}</h3>
                    {review.verified && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${theme === "dark" ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700"}`}
                      >
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>
                    Purchased: {review.package}
                  </p>
                </div>
                <span className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>{review.date}</span>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? "fill-orange-500 text-orange-500" : theme === "dark" ? "text-zinc-700" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className={`mb-4 leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
                {review.review}
              </p>

              <button
                className={`flex items-center gap-2 text-sm ${theme === "dark" ? "text-zinc-400 hover:text-orange-400" : "text-gray-600 hover:text-orange-600"} transition-colors`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
