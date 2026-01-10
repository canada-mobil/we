"use client"

import { Shield, CheckCircle, Phone, Mail } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

export default function WarrantyPage() {
  const { theme } = useTheme()

  const warrantyLevels = [
    {
      package: "Starter Package",
      warranty: "2 Years",
      coverage: ["Hardware defects", "Manufacturing issues", "Parts replacement"],
    },
    {
      package: "Professional Package",
      warranty: "5 Years",
      coverage: ["Hardware defects", "Manufacturing issues", "Parts replacement", "Labor costs", "Priority support"],
      popular: true,
    },
    {
      package: "Ultimate Package",
      warranty: "5 Years + Extended",
      coverage: [
        "Hardware defects",
        "Manufacturing issues",
        "Parts replacement",
        "Labor costs",
        "Priority support",
        "On-site service",
        "Accidental damage protection",
      ],
    },
  ]

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Warranty Information
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Comprehensive protection for your investment
          </p>
        </div>

        {/* Warranty Levels */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {warrantyLevels.map((level) => (
            <div
              key={level.package}
              className={`rounded-2xl border p-6 ${
                level.popular
                  ? "border-orange-500 bg-gradient-to-b from-orange-500/10 to-transparent"
                  : theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-gray-200 bg-gray-50"
              }`}
            >
              {level.popular && (
                <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-4">
                  BEST VALUE
                </div>
              )}
              <h3 className={`font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{level.package}</h3>
              <p className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}>
                {level.warranty}
              </p>
              <ul className={`space-y-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                {level.coverage.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* What's Covered */}
        <div
          className={`rounded-2xl border p-8 mb-8 ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            What's Covered
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3
                className={`font-semibold mb-3 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                <Shield className="w-5 h-5 text-green-500" />
                Covered Issues
              </h3>
              <ul className={`space-y-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Manufacturing defects in materials or workmanship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Lamp/bulb failure under normal use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Electronic component malfunctions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Cooling system failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Lens and optical system defects</span>
                </li>
              </ul>
            </div>
            <div>
              <h3
                className={`font-semibold mb-3 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                <Shield className="w-5 h-5 text-red-500" />
                Not Covered
              </h3>
              <ul className={`space-y-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Accidental damage or misuse (except Ultimate)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Normal wear and tear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Unauthorized repairs or modifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Damage from power surges (use surge protector)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Cosmetic damage that doesn't affect performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Warranty Process */}
        <div
          className={`rounded-2xl border p-8 mb-8 ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            How to Claim Your Warranty
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Contact Support
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  Reach out via phone, email, or live chat with your order number and description of the issue
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Diagnosis & Authorization
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  Our technical team will diagnose the issue remotely and authorize the warranty claim within 24 hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Repair or Replacement
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                  We'll either send a replacement unit or arrange free pickup for repair. Most claims resolved in 3-5
                  days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Contact */}
        <div
          className={`rounded-2xl border p-8 ${theme === "dark" ? "bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30" : "bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200"}`}
        >
          <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Need Warranty Support?
          </h2>
          <p className={`mb-6 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
            Our warranty team is available 24/7 to assist you
          </p>
          <div className="flex flex-wrap gap-4">
            <div className={`flex items-center gap-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
              <Phone className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">1-800-WARRANTY</span>
            </div>
            <div className={`flex items-center gap-2 ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
              <Mail className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">warranty@Lumina4K.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
