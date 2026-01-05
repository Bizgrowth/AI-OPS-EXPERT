import { useEffect } from 'react';
import Header from '../components/Header';
import SocialFooter from '../components/SocialFooter';
import { Shield, Lock, Eye, Users, Database, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last Updated: January 5, 2026</p>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-cyan-400" />
                Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Daniel Schley AI Ops Expert ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Database className="w-6 h-6 mr-2 text-cyan-400" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <p className="leading-relaxed mb-2">We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Company name and business information</li>
                    <li>Account credentials for the client portal</li>
                    <li>Payment and billing information</li>
                    <li>Communication preferences</li>
                    <li>Messages and inquiries sent through our contact forms or chatbot</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Business Assessment Data</h3>
                  <p className="leading-relaxed">
                    When you complete our AI readiness assessment or consultation forms, we collect information about your business operations, technical infrastructure, and AI implementation goals.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                  <p className="leading-relaxed mb-2">When you access our website, we automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website addresses</li>
                    <li>Usage patterns and preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-cyan-400" />
                How We Use Your Information
              </h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our AI consulting services</li>
                  <li>Process your requests, bookings, and transactions</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about services, promotions, and news</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and security threats</li>
                  <li>Personalize and improve your experience on our website</li>
                  <li>Process payments and maintain billing records</li>
                  <li>Fulfill contractual obligations and provide client portal access</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-cyan-400" />
                Information Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">We may share your information in the following circumstances:</p>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Service Providers</h3>
                  <p className="leading-relaxed">
                    We share information with third-party service providers who perform services on our behalf, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Supabase (database and authentication services)</li>
                    <li>Stripe (payment processing)</li>
                    <li>Resend (email communications)</li>
                    <li>Netlify (website hosting and deployment)</li>
                  </ul>
                  <p className="leading-relaxed mt-2">
                    These service providers are contractually obligated to use your information only for the purposes of providing services to us and are required to maintain the confidentiality and security of your information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Legal Requirements</h3>
                  <p className="leading-relaxed">
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order or subpoena).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Business Transfers</h3>
                  <p className="leading-relaxed">
                    If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will provide notice before your information becomes subject to a different privacy policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">With Your Consent</h3>
                  <p className="leading-relaxed">
                    We may share your information for any other purpose with your explicit consent.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-cyan-400" />
                Security Practices
              </h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Data encryption in transit using SSL/TLS protocols</li>
                  <li>Data encryption at rest for sensitive information</li>
                  <li>Secure authentication mechanisms including password hashing</li>
                  <li>Row-level security policies in our database</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication requirements for client portals</li>
                  <li>Secure payment processing through PCI-compliant providers</li>
                  <li>Regular backups and disaster recovery procedures</li>
                  <li>Employee training on data protection and privacy practices</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your information using industry-standard practices.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights and Choices</h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong className="text-white">Portability:</strong> Request a copy of your information in a structured format</li>
                  <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong className="text-white">Object:</strong> Object to certain processing of your information</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  To exercise any of these rights, please contact us using the information provided at the end of this policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Links</h2>
              <p className="text-gray-300 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We take steps to ensure that your information receives an adequate level of protection in the jurisdictions in which we process it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="bg-slate-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><strong className="text-white">Email:</strong> privacy@aiopsexpert.com</p>
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
