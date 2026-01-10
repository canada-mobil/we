"use client"

import { useTheme } from "@/lib/theme-context"
import { Award, Users, Shield, Target, Sparkles, MapPin } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const { theme } = useTheme()

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      desc: "We pioneer cutting-edge projection technology to deliver unmatched viewing experiences.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      desc: "Every projector undergoes rigorous testing to meet our premium standards.",
    },
    {
      icon: Users,
      title: "Customer Focused",
      desc: "Your satisfaction drives everything we do, from design to support.",
    },
    {
      icon: Sparkles,
      title: "Sustainability",
      desc: "Long-lasting LED technology reduces waste and energy consumption.",
    },
  ]

  const milestones = [
    { year: "2019", event: "Company Founded", desc: "Started with a vision to democratize cinema quality" },
    { year: "2021", event: "First Product Launch", desc: "Introduced our revolutionary 4K projector" },
    { year: "2023", event: "15,000 Customers", desc: "Reached milestone of happy customers worldwide" },
    { year: "2026", event: "Industry Leader", desc: "Recognized as top projector brand for home cinema" },
  ]

  const founders = [
    {
      name: "Martin H.",
      age: 34,
      role: "Co-Founder & CEO",
      image: "/img/martin.jpg",
      bio: "With over 12 years of experience in optical engineering and business development, Martin leads our vision to revolutionize home entertainment. His expertise in manufacturing and supply chain optimization has enabled us to deliver premium quality at factory-direct prices.",
      location: "Toronto, Canada",
    },
    {
      name: "William J.",
      age: 38,
      role: "Co-Founder & CTO",
      image: "/img/william.jpg",
      bio: "A seasoned technology executive and cinema enthusiast, William oversees our product development and innovation strategy. His background in advanced imaging systems and LED technology drives our commitment to delivering cinema-quality experiences at home.",
      location: "Vancouver, Canada",
    },
  ]

  return (
    <>
      <div className={`min-h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
        {/* Hero */}
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          <div
            className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5" : ""}`}
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold rounded-full border ${theme === "dark" ? "bg-gradient-to-r from-orange-500/20 to-purple-500/20 border-orange-500/30" : "bg-orange-50 border-orange-200"}`}
              >
                <Award className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500">About Us</span>
              </div>
              <h1
                className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                Redefining Home
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
                  Entertainment
                </span>
              </h1>
              <p
                className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
              >
                We're on a mission to bring cinema-quality experiences to every home. Through innovation, quality, and
                customer dedication, we're transforming how people enjoy entertainment.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className={`px-4 py-16 ${theme === "dark" ? "bg-zinc-900/30" : "bg-gray-50"}`}>
          <div className="max-w-5xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-8 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Our Story
            </h2>
            <div
              className={`border rounded-2xl p-8 md:p-12 ${theme === "dark" ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800" : "bg-white border-gray-200"}`}
            >
              <p className={`text-lg leading-relaxed mb-6 ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
                Founded in 2019 by two Canadian engineers, we built our own manufacturing facility to produce premium 4K
                projectors at scale. Today, we manufacture over 50,000 units annually—not just for our brand, but also
                supplying major retailers across North America including Best Buy, Amazon, and regional chains.
              </p>
              <p className={`text-lg leading-relaxed mb-6 ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
                By selling directly to consumers, we bypass traditional retail markups of 200-400%. The same projector
                you see in stores for $2,000+ comes from our factory—we just sell it to you at our cost plus a fair
                margin. Our bulk production capabilities and streamlined supply chain make premium projection accessible
                to everyone.
              </p>
              <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
                With warehouses in Vancouver, Toronto, Los Angeles, and Dallas, we offer 2-3 day delivery across USA and
                Canada. Today, over 15,000 customers worldwide have transformed their homes into private cinemas with
                our factory-direct pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className={`px-4 py-16 ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-16 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Our Core Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <div
                    key={i}
                    className={`p-6 md:p-8 rounded-2xl border transition-all hover:border-orange-500/50 ${theme === "dark" ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800" : "bg-white border-gray-200"}`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-orange-500" />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {value.title}
                    </h3>
                    <p className={`leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                      {value.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Co-Founders Section */}
        <section className={`px-4 py-16 ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Meet The Team
            </h2>
            <p
              className={`text-center mb-12 max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
            >
              Two friends who shared a dream of bringing cinema-quality projection to every home
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {founders.map((founder, i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden border ${theme === "dark" ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800" : "bg-white border-gray-200"}`}
                >
                  <div className="aspect-square relative bg-gradient-to-br from-orange-500/10 to-purple-500/10">
                    <Image src={founder.image || "/placeholder.svg"} alt={founder.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {founder.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-orange-500 font-semibold">{founder.role}</span>
                      <span className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-gray-400"}`}>
                        • Age {founder.age}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm mb-4 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
                    >
                      <MapPin className="w-4 h-4 text-orange-500" />
                      {founder.location}
                    </div>
                    <p className={`leading-relaxed ${theme === "dark" ? "text-zinc-300" : "text-gray-600"}`}>
                      {founder.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className={`px-4 py-16 ${theme === "dark" ? "bg-zinc-900/30" : "bg-gray-50"}`}>
          <div className="max-w-5xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-16 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Our Journey
            </h2>
            <div className="space-y-6 md:space-y-8">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                  <div className="flex-shrink-0 w-full md:w-32">
                    <div className="text-2xl md:text-3xl font-bold text-orange-500">{milestone.year}</div>
                  </div>
                  <div
                    className={`flex-1 border rounded-xl p-6 md:p-8 ${theme === "dark" ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800" : "bg-white border-gray-200"}`}
                  >
                    <h3
                      className={`text-xl md:text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {milestone.event}
                    </h3>
                    <p className={`text-lg ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className={`px-4 py-16 ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">15,000+</div>
                <div className={theme === "dark" ? "text-zinc-400" : "text-gray-600"}>Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">4.9/5</div>
                <div className={theme === "dark" ? "text-zinc-400" : "text-gray-600"}>Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">98%</div>
                <div className={theme === "dark" ? "text-zinc-400" : "text-gray-600"}>Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">24/7</div>
                <div className={theme === "dark" ? "text-zinc-400" : "text-gray-600"}>Customer Support</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
