import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
  onAccept?: () => void; // Optional accept handler
}

const PrivacyPolicy = ({ onBack, onAccept }: PrivacyPolicyProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-4 md:px-8 md:py-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> <span className=" sm:inline">Back</span>
          </Button>
          <h1
            className="
    text-base sm:text-xl md:text-2xl lg:text-3xl
    font-bold text-center flex-1
    px-2 sm:px-4
    leading-snug
  "
          >
            Privacy Policy – Umeed LGBTQ+ Matrimony
          </h1>

          <div className="w-12"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 flex justify-center">
        <Card className="w-full max-w-4xl bg-white shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Last Updated: 30th August 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed max-h-[70vh] overflow-y-auto pr-2 scroll-smooth">
            {/* Intro */}
            <div>
              <p>
                This Privacy Policy (“Policy”) explains how Umeed LGBTQ+ Matrimony Application
                (“Umeed”, “we”, “our”, or “us”) collects, uses, stores, and protects your information.
                By accessing or using our app or website, you consent to the practices described in
                this Policy.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">1. Information We Collect</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Personal Details: Name, email, phone number, gender, sexual orientation, photos.</li>
                <li>Location Data: To show nearby matches and for fraud prevention.</li>
                <li>Account Preferences: Information about the kind of partner you are seeking.</li>
                <li>
                  Payment Details: Processed securely by trusted third-party gateways such as Razorpay and PayPal. We do not
                  store or access your card or banking details directly.
                </li>
                <li>Device &amp; Usage Data: For analytics, security, and service improvement.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">2. How We Use Your Information</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Providing matchmaking and communication features.</li>
                <li>Showing nearby matches using location.</li>
                <li>Fraud detection and prevention.</li>
                <li>Improving and personalizing user experience.</li>
                <li>Marketing, promotions, and analytics to enhance our services.</li>
              </ul>
              <p className="mt-2">We do not sell, rent, or forward your data to any third party.</p>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">3. Data Sharing</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>We do not share your personal data with advertisers, hosting providers, or other third parties.</li>
                <li>
                  Payment details are handled exclusively by Razorpay, PayPal, or other trusted gateways. Umeed never stores or
                  forwards your payment information.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">4. Data Retention</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>If you delete your profile, your data is immediately removed from public access and our servers.</li>
                <li>We do not retain or forward user data once an account is deleted.</li>
                <li>
                  Minimal internal records may be securely retained for legal or fraud-prevention purposes but will never be shared.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">5. User Rights</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>You may access, edit, or delete your data anytime from your profile settings.</li>
                <li>
                  Exceptions: Date of Birth and Sexual Orientation cannot be changed once registered to maintain authenticity.
                </li>
                <li>You may permanently delete your account, after which your data will be removed from our systems.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">6. Security Measures</h3>
              <p>
                We prioritize the security of your data through:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Encryption of sensitive information.</li>
                <li>Secure servers (Hostinger) with restricted access.</li>
                <li>Data access limited only to top-level employees on a need-to-know basis.</li>
              </ul>
              <p className="mt-2">
                Despite our measures, no method of transmission or storage is 100% secure. Users are advised to remain cautious.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">7. Children’s Privacy</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Umeed is strictly for adults aged 18 years and above.</li>
                <li>We do not knowingly collect information from minors.</li>
                <li>If we become aware that data from a minor has been collected, we will delete it immediately.</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">8. Cookies & Tracking</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Our website (umeed.app) uses cookies, tracking pixels, and analytics tools to improve login sessions, measure usage,
                  and deliver targeted advertisements.
                </li>
                <li>
                  By using our website, you consent to our use of cookies. Users may disable cookies in their browser, though this may
                  limit functionality.
                </li>
              </ul>
            </div>

            {/* Section 9 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">9. Changes to this Policy</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>We may update this Privacy Policy from time to time.</li>
                <li>Updates will be notified via in-app notifications and on our website.</li>
                <li>Continued use of Umeed after updates constitutes acceptance of the revised Policy.</li>
              </ul>
            </div>

            {/* Section 10 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">10. Contact Information</h3>
              <p>
                If you have questions, concerns, or complaints regarding your privacy, please contact us:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>📧 Email: <a href="mailto:umeedlgbt@gmail.com" className="text-purple-600 hover:underline">umeedlgbt@gmail.com</a></li>
                <li>📞 Mobile/WhatsApp: +91 87608 87608</li>
              </ul>
              <p className="mt-2">We will respond to all genuine privacy-related concerns within a reasonable time.</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Floating Accept Button */}
      {onAccept && (
        <div className="fixed bottom-4 left-0 w-full flex justify-center px-4 z-50">
          <Button
            onClick={onAccept}
            className="w-full max-w-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:opacity-90"
          >
            Accept & Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
