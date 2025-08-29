import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ChildPolicyScreenProps {
  onBack: () => void;
}

const ChildPolicyScreen = ({ onBack }: ChildPolicyScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-4 md:px-8 md:py-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
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
            Child Policy – Umeed LGBTQ+ Matrimony
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 flex justify-center">
        <Card className="w-full max-w-4xl bg-white shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Last Updated: August 30th, 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
            
            {/* Intro */}
            <div>
              <p>
                At Umeed, we are committed to protecting the safety and privacy of minors. Our platform
                is designed exclusively for adults aged 18 years and above.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">1. Age Restriction</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Umeed is strictly for users 18 years of age or older.</li>
                <li>Minors (under 18 years) are not permitted to register, access, or use the Umeed application or website.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">2. Data Collection for Minors</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>We do not knowingly collect any personal information from children under 18.</li>
                <li>If we become aware that a minor has registered or provided information, we will:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Immediately suspend the account.</li>
                    <li>Permanently delete any personal data collected.</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">3. Parental Responsibility</h3>
              <p>
                Parents or guardians who believe their child has used Umeed should contact us immediately at 
                <span className='font-semibold'> umeedlgbt@gmail.com</span> or <span className='font-semibold'>+91 87608 87608</span> so we can take corrective action.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">4. Compliance with Laws</h3>
              <p>This policy is aligned with international child protection laws, including:</p>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>COPPA (Children’s Online Privacy Protection Act, USA).</li>
                <li>India’s IT Act & Data Protection laws.</li>
              </ul>
              <p className="mt-2">
                Umeed is a matrimonial service and does not provide any content or features targeted at children.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">5. Safety Assurance</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>We actively monitor profiles and verify data to ensure only adult users (18+) are allowed on the platform.</li>
                <li>Any attempt to create fake profiles by minors will lead to immediate termination.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ChildPolicyScreen;
