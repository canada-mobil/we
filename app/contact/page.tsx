"use client"

import type React from "react"

import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { useState } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Message sent successfully!", {
      description: "Our team will get back to you within 24 hours.",
    })
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Get in Touch
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Have questions? Our expert team is here to help you find the perfect home cinema solution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Phone */}
              <div className={`flex gap-4 p-4 rounded-xl ${theme === "dark" ? "bg-zinc-900" : "bg-gray-50"}`}>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Phone Support
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                    1-800-CINEMA (246-3621)
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>
                    Mon-Sun, 24/7 Support
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className={`flex gap-4 p-4 rounded-xl ${theme === "dark" ? "bg-zinc-900" : "bg-gray-50"}`}>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Email Us
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                    support@cinemaprojector.com
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>
                    Response within 2 hours
                  </p>
                </div>
              </div>

              {/* Live Chat */}
              <div className={`flex gap-4 p-4 rounded-xl ${theme === "dark" ? "bg-zinc-900" : "bg-gray-50"}`}>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Live Chat
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                    Chat with our experts now
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>
                    Average wait time: 30 seconds
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className={`flex gap-4 p-4 rounded-xl ${theme === "dark" ? "bg-zinc-900" : "bg-gray-50"}`}>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Head Office
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                    401 Bay St
                    <br />
                    Toronto, ON M5H 2Y4, Canada
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className={`flex gap-4 p-4 rounded-xl ${theme === "dark" ? "bg-zinc-900" : "bg-gray-50"}`}>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Business Hours
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                    Monday - Friday: 8am - 8pm EST
                    <br />
                    Saturday - Sunday: 9am - 6pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Subject *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                >
                  <option value="">Select a subject</option>
                  <option value="product">Product Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="bulk">Bulk Order / B2B</option>
                  <option value="shipping">Shipping & Delivery</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none`}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
