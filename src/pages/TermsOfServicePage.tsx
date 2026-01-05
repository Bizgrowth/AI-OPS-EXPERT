import { useEffect } from 'react';
import Header from '../components/Header';
import SocialFooter from '../components/SocialFooter';
import { FileText, AlertCircle, CreditCard, Users, Scale, Shield } from 'lucide-react';

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last Updated: January 5, 2026</p>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-cyan-400" />
                Agreement to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms of Service constitute a legally binding agreement between you and Daniel Schley AI Ops Expert ("Company," "we," "us," or "our") concerning your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-cyan-400" />
                Description of Services
              </h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  We provide AI operations consulting services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI strategy development and implementation</li>
                  <li>Machine learning operations and infrastructure</li>
                  <li>AI system architecture and design</li>
                  <li>Custom AI solution development</li>
                  <li>Training and consultation services</li>
                  <li>Client portal access for project management and documentation</li>
                  <li>Ongoing support and maintenance services</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">User Accounts and Registration</h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  To access certain features of our services, including the client portal, you may be required to create an account. When creating an account, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We reserve the right to refuse service, terminate accounts, or remove or edit content at our sole discretion.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-cyan-400" />
                Payment Terms and Subscriptions
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Fees and Charges</h3>
                  <p className="leading-relaxed">
                    Certain services require payment of fees. You agree to pay all applicable fees as described on our website or in your service agreement. All fees are in U.S. dollars unless otherwise stated and are non-refundable except as expressly provided in these Terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Subscription Services</h3>
                  <p className="leading-relaxed mb-2">
                    If you purchase a subscription, you agree to the following:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Subscriptions automatically renew at the end of each billing period unless cancelled</li>
                    <li>You authorize us to charge your payment method for recurring fees</li>
                    <li>Subscription fees may change with 30 days advance notice</li>
                    <li>You may cancel your subscription at any time through the billing portal</li>
                    <li>Cancellation takes effect at the end of the current billing period</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Payment Processing</h3>
                  <p className="leading-relaxed">
                    Payments are processed securely through third-party payment processors (Stripe). You agree to comply with their terms and conditions. We do not store your complete payment card information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Refund Policy</h3>
                  <p className="leading-relaxed">
                    Refunds are provided at our sole discretion and on a case-by-case basis. Service-specific refund terms may be outlined in individual service agreements.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">You agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our services for any illegal purpose or in violation of any laws</li>
                  <li>Violate or infringe upon the rights of others</li>
                  <li>Transmit any harmful code, viruses, or malicious software</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Interfere with or disrupt the operation of our services</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Harvest or collect information about other users without consent</li>
                  <li>Use our services to spam, harass, or abuse others</li>
                  <li>Reverse engineer, decompile, or disassemble any part of our services</li>
                  <li>Share your account credentials with unauthorized parties</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property Rights</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Our Intellectual Property</h3>
                  <p className="leading-relaxed">
                    All content, features, and functionality of our services, including but not limited to text, graphics, logos, software, and documentation, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Your Content</h3>
                  <p className="leading-relaxed">
                    You retain ownership of any content you provide to us. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display the content solely for the purpose of providing our services to you.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Work Product</h3>
                  <p className="leading-relaxed">
                    Ownership of deliverables and work product created as part of our consulting services will be defined in individual service agreements. Unless otherwise specified, you will own the final deliverables upon full payment of all fees.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Confidentiality</h2>
              <p className="text-gray-300 leading-relaxed">
                Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of our business relationship. We will not disclose your confidential business information to third parties without your consent, except as required by law or as necessary to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-cyan-400" />
                Disclaimer of Warranties
              </h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed uppercase font-semibold">
                  Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Merchantability or fitness for a particular purpose</li>
                  <li>Non-infringement of third-party rights</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Accuracy, reliability, or completeness of content</li>
                  <li>Security or freedom from viruses or harmful components</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We do not warrant that our services will meet your requirements or that any results obtained will be accurate or reliable. You use our services at your own risk.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed uppercase font-semibold">
                  To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Loss of data or information</li>
                  <li>Business interruption</li>
                  <li>Loss of goodwill or reputation</li>
                  <li>Cost of substitute services</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Our total liability for any claims arising from or related to our services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim, or $100, whichever is greater.
                </p>
                <p className="leading-relaxed mt-4">
                  Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Indemnification</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Daniel Schley AI Ops Expert and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of our services, your violation of these Terms, or your violation of any rights of another party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Breach of these Terms</li>
                  <li>Non-payment of fees</li>
                  <li>Fraudulent, abusive, or illegal activity</li>
                  <li>Request by law enforcement or government agencies</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Upon termination, your right to use our services will immediately cease. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-cyan-400" />
                Governing Law and Dispute Resolution
              </h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United States and the state in which our business is registered, without regard to its conflict of law provisions.
                </p>
                <p className="leading-relaxed">
                  Any disputes arising from these Terms or our services shall first be resolved through good faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.
                </p>
                <p className="leading-relaxed">
                  You agree to waive any right to a jury trial or to participate in a class action lawsuit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes acceptance of the new Terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Severability</h2>
              <p className="text-gray-300 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Entire Agreement</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms, together with our Privacy Policy and any service-specific agreements, constitute the entire agreement between you and Daniel Schley AI Ops Expert regarding our services and supersede all prior agreements and understandings, whether written or oral.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                Questions or concerns about these Terms may be directed to us through the contact information provided on our website.
              </p>
            </section>

            <section className="bg-slate-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><strong className="text-white">Email:</strong> contact@aiopsexpert.com</p>
                <p><strong className="text-white">Website:</strong> Contact form at <a href="/#contact" className="text-cyan-400 hover:text-cyan-300">aiopsexpert.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SocialFooter />
    </div>
  );
}
