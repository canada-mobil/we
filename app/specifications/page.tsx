"use client"

import { Cpu, Monitor, Zap, Volume2, Wifi } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

export default function SpecificationsPage() {
  const { theme } = useTheme()

  const specs = [
    {
      category: "Display Technology",
      icon: Monitor,
      items: [
        { label: "Resolution", value: "4K UHD (3840 x 2160)" },
        { label: "Brightness", value: "9500 ANSI Lumens" },
        { label: "Contrast Ratio", value: "50,000:1" },
        { label: "HDR Support", value: "HDR10, HLG" },
        { label: "Color Accuracy", value: "Rec. 709 100%, DCI-P3 95%" },
        { label: "Throw Ratio", value: "1.2:1 to 1.5:1" },
      ],
    },
    {
      category: "Performance",
      icon: Cpu,
      items: [
        { label: "Input Lag", value: "16ms (Gaming Mode)" },
        { label: "Refresh Rate", value: "60Hz / 120Hz (Gaming)" },
        { label: "Lamp Life", value: "20,000 hours (Normal), 30,000 hours (Eco)" },
        { label: "Cooling System", value: "Dual-fan advanced cooling" },
        { label: "Noise Level", value: "28dB (Normal), 24dB (Eco)" },
      ],
    },
    {
      category: "Connectivity",
      icon: Wifi,
      items: [
        { label: "HDMI", value: "3x HDMI 2.1 (eARC, HDCP 2.3)" },
        { label: "USB", value: "2x USB-A 3.0, 1x USB-C" },
        { label: "Audio", value: "Optical out, 3.5mm jack" },
        { label: "Wireless", value: "Wi-Fi 6, Bluetooth 5.2" },
        { label: "Network", value: "Ethernet (RJ45)" },
      ],
    },
    {
      category: "Audio",
      icon: Volume2,
      items: [
        { label: "Built-in Speakers", value: "10W / 20W / 40W (depending on package)" },
        { label: "Audio Formats", value: "Dolby Atmos, DTS:X (Ultimate only)" },
        { label: "Audio Return", value: "eARC compatible" },
        { label: "External Audio", value: "3.5mm jack, Optical out" },
      ],
    },
    {
      category: "Power & Physical",
      icon: Zap,
      items: [
        { label: "Power Consumption", value: "280W (Normal), 210W (Eco)" },
        { label: "Standby Power", value: "<0.5W" },
        { label: "Dimensions", value: "380 x 285 x 135mm" },
        { label: "Weight", value: "4.2 kg (9.3 lbs)" },
        { label: "Operating Temp", value: "5°C to 35°C" },
      ],
    },
  ]

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Technical Specifications
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Professional-grade 4K projector with cutting-edge technology
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="space-y-8">
          {specs.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.category}
                className={`rounded-2xl border p-6 md:p-8 ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {section.category}
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className={`flex justify-between items-start gap-4 p-4 rounded-lg ${theme === "dark" ? "bg-zinc-800/50" : "bg-white border border-gray-200"}`}
                    >
                      <span className={`font-medium text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                        {item.label}
                      </span>
                      <span
                        className={`font-semibold text-sm text-right ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Note */}
        <div
          className={`mt-8 p-6 rounded-2xl border ${theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-200"}`}
        >
          <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            <strong className={theme === "dark" ? "text-white" : "text-gray-900"}>Note:</strong> Specifications may vary
            slightly depending on the package and configuration. All measurements are approximate and subject to
            manufacturing tolerances. For the most up-to-date specifications, please contact our technical support team.
          </p>
        </div>
      </div>
    </div>
  )
}
