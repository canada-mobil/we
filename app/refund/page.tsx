"use client"

import { useTheme } from "@/lib/theme-context"
import { Footer } from "@/components/footer"
import { RefreshCw, Package, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export default function RefundPolicyPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <RefreshCw className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Last Updated: January 9, 2026
          </p>
        </div>

        <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">1. 14-Day Return Window</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We want you to be completely satisfied with your purchase. If you're not 100% happy with your
              Lumina4K projector, you may return it within 14 days of delivery for a full refund. The 14-day period
              begins on the day you receive your product.
            </p>
            <div
              className={`p-4 rounded-lg mt-4 ${theme === "dark" ? "bg-orange-950/20 border border-orange-900/50" : "bg-orange-50 border border-orange-200"}`}
            >
              <p className={`flex items-start gap-2 ${theme === "dark" ? "text-orange-200" : "text-orange-900"}`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Important: The return must be initiated within 14 days, and the product must be shipped back within 5
                  days of initiating the return.
                </span>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">2. Eligible Returns</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              To be eligible for a return and refund, your product must meet the following conditions:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>
                <strong>Original Condition:</strong> Product must be in new, unused condition with no signs of wear or
                damage
              </li>
              <li>
                <strong>Complete Package:</strong> All original accessories, cables, manuals, and packaging must be
                included
              </li>
              <li>
                <strong>Original Packaging:</strong> Product must be returned in the original manufacturer's packaging
                (not just the shipping box)
              </li>
              <li>
                <strong>No Damage:</strong> Product must not show signs of physical damage, liquid damage, or
                unauthorized modifications
              </li>
              <li>
                <strong>Serial Number Intact:</strong> Serial number labels must be intact and match our records
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">3. Non-Returnable Items</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              The following items are not eligible for return or refund:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>Products damaged due to misuse, abuse, or improper installation</li>
              <li>Products with missing accessories or parts</li>
              <li>Products returned after the 14-day window</li>
              <li>Products without original packaging</li>
              <li>Clearance or final sale items (if marked as such)</li>
              <li>Custom or special order items</li>
              <li>Gift cards or promotional items</li>
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">4. Return Process</h2>
            </div>
            <h3 className="text-xl font-semibold mb-3">Step 1: Contact Us</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Email us at returns@hometheater4k.com or call 1-800-CINEMA-4K with your order number and reason for
              return. Our customer service team will review your request within 24 hours.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-4">Step 2: Receive Return Authorization</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Once approved, you'll receive a Return Merchandise Authorization (RMA) number and return shipping label
              via email. Do not ship items without an RMA number.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-4">Step 3: Pack Your Return</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Carefully pack the product in its original packaging with all accessories. Include a copy of your order
              confirmation. Place the return shipping label on the outside of the package.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-4">Step 4: Ship Your Return</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Drop off your package at the designated carrier location. Keep your tracking number for your records. We
              recommend using a trackable shipping method.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">5. Refund Processing</h2>
            <h3 className="text-xl font-semibold mb-3">Inspection</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Once we receive your return, our quality control team will inspect the product within 2-3 business days to
              ensure it meets our return criteria.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-4">Refund Timeline</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              If your return is approved, we will process your refund to the original payment method within 5-7 business
              days. Depending on your financial institution, it may take an additional 5-10 business days for the refund
              to appear in your account.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-4">Refund Amount</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              You will receive a full refund of the purchase price, including original shipping costs (if applicable).
              Return shipping costs are covered by Lumina4K when using our provided label.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">6. Exchanges</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              If you wish to exchange your product for a different model or package:
            </p>
            <ol className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>Follow the return process above</li>
              <li>Indicate you want an exchange when contacting customer service</li>
              <li>Once your return is received and approved, we'll send you the new product</li>
              <li>If there's a price difference, we'll either refund or charge the difference</li>
            </ol>
            <p className={theme === "dark" ? "text-zinc-300 mt-4" : "text-gray-700 mt-4"}>
              Exchanges are subject to product availability. If the desired product is unavailable, we'll process a full
              refund.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">7. Defective or Damaged Products</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              If you receive a defective or damaged product:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>Contact us immediately (within 48 hours of delivery)</li>
              <li>Provide photos of the damage or defect</li>
              <li>We'll expedite a replacement or full refund at no cost to you</li>
              <li>
                Defective products may be covered under warranty instead of return policy - see our Warranty page for
                details
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">8. Refused or Rejected Returns</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              If your return does not meet our criteria, we reserve the right to reject the return. In such cases:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>We'll notify you via email with the reason for rejection</li>
              <li>You may choose to have the product shipped back to you at your expense</li>
              <li>If you don't respond within 30 days, the product will be disposed of and no refund will be issued</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">9. Restocking Fees</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Lumina4K does not charge restocking fees for standard returns within the 14-day window. However, a
              15% restocking fee may apply to:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>Products returned without original packaging</li>
              <li>Products with minor cosmetic damage</li>
              <li>Products returned after attempted installation or modification</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">10. International Returns</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              For orders shipped outside of Canada and the USA, please contact our international support team at
              international@hometheater4k.com. International returns may have different policies and shipping costs.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">11. Warranty vs. Return Policy</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              This return policy applies to returns within 14 days of delivery. For issues that arise after 14 days,
              your product may be covered under our manufacturer's warranty. Please see our Warranty page for full
              details on warranty coverage, which ranges from 2-5 years depending on your package.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
            <div
              className={`p-4 rounded-lg mt-4 ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-gray-50 border border-gray-200"}`}
            >
              <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
                Questions about returns or refunds? Contact our customer service team:
                <br />
                <strong>Returns Department</strong>
                <br />
                Email: returns@hometheater4k.com
                <br />
                Phone: 1-800-CINEMA-4K
                <br />
                Hours: Monday-Friday, 9 AM - 6 PM EST
                <br />
                Address: 401 Bay St, Toronto, ON M5H 2Y4, Canada
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
