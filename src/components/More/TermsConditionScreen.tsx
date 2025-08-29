import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface TermsAndConditionsScreenProps {
  onBack: () => void;
  onAccept?: () => void; // Optional accept handler
}

const TermsAndConditionsScreen = ({ onBack, onAccept }: TermsAndConditionsScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-4 md:px-8 md:py-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-evenly max-w-5xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> <span className="sm:inline">Back</span>
          </Button>
          <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl
    font-bold text-center flex-1
    px-2 sm:px-4
    leading-snug">
            Terms & Conditions of Use
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 flex justify-center">
        <Card className="w-full max-w-4xl bg-white shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Last Updated: 30 th August 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed max-h-[70vh] overflow-y-auto pr-2 scroll-smooth">
            {/* Intro */}
            <div>
              <p>
                These Terms and Conditions (“Terms”) govern your access to and use of the Umeed LGBTQ+
                Matrimony Application (“Umeed”, “we”, “our”, or “us”). By downloading, registering, or
                using Umeed, you agree to be bound by these Terms. If you do not agree, please
                discontinue use of the Service immediately.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">1. About Umeed</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Umeed is the first full-fledged LGBTQ+ matrimony mobile application, proudly built to
                  provide a safe platform for the LGBTQ+ community worldwide to find meaningful and
                  lasting relationships.
                </li>
                <li>
                  Umeed provides matchmaking services only and does not guarantee marriage,
                  compatibility, or success of matches.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">2. Eligibility</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>You must be at least 18 years old to register and use Umeed.</li>
                <li>
                  Umeed is open to all LGBTQ+ individuals globally, except where prohibited by law.
                </li>
                <li>
                  By registering, you represent and warrant that:
                  <ul className="list-disc ml-6">
                    <li>You are legally competent to enter into this agreement.</li>
                    <li>
                      Your use of Umeed is not prohibited under any applicable laws of your country or
                      region.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Section 3 - Account Registration */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                3. Account Registration
              </h3>
              <p className="mb-2 font-medium">To access our services, you must create an account by providing the following:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Mobile Number</li>
                <li>Gender and Orientation</li>
                <li>Information about the type of partner you are seeking</li>
              </ul>
              <p className="mt-2 font-medium">You agree to:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Provide accurate, truthful, and up-to-date information.</li>
                <li>Maintain confidentiality of your login credentials.</li>
                <li>Be solely responsible for all activity under your account.</li>
              </ul>
            </div>

            {/* Section 4 - Membership Plans */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                4. Membership Plans
              </h3>
              <p className="mb-1 font-semibold">Free Membership:</p>
              <ul className="list-disc ml-5 space-y-1 mb-3">
                <li>Limited ability to contact members.</li>
                <li>Cannot use audio or video call features.</li>
              </ul>
              <p className="mb-1 font-semibold">Paid Membership:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Profile is given priority in search results and visibility.</li>
                <li>Unlimited communication with other members.</li>
                <li>Access to audio and video call features as per the purchased package.</li>
              </ul>
            </div>

            {/* Section 5 - Payments & Refunds */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                5. Payments & Refunds
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Payments are processed securely via third-party gateways (e.g., Razorpay, PayPal).</li>
                <li>Once a premium membership is activated, no refunds will be provided under any circumstances.</li>
                <li>If a duplicate payment is received, Umeed will immediately initiate a refund to the original payment method.</li>
                <li>Umeed does not offer refunds for dissatisfaction with services, unsuccessful matches, or unused subscription periods.</li>
              </ul>
            </div>

            {/* Section 6 - User Obligations & Prohibited Conduct */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                6. User Obligations & Prohibited Conduct
              </h3>
              <p className="mb-2">By using Umeed, you agree to use the platform responsibly. Prohibited conduct includes, but is not limited to:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Creating or using fake profiles or impersonating others.</li>
                <li>Harassing, threatening, or engaging in hate speech.</li>
                <li>Sharing sexually explicit, obscene, or offensive content.</li>
                <li>Using inappropriate or misleading profile images.</li>
                <li>Spamming or promoting external services.</li>
                <li>Attempting to extort money, financial fraud, or scams against other users.</li>
              </ul>
              <p className="mt-2">Violation of these rules will result in immediate suspension or permanent termination of your account without refund.</p>
            </div>

            {/* Section 7 - Disclaimer of Warranties */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                7. Disclaimer of Warranties
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Umeed provides the Service on an “AS IS” and “AS AVAILABLE” basis.</li>
                <li>We make no guarantees regarding:
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>Accuracy or authenticity of user profiles.</li>
                    <li>The outcome of matches, communications, or marriages.</li>
                    <li>Availability or uninterrupted access to the Service.</li>
                  </ul>
                </li>
                <li>You understand and acknowledge that any decision to interact, meet, or build a relationship with other users is at your own risk.</li>
                <li>Users are strongly advised to:
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>Verify member information independently (via social media, phone verification, etc.).</li>
                    <li>Meet only in safe, public locations.</li>
                    <li>Avoid sharing financial or sensitive personal information.</li>
                    <li>Remain cautious of emotional or financial manipulation.</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Section 8 - Limitation of Liability */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                8. Limitation of Liability
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>To the fullest extent permitted by law, Umeed and its affiliates shall not be liable for:
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>Any damages, losses, or claims arising out of user interactions.</li>
                    <li>Fraudulent activities by members.</li>
                    <li>Emotional, financial, or reputational harm caused by use of the Service.</li>
                  </ul>
                </li>
                <li>Umeed’s role is limited to providing a matchmaking platform.</li>
              </ul>
            </div>

            {/* Section 9 - Termination of Services */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                9. Termination of Services
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Users may delete their account at any time through the application.</li>
                <li>Umeed reserves the right to suspend or permanently terminate accounts if:
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>The Terms are violated.</li>
                    <li>Fraudulent or harmful behavior is detected.</li>
                  </ul>
                </li>
                <li>No refunds will be given in cases of termination due to violations.</li>
              </ul>
            </div>

            {/* Section 10 - Governing Law & Jurisdiction */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                10. Governing Law & Jurisdiction
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>These Terms shall be governed by the laws of India.</li>
                <li>Any disputes shall be subject exclusively to the jurisdiction of the courts at Thane, Mumbai, India.</li>
              </ul>
            </div>

            {/* Section 11 - Modifications to Terms */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                11. Modifications to Terms
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Umeed reserves the right to amend these Terms at any time.</li>
                <li>Users will be notified via in-app notifications, email, or updates to this page.</li>
                <li>Continued use of the Service after changes constitutes acceptance of the revised Terms.</li>
              </ul>
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

export default TermsAndConditionsScreen;
