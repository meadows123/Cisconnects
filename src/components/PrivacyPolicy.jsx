import React from 'react';
import SEO from './SEO';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <SEO
        title="Privacy Policy | Conxiea - Data Protection & Privacy"
        description="Conxiea Privacy Policy - Learn how we collect, use, and protect your personal information. GDPR compliant privacy practices for AI network automation and digital services."
        url="/privacy-policy"
      />
      <div className="min-h-screen bg-[#0f0f3d]">
        <Navigation />
        
        <div className="pt-40 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Privacy Policy
              </h1>
              <p className="text-slate-400 text-lg">
                Last Updated: {currentDate}
              </p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 space-y-8"
            >
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-400" />
                  1. Introduction
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Conxiea ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  By using our services, including our AI network automation platform (InfraAIOps), website design services, AI chatbots, and missed call text-back services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-400" />
                  2. Information We Collect
                </h2>
                
                <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.1 Personal Information</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We may collect the following types of personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>Name, email address, phone number, and postal address</li>
                  <li>Company name and job title</li>
                  <li>Payment and billing information</li>
                  <li>Network infrastructure details and configuration data</li>
                  <li>Communication preferences and correspondence</li>
                  <li>Account credentials and authentication information</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.2 Technical Information</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  When you use our services, we automatically collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Operating system details</li>
                  <li>Usage data, including pages visited and time spent</li>
                  <li>Network performance metrics and telemetry data</li>
                  <li>Error logs and diagnostic information</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.3 Cookies and Tracking Technologies</h3>
                <p className="text-slate-300 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-blue-400" />
                  3. How We Use Your Information
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process transactions and manage your account</li>
                  <li>To send you technical updates, security alerts, and support messages</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To monitor and analyze usage patterns and trends</li>
                  <li>To detect, prevent, and address technical issues and security threats</li>
                  <li>To comply with legal obligations and enforce our terms</li>
                  <li>To send marketing communications (with your consent)</li>
                </ul>
              </section>

              {/* Data Sharing and Disclosure */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our services (e.g., cloud hosting, payment processing, email services)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you have given explicit permission</li>
                  <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure network infrastructure and monitoring</li>
                  <li>Regular backups and disaster recovery procedures</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights (GDPR)</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you are located in the European Economic Area (EEA) or United Kingdom, you have certain data protection rights under the <a href="https://gdpr.eu/what-is-gdpr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">General Data Protection Regulation (GDPR)</a> and <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">UK GDPR</a>:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data under certain circumstances</li>
                  <li><strong>Right to Restrict Processing:</strong> Request restriction of processing your personal data</li>
                  <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where we rely on consent</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
                <p className="text-slate-300 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymise it.
                </p>
              </section>

              {/* International Data Transfers */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable data protection laws, including <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">GDPR requirements</a>.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  For more information about our services, please visit our <a href="/services" className="text-blue-400 hover:text-blue-300 underline">Services</a> page or learn more about our <a href="/infraaiops" className="text-blue-400 hover:text-blue-300 underline">AI network automation solutions</a>.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                <p className="text-slate-300 leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              {/* Changes to This Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-slate-300 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Us */}
              <section className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-400" />
                  11. Contact Us
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="space-y-2 text-slate-300">
                  <p><strong className="text-white">Conxiea</strong></p>
                  <p>25 Lyndey Road</p>
                  <p>Bristol, BS16 9HG</p>
                  <p>United Kingdom</p>
                  <p className="mt-4">
                    <strong className="text-white">Email:</strong>{' '}
                    <a href="mailto:admin@conxiea.com" className="text-blue-400 hover:text-blue-300">
                      admin@conxiea.com
                    </a>
                  </p>
                  <p>
                    <strong className="text-white">Phone:</strong>{' '}
                    <a href="tel:+447708227512" className="text-blue-400 hover:text-blue-300">
                      +44 7708 227512
                    </a>
                  </p>
                  <p className="mt-4 text-sm">
                    For questions about our services, visit our <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">Contact</a> page or review our <a href="/terms-of-service" className="text-blue-400 hover:text-blue-300 underline">Terms of Service</a>. Learn more about <a href="https://www.ico.org.uk/for-the-public/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">your data protection rights</a> from the UK Information Commissioner's Office.
                  </p>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;

