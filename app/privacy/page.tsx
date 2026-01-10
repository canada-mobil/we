"use client"

import { useTheme } from "@/lib/theme-context"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react"

export default function PrivacyPolicyPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
            Last Updated: January 9, 2026
          </p>
        </div>

        <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">1. Information We Collect</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              At Lumina4K, we collect information that you provide directly to us, including:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, shipping and billing
                addresses, date of birth, and payment information.
              </li>
              <li>
                <strong>Account Information:</strong> Username, password, and preferences when you create an account.
              </li>
              <li>
                <strong>Order Information:</strong> Purchase history, product preferences, and communication
                preferences.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser type, device information, and browsing
                behavior through cookies and similar technologies.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">2. How We Use Your Information</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We use the information we collect to:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>Process and fulfill your orders, including shipping and payment processing</li>
              <li>Communicate with you about your orders, products, services, and promotional offers</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Improve our website, products, and services</li>
              <li>Detect, prevent, and address technical issues and fraudulent activity</li>
              <li>Comply with legal obligations and protect our rights</li>
              <li>Send you marketing communications (with your consent where required)</li>
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">3. Information Sharing and Disclosure</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>
                <strong>Service Providers:</strong> Third-party companies that help us operate our business (payment
                processors, shipping carriers, email services)
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or
                acquisition
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly agree to share information with third parties
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">4. Your Rights and Choices</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>You have the right to:</p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>
                <strong>Access:</strong> Request a copy of the personal information we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Update or correct your personal information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time
              </li>
              <li>
                <strong>Data Portability:</strong> Request your data in a portable format
              </li>
              <li>
                <strong>Restriction:</strong> Request restriction of processing of your personal information
              </li>
            </ul>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              To exercise these rights, contact us at privacy@hometheater4k.com
            </p>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold m-0">5. Data Security and Retention</h2>
            </div>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure payment processing through PCI-DSS compliant providers</li>
              <li>Regular security assessments and updates</li>
              <li>Restricted access to personal information on a need-to-know basis</li>
              <li>Employee training on data protection and privacy</li>
            </ul>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking Technologies</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We use cookies and similar tracking technologies to enhance your experience on our website. You can
              control cookies through your browser settings, but disabling cookies may limit functionality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">7. International Data Transfers</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Your information may be transferred to and processed in countries other than your country of residence. We
              ensure appropriate safeguards are in place to protect your information in accordance with this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal
              information from children under 18. If you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new policy on this page and updating the "Last Updated" date. Your continued use of our services after
              changes constitute acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div
              className={`p-4 rounded-lg mt-4 ${theme === "dark" ? "bg-zinc-900 border border-zinc-800" : "bg-gray-50 border border-gray-200"}`}
            >
              <p className={theme === "dark" ? "text-zinc-300" : "text-gray-700"}>
                <strong>Lumina4K</strong>
                <br />
                Email: privacy@hometheater4k.com
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
