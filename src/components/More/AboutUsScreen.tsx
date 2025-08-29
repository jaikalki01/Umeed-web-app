
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Users, Shield, Star } from 'lucide-react';

interface AboutUsScreenProps {
  onBack: () => void;
}

const AboutUsScreen = ({ onBack }: AboutUsScreenProps) => {
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
          <h1 className="text-xl font-bold">About Umeed</h1>
          <div className="w-12"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600 flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Umeed is dedicated to bringing people together through meaningful connections. 
              We believe that everyone deserves to find love, companionship, and lasting relationships 
              in a safe and respectful environment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Our Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              With thousands of verified members, Umeed has helped countless individuals 
              find their perfect match. Our diverse community spans across different 
              backgrounds, cultures, and preferences, united by the common goal of finding love.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Safety & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Your safety and privacy are our top priorities. We employ advanced verification 
              systems, privacy controls, and moderation to ensure a secure platform where 
              you can connect with confidence.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600 flex items-center">
              <Star className="w-6 h-6 mr-2" />
              Why Choose Umeed?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-gray-700">Advanced matching algorithms based on compatibility</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-gray-700">Verified profiles for authentic connections</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-gray-700">24/7 customer support and moderation</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-gray-700">Privacy-first approach with advanced security</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Join the Umeed Family</h3>
            <p className="text-gray-600">
              Start your journey towards finding meaningful connections today.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUsScreen;
