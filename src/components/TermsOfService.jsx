import React from 'react';
import SEO from './SEO';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import { FileText, Scale, AlertTriangle, CheckCircle, Mail, Shield } from 'lucide-react';

const TermsOfService = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <SEO
        title="Terms of Service | Conxiea - Service Terms & Conditions"
        description="Conxiea Terms of Service - Read our terms and conditions for using our services. Legal terms for AI network automation, website design, and digital solutions."
        url="/terms-of-service"
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
                <Scale className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Terms of Service
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
                  1. Agreement to Terms
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  By accessing or using the services provided by Conxiea ("we", "our", or "us"), including but not limited to our AI network automation platform (InfraAIOps), website design services, AI chatbots, missed call text-back services, and related services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms").
                </p>
                <p className="text-slate-300 leading-relaxed">
                  If you do not agree to these Terms, you must not use our Services. These Terms apply to all users, including clients, visitors, and others who access or use our Services.
                </p>
              </section>

              {/* Description of Services */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Conxiea provides the following services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li><strong>AI Network Automation:</strong> Automated network infrastructure management and monitoring solutions</li>
                  <li><strong>Website Design Services:</strong> Professional website development and design packages</li>
                  <li><strong>AI Chatbots:</strong> Intelligent chatbot solutions for customer engagement</li>
                  <li><strong>Missed Call Text-Back:</strong> Automated text messaging services for missed calls</li>
                  <li><strong>Network Solutions:</strong> Network migrations, troubleshooting, and infrastructure design</li>
                  <li><strong>IT Support:</strong> Technical support and consultation services</li>
                </ul>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorised use of your account</li>
                  <li>Ensuring that your account information is kept up to date</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or illegal activity.
                </p>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>4.1 Pricing:</strong> All prices are quoted in British Pounds (GBP) unless otherwise stated. Prices are subject to change with notice.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>4.2 Payment:</strong> Payment is due as specified in your service agreement. For recurring services, payment will be charged automatically on the agreed billing cycle.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>4.3 Refunds:</strong> Refund policies vary by service. Website design services are typically non-refundable once work has commenced. Subscription services may be cancelled in accordance with the cancellation policy outlined in your service agreement.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong>4.4 Late Payment:</strong> Late payments may result in service suspension or termination. We reserve the right to charge interest on overdue amounts at a rate of 8% per annum above the Bank of England base rate.
                </p>
              </section>

              {/* Acceptable Use */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-400" />
                  5. Acceptable Use Policy
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  You agree not to use our Services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To interfere with or disrupt the Services or servers connected to the Services</li>
                  <li>To attempt to gain unauthorised access to any portion of the Services</li>
                  <li>To use automated systems (bots, scrapers) to access the Services without permission</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property Rights</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>6.1 Our Rights:</strong> All content, features, and functionality of the Services, including but not limited to text, graphics, logos, software, and source code, are owned by Conxiea or its licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>6.2 Your Content:</strong> You retain ownership of any content you submit to us. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content for the purpose of providing and improving our Services.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong>6.3 Website Design:</strong> Upon full payment, you will receive ownership of the final website design files. We retain the right to use the work in our portfolio unless otherwise agreed.
                </p>
              </section>

              {/* Service Availability */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability and Modifications</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We strive to maintain high availability of our Services but do not guarantee uninterrupted access. We reserve the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>Modify, suspend, or discontinue any aspect of the Services at any time</li>
                  <li>Perform scheduled maintenance that may temporarily interrupt service</li>
                  <li>Update or change features and functionality</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  We will provide reasonable notice of significant changes or service interruptions when possible.
                </p>
              </section>

              {/* Warranties and Disclaimers */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  8. Warranties and Disclaimers
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>8.1 Service "As Is":</strong> The Services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>8.2 No Guarantees:</strong> While we strive to provide reliable services, we do not guarantee that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>The Services will be uninterrupted, secure, or error-free</li>
                  <li>Defects will be corrected</li>
                  <li>The Services are free of viruses or other harmful components</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  <strong>8.3 Network Services:</strong> For network automation and infrastructure services, we provide best-effort support but cannot guarantee 100% uptime or prevent all potential issues.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  To the maximum extent permitted by law, Conxiea shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>Loss of profits, revenue, data, or business opportunities</li>
                  <li>Business interruption or loss of goodwill</li>
                  <li>Costs of substitute services</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  Our total liability for any claims arising from or related to the Services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
                </p>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
                <p className="text-slate-300 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Conxiea, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your use of the Services, violation of these Terms, or infringement of any rights of another.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We may terminate or suspend your access to the Services immediately, without prior notice, for any reason, including if you breach these Terms. Upon termination:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mb-4">
                  <li>Your right to use the Services will immediately cease</li>
                  <li>We may delete your account and data, subject to our data retention policies</li>
                  <li>All provisions of these Terms that by their nature should survive termination shall survive</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  You may terminate your account at any time by contacting us or using the account deletion features in your account settings.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law and Jurisdiction</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Services shall be subject to the exclusive jurisdiction of the courts of England and Wales. For more information about UK consumer rights, visit <a href="https://www.gov.uk/consumer-protection-rights" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">GOV.UK Consumer Protection</a>.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Learn more about our services: <a href="/services" className="text-blue-400 hover:text-blue-300 underline">Network Solutions</a>, <a href="/websites" className="text-blue-400 hover:text-blue-300 underline">Website Design</a>, and <a href="/missedcalltextback" className="text-blue-400 hover:text-blue-300 underline">AI Text-Back Services</a>.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
                <p className="text-slate-300 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Services after such changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              {/* Severability */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Severability</h2>
                <p className="text-slate-300 leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              {/* Contact Information */}
              <section className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-400" />
                  15. Contact Information
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
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
                    For questions about our services, visit our <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">Contact</a> page or review our <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</a>. For business advice, see <a href="https://www.gov.uk/business" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">GOV.UK Business Support</a>.
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

export default TermsOfService;

