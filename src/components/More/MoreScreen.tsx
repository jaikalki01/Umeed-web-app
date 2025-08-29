import Header from '../Layout/Header';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  User, Settings, Shield, Heart, Bell, HelpCircle, LogOut,
  Crown, Camera, Edit, MessageCircle, Info, Trash2, Zap,FileCheck,Baby
} from 'lucide-react';
import { BASE_URL1 } from '@/config';
import MembershipPlans from '../Membership/MembershipPlans';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';


interface MoreScreenProps {
  onContactUs: () => void;
  onAboutUs: () => void;
  onFAQ: () => void;
  onPrivacyPolicy: () => void;
  onTermsAndConditions: () => void;
  onChildPolicy: () => void;
  onDeleteAccount: () => void;
  onEditProfile: () => void;
  onLogout?: () => void;
  onViewBlockedProfiles: () => void;
  onViewSavedProfiles: () => void;
  onViewMemberPlan: () => void;
}

const MoreScreen = ({
  onContactUs, onAboutUs, onFAQ, onPrivacyPolicy, onTermsAndConditions, onChildPolicy,
  onDeleteAccount, onEditProfile, onLogout, onViewBlockedProfiles, onViewSavedProfiles, onViewMemberPlan
}: MoreScreenProps) => {
  const [showMembershipPlans, setShowMembershipPlans] = useState(false);
  const { user: currentUser } = useAuth();

  const getProfileCompletionPercentage = () => {
    const fields = [
      currentUser.name, currentUser.email, currentUser.photo1, currentUser.bio,
      currentUser.occupation, currentUser.education, currentUser.city_name, currentUser.partnerExpectations
    ];
    const completed = fields.filter(f => f && f.trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  const handleSelectPlan = (planId: string, amount: number, title: string) => {
    alert(`Payment gateway integration for ${title} - ₹${amount} would be implemented here`);
  };

  if (showMembershipPlans) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header activeTab="more" />
        <div className="flex-1 pb-20">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <Button variant="ghost" onClick={() => setShowMembershipPlans(false)} className="mr-2">
                ← Back
              </Button>
              <h1 className="text-xl font-bold">Membership Plans</h1>
            </div>
            <MembershipPlans onSelectPlan={handleSelectPlan} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header activeTab="more" /> */}
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">

          {/* User Profile Card */}
          <Card className="overflow-hidden w-full mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">

                {/* Profile Picture + Camera */}
                <div className="relative">
                  <img
                    src={`${BASE_URL1}/${currentUser.photo1}`}
                    alt={currentUser.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0"
                  >
                    <Camera className="w-3 h-3" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-start gap-1 md:gap-2 mb-2">

                    {/* Name */}
                    <h2 className="text-lg md:text-xl font-bold">{currentUser.name}</h2>

                    {/* Verified + Status badges */}
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                      {currentUser.verify_status && (
                        <Badge className="bg-blue-500 text-white text-xs">✓ Verified</Badge>
                      )}
                      <Badge
                        className={`text-xs text-white ${currentUser.status === 'paid'
                          ? 'bg-yellow-500'
                          : currentUser.status === 'exclusive'
                            ? 'bg-purple-800'
                            : 'bg-green-500'
                          }`}
                      >
                        {currentUser.status === 'paid' && '💎'}
                        {currentUser.status === 'exclusive' && '👑'}
                        {currentUser.status === 'active' && '✨'}
                        {currentUser.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm opacity-90">
                    {currentUser.age} years •<br/> {currentUser.city_name}
                  </p>
                  <p className="text-xs opacity-75">{currentUser.occupation}</p><br/>
                </div>

                {/* Edit Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 mt-2 md:mt-0"
                  onClick={onEditProfile}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Profile Completion Section */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm text-purple-600 font-semibold">{getProfileCompletionPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProfileCompletionPercentage()}%` }}
                />
              </div>
              {getProfileCompletionPercentage() < 100 && (
                <p className="text-xs text-gray-600 mt-2 text-center md:text-left">
                  Complete your profile to get better matches
                </p>
              )}
            </CardContent>
          </Card>

          {/* Membership Upgrade Card */}
          <Card className="border-2 border-gradient-to-r from-purple-400 to-pink-500 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-purple-600" />
                    Upgrade Your Experience
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Unlock unlimited chats, video calls, and premium features
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Unlimited Chats
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <Zap className="w-3 h-3 mr-1" />
                      Video Calls
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <Crown className="w-3 h-3 mr-1" />
                      Pride Badge
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={onViewMemberPlan}
              >
                <Crown className="w-4 h-4 mr-2" />
                View Membership Plans
              </Button>
            </CardContent>
          </Card>

          {/* Settings Sections */}
          {/* Account */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold">
                <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start" onClick={onEditProfile}>
                <Edit className="w-4 h-4 mr-3" /> Edit Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Camera className="w-4 h-4 mr-3" /> Manage Photos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="w-4 h-4 mr-3" /> Partner Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>


            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>Privacy</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Hide Phone Number</p>
                <Switch checked={currentUser.phonehide} />
              </div>
              <div className="flex items-center justify-between">
                <p>Photo Protection</p>
                <Switch checked={currentUser.photoProtect} />
              </div>
              <div className="flex items-center justify-between">
                <p>Hide Profile</p>
                <Switch checked={currentUser.photohide} />
              </div>
            </CardContent>
          </Card>

          {/* App Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold">
                <Settings className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>App Settings</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Button variant="ghost" className="w-full justify-start" onClick={() => alert('Notifications settings coming soon!')}>
                <Bell className="w-4 h-4 mr-3" /> Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={onViewBlockedProfiles}>
                <Shield className="w-4 h-4 mr-3" /> Blocked Profiles
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={onViewSavedProfiles}>
                <Shield className="w-4 h-4 mr-3" /> Saved Profiles
              </Button>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg font-semibold">
                <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>Support</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Button variant="ghost" className="w-full justify-start" onClick={onContactUs}>
                <MessageCircle className="w-4 h-4 mr-3" /> Contact Us
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={onAboutUs}>
                <Info className="w-4 h-4 mr-3" /> About Us
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={onFAQ}>
                <HelpCircle className="w-4 h-4 mr-3" /> FAQ
              </Button>
              {/* Privacy Policy */}
              <Button
                variant="ghost" className="w-full justify-start"
                onClick={onPrivacyPolicy}
              >
                <Shield className="w-4 h-4 mr-3" /> Privacy Policy
              </Button>
              <Button
                variant="ghost" className="w-full justify-start"
                onClick={onTermsAndConditions}
              >
               <FileCheck className="w-4 h-4 mr-3" /> Terms & Conditions
              </Button>
              <Button
                variant="ghost" className="w-full justify-start"
                onClick={onChildPolicy}
              >
               <Baby className="w-4 h-4 mr-3" /> Child Policy
              </Button>

            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-3" /> Logout
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={onDeleteAccount}>
                <Trash2 className="w-4 h-4 mr-3" /> Delete Account
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default MoreScreen;
