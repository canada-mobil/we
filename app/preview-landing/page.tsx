"use client"

import { useState, useEffect } from "react"

export default function LandingPagePreview() {
  const [countdown, setCountdown] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: "Est-ce que le projecteur fonctionne en plein jour?",
      a: "Oui! Notre technologie LED ultra-lumineuse permet une visualisation claire même dans des pièces éclairées. Pour une expérience optimale, nous recommandons une luminosité ambiante modérée.",
    },
    {
      q: "Quelle est la durée de vie de la lampe?",
      a: "Notre projecteur utilise une technologie LED avec une durée de vie de 50,000 heures. Cela équivaut à environ 10 ans d'utilisation quotidienne de 5 heures.",
    },
    {
      q: "Puis-je le connecter à Netflix, Amazon Prime?",
      a: "Absolument! Le projecteur se connecte à n'importe quel appareil HDMI: Fire Stick, Apple TV, Chromecast, consoles de jeu, ordinateurs portables, etc.",
    },
    {
      q: "Quelle distance pour une image de 100 pouces?",
      a: "Pour une image de 100 pouces, placez le projecteur à environ 2,5-3 mètres du mur. La mise au point automatique s'ajuste pour garantir une netteté parfaite.",
    },
    {
      q: "Que comprend la garantie de 2 ans?",
      a: "Notre garantie couvre tous les défauts de fabrication et les problèmes techniques. Support client 24/7 inclus. Remplacement gratuit si nécessaire.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Transform Your Home Into A <span className="text-[#ff6b35] block mt-2">Premium Cinema</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
              Experience stunning 4K clarity on screens up to 200 inches. The ultimate home entertainment upgrade.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
              <a
                href="#offer"
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Shop Now - Save 40%
              </a>
              <a
                href="#demo"
                className="border-2 border-[#ff6b35] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#ff6b35]/10 transition-colors"
              >
                Watch Demo
              </a>
            </div>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-[#ff6b35] font-bold">✓</span>
                <span className="text-gray-400 text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#ff6b35] font-bold">✓</span>
                <span className="text-gray-400 text-sm">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#ff6b35] font-bold">✓</span>
                <span className="text-gray-400 text-sm">2-Year Warranty</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/premium-4k-projector-product-shot.jpg"
              alt="Premium 4K Projector"
              className="rounded-2xl shadow-2xl shadow-[#ff6b35]/20"
            />
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose Our 4K Projector?</h2>
            <p className="text-lg text-gray-400">Revolutionary technology meets cinema-grade performance</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "4K",
                title: "True 4K Resolution",
                desc: "8.3 million pixels deliver crystal-clear images with stunning detail that brings every scene to life.",
              },
              {
                icon: '200"',
                title: 'Up to 200" Screen',
                desc: "Project massive images that dwarf any TV. Turn any wall into a cinematic masterpiece.",
              },
              {
                icon: "⚡",
                title: "5-Minute Setup",
                desc: "Plug and play simplicity. No complicated installation or professional help required.",
              },
              {
                icon: "☀️",
                title: "Ultra-Bright Display",
                desc: "Advanced LED technology ensures perfect clarity even in well-lit rooms.",
              },
            ].map((benefit, i) => (
              <article
                key={i}
                className="bg-[#1a1a1a] p-8 rounded-xl border border-[#2a2a2a] hover:border-[#ff6b35] hover:-translate-y-1 transition-all"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-xl flex items-center justify-center text-3xl font-bold mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" id="demo">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">See It In Action</h2>
            <p className="text-lg text-gray-400">Watch how easy it is to transform your space</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-[#2a2a2a] flex items-center justify-center">
            <button className="w-20 h-20 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-full flex items-center justify-center text-3xl text-white hover:scale-110 transition-transform">
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-20 px-4 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Technical Specifications</h2>
            <p className="text-lg text-gray-400">Professional-grade performance at your fingertips</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Resolution", value: "3840 x 2160 4K" },
              { label: "Brightness", value: "9000 Lumens" },
              { label: "Screen Size", value: '40" - 200"' },
              { label: "Contrast", value: "10,000:1" },
              { label: "Lamp Life", value: "50,000 Hours" },
              { label: "Connectivity", value: "HDMI, USB, WiFi" },
            ].map((spec, i) => (
              <div key={i} className="bg-[#1a1a1a] p-6 rounded-lg border-l-4 border-[#ff6b35]">
                <div className="text-gray-500 text-sm uppercase tracking-wide mb-2">{spec.label}</div>
                <div className="text-white text-2xl font-semibold">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-400">Join 10,000+ happy home cinema enthusiasts</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marc D.",
                review:
                  "Absolutely blown away! The picture quality is incredible. Feels like a real cinema in my living room. Best purchase of the year!",
                rating: 5,
              },
              {
                name: "Sophie L.",
                review:
                  "Setup was so easy, even my grandma could do it. Image is crystal clear even with lights on. Netflix nights will never be the same!",
                rating: 5,
              },
              {
                name: "Thomas B.",
                review:
                  "I was skeptical about the price but it's worth every penny. The 4K quality is insane. Friends keep asking where I got it.",
                rating: 5,
              },
            ].map((review, i) => (
              <article key={i} className="bg-[#1a1a1a] p-8 rounded-xl border border-[#2a2a2a]">
                <div className="text-[#ff6b35] text-xl mb-4">{"★".repeat(review.rating)}</div>
                <p className="text-gray-400 leading-relaxed mb-6">"{review.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center text-white font-semibold">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{review.name}</div>
                    <div className="text-gray-500 text-sm">Verified Purchase</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42]" id="offer">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 px-6 py-2 rounded-full text-white font-semibold mb-6">
            LIMITED TIME OFFER
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Save 40% Today Only</h2>
          <p className="text-xl text-white/90 mb-8">
            €499 <span className="line-through opacity-60">€899</span> - Free Shipping Included
          </p>
          <div className="flex gap-4 justify-center mb-10">
            {["hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} className="bg-black/20 px-6 py-5 rounded-lg min-w-[100px]">
                <div className="text-4xl font-bold text-white">
                  {String(countdown[unit as keyof typeof countdown]).padStart(2, "0")}
                </div>
                <div className="text-white/80 text-sm uppercase mt-1">{unit}</div>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-block bg-white text-[#ff6b35] px-12 py-5 rounded-lg text-xl font-bold hover:scale-105 transition-transform"
          >
            Claim Your 40% Discount Now
          </a>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">CinemaMax Pro vs Regular Projectors</h2>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-6 bg-[#2a2a2a] font-semibold text-white">
              <div>Feature</div>
              <div>CinemaMax Pro</div>
              <div>Others</div>
            </div>
            {[
              ["4K Resolution", "✓ True 4K", "✗ Upscaled"],
              ["Brightness", "✓ 9000 Lumens", "✗ 3000 Lumens"],
              ["Setup Time", "✓ 5 Minutes", "✗ 30+ Minutes"],
              ["Warranty", "✓ 2 Years", "✗ 90 Days"],
              ["Price", "€499", "€400-800"],
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-4 p-6 border-b border-[#2a2a2a] last:border-b-0 text-gray-300"
              >
                <div>{row[0]}</div>
                <div className="text-[#ff6b35] font-semibold">{row[1]}</div>
                <div className="text-gray-500">{row[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Risk-Free Purchase Guarantee</h2>
            <p className="text-lg text-gray-400">Your satisfaction is our priority</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "↩️",
                title: "30-Day Money Back",
                desc: "Not satisfied? Return it within 30 days for a full refund. No questions asked.",
              },
              {
                icon: "🛡️",
                title: "2-Year Warranty",
                desc: "Complete coverage for any technical issues. Free repairs or replacement.",
              },
              {
                icon: "📦",
                title: "Free Shipping & Returns",
                desc: "We cover all shipping costs both ways. Zero risk for you.",
              },
            ].map((guarantee, i) => (
              <article key={i} className="bg-[#1a1a1a] p-8 rounded-xl text-center border-2 border-[#2a2a2a]">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                  {guarantee.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{guarantee.title}</h3>
                <p className="text-gray-400">{guarantee.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="text-lg font-semibold text-white">{faq.q}</span>
                  <span className={`text-2xl text-[#ff6b35] transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Entertainment?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of satisfied customers experiencing cinema at home
          </p>
          <a
            href="#offer"
            className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white px-12 py-5 rounded-lg text-xl font-bold hover:scale-105 transition-transform"
          >
            Get 40% Off - Limited Time
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">CinemaMax Pro</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Transforming homes into premium cinemas with cutting-edge 4K projection technology.
            </p>
            <div className="flex gap-3">
              {["f", "t", "i"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white hover:bg-[#ff6b35] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Specifications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Returns
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35]">
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#2a2a2a] pt-8 text-center text-gray-500">
          <p>&copy; 2026 CinemaMax Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
