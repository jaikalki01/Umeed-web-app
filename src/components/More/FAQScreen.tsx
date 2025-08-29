
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, HelpCircle } from 'lucide-react';

interface FAQScreenProps {
  onBack: () => void;
}

const FAQScreen = ({ onBack }: FAQScreenProps) => {
  const faqs = [
    {
      question: "How do I create a profile on Umeed?",
      answer: "Creating a profile is simple! Sign up with your email, verify your account, and complete your profile with photos and personal information. Make sure to be authentic and honest to attract the right matches."
    },
    {
      question: "Is Umeed free to use?",
      answer: "Umeed offers both free and premium memberships. Free users can create profiles, browse matches, and send limited messages. Premium members get unlimited messaging, advanced filters, and priority support."
    },
    {
      question: "How does the matching system work?",
      answer: "Our advanced algorithm considers your preferences, interests, location, age, and other compatibility factors to suggest the best matches. The more complete your profile, the better your matches will be."
    },
    {
      question: "How can I verify my profile?",
      answer: "Profile verification helps build trust in our community. You can verify your profile by uploading a clear photo of yourself holding a piece of paper with your username. Our team will review and verify within 24 hours."
    },
    {
      question: "What should I do if someone is bothering me?",
      answer: "Your safety is our priority. You can block any user, report inappropriate behavior, or hide your profile temporarily. Our moderation team reviews all reports and takes appropriate action."
    },
    {
      question: "Can I change my location?",
      answer: "Yes, you can update your location in your profile settings. This will affect the matches you see, as we prioritize showing you people in your area first."
    },
    {
      question: "How do I delete my account?",
      answer: "You can delete your account from the Settings menu. Please note that this action is permanent and cannot be undone. All your data will be permanently removed from our servers."
    },
    {
      question: "What information is visible to other users?",
      answer: "Other users can see your profile photos, basic information (age, location, occupation), bio, and any information you choose to share. You can control privacy settings to hide your phone number or make your profile private."
    },
    {
      question: "How do I report a fake profile?",
      answer: "If you encounter a fake or suspicious profile, please report it immediately. Click on the profile, select 'Report User', and provide details. Our team will investigate and take appropriate action."
    },
    {
      question: "Can I pause my profile temporarily?",
      answer: "Yes, you can hide your profile from the privacy settings. This will make you invisible to other users while keeping your account active. You can unhide it anytime."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4"
      style={{ position: 'sticky', top: 0 }}>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold">FAQ</h1>
          <div className="w-12"></div>
        </div>
      </div>

      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2" />
              Frequently Asked Questions
            </CardTitle>
            <p className="text-gray-600">Find answers to common questions about Umeed</p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQScreen;
