"use client"

import { useTheme } from "@/lib/theme-context"
import { Footer } from "@/components/footer"
import { FileText, Scale, AlertTriangle, Shield, CheckCircle2 } from "lucide-react"

export default function TermsOfServicePage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Last Updated: January 9, 2026
          </p>
        </div>

        <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">1. Acceptance of Terms</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              By accessing or using the Lumina4K website and services ("Services"), you agree to be bound by these
              Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services.
              These Terms constitute a legally binding agreement between you and Lumina4K Inc. ("Company," "we,"
              "us," or "our").
            </p>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">2. Use of Services</h2>
            </div>
            <h3 className="text-xl font-semibold mb-3">2.1 Eligibility</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              You must be at least 18 years old to use our Services. By using our Services, you represent and warrant
              that you meet this requirement.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Account Registration</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              You may be required to create an account to access certain features. You are responsible for:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Promptly updating your account information</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3 mt-4">2.3 Prohibited Uses</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>You agree not to:</p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>Use our Services for any illegal purpose or in violation of any laws</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated systems to access the Services without permission</li>
              <li>Reproduce, duplicate, or exploit any part of the Services without authorization</li>
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">3. Products and Orders</h2>
            </div>
            <h3 className="text-xl font-semibold mb-3">3.1 Product Information</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We strive to provide accurate product descriptions, specifications, and pricing. However, we do not
              warrant that product descriptions, images, or other content are accurate, complete, reliable, current, or
              error-free. We reserve the right to correct errors and update information at any time without notice.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-4">3.2 Pricing</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              All prices are in Canadian Dollars (CAD) or US Dollars (USD) as displayed and are subject to change
              without notice. We reserve the right to modify prices at any time. Prices do not include applicable taxes,
              which will be calculated at checkout.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-4">3.3 Order Acceptance</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order
              for any reason, including:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>Product unavailability</li>
              <li>Errors in pricing or product information</li>
              <li>Suspected fraudulent or unauthorized transactions</li>
              <li>Violation of these Terms</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3 mt-4">3.4 Payment</h3>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Payment must be received before order processing. We accept major credit cards and other payment methods
              as displayed at checkout. You authorize us to charge your payment method for the total amount of your
              order.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">4. Shipping and Delivery</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Shipping terms are detailed in our Shipping & Returns policy. Delivery times are estimates and not
              guaranteed. Risk of loss and title for products pass to you upon delivery to the carrier. We are not
              responsible for delays caused by shipping carriers or circumstances beyond our control.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">5. Returns and Refunds</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Our return and refund policy is detailed in our Refund Policy. All returns are subject to inspection and
              approval. Products must be returned in original condition with all accessories and packaging.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">6. Warranty</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Product warranties are detailed in our Warranty policy. Warranties are limited to the terms specified and
              do not cover damage from misuse, unauthorized modifications, or normal wear and tear.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              All content on our Services, including text, graphics, logos, images, and software, is the property of
              Lumina4K or its licensors and is protected by copyright, trademark, and other intellectual property
              laws. You may not reproduce, distribute, modify, or create derivative works without our express written
              permission.
            </p>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">8. Disclaimer of Warranties</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              THE SERVICES AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
              EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, HOMETHEATER4K SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY
              OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES. OUR TOTAL LIABILITY SHALL
              NOT EXCEED THE AMOUNT YOU PAID FOR THE PRODUCT OR SERVICE GIVING RISE TO THE CLAIM.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              You agree to indemnify, defend, and hold harmless Lumina4K and its officers, directors, employees,
              and agents from any claims, liabilities, damages, losses, and expenses arising out of your use of the
              Services, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">11. Governing Law and Dispute Resolution</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable
              therein. Any disputes shall be resolved through binding arbitration in Toronto, Ontario, except that
              either party may seek injunctive relief in court.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the
              website. Your continued use of the Services after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
            <div
              className={`p-4 rounded-lg mt-4 ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-gray-50 border border-gray-200"}`}
            >
              <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
                For questions about these Terms, contact us at:
                <br />
                <strong>Lumina4K Inc.</strong>
                <br />
                Email: legal@hometheater4k.com
                <br />
                Phone: 1-800-CINEMA-4K
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
