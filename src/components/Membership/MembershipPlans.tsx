
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  MessageCircle, 
  Video, 
  Users, 
  Star,
  Check,
  Zap,
  ArrowLeft
} from 'lucide-react';

interface MembershipPlansProps {
  onSelectPlan: (planId: string, amount: number, title: string) => void;
  compact?: boolean;
  onBack?: () => void;
}

const MembershipPlans = ({ onSelectPlan, compact = false, onBack }: MembershipPlansProps) => {
  const plans = [
    {
      id: 'free',
      title: 'Free Membership',
      price: 0,
      duration: 'Forever',
      features: [
        'View All Profiles',
        'Send Unlimited Connection Requests',
        'Chat with up to 5 Members per Day',
        'Auto "Hi" or "Hello" Message After Daily Limit',
        'No Video Chat Access'
      ],
      color: 'gray',
      popular: false,
      current: true
    },
    {
      id: 'basic',
      title: 'Basic Chat Pack',
      price: 49,
      duration: 'per day',
      gst: '+18% GST',
      features: [
        'Chat with 5 additional members',
        'Unlimited custom messages with these 5',
        'No video call',
        'Pride badge shown'
      ],
      color: 'blue',
      popular: false
    },
    {
      id: 'standard',
      title: 'Standard Pack',
      price: 100,
      duration: 'per day',
      gst: '+18% GST',
      features: [
        'Chat with 20 members per day',
        'Unlimited messaging',
        '10 minutes of video chat/day',
        'Pride badge shown'
      ],
      color: 'green',
      popular: true
    },
    {
      id: 'weekly',
      title: 'Weekly Pack',
      price: 250,
      duration: '7 days',
      gst: '+18% GST',
      features: [
        'Unlimited chats',
        '30 minutes total video calls/week',
        'Pride badge shown'
      ],
      color: 'purple',
      popular: false
    },
    {
      id: '12day',
      title: '12-Day Pack',
      price: 500,
      duration: '12 days',
      gst: '+18% GST',
      features: [
        'Unlimited chats',
        '2 hours total video calls',
        'Pride badge shown'
      ],
      color: 'orange',
      popular: false
    },
    {
      id: 'monthly',
      title: 'Monthly Pack',
      price: 1000,
      duration: '30 days',
      gst: '+18% GST',
      features: [
        'Unlimited chats',
        '5 hours total video calls',
        'Pride badge shown'
      ],
      color: 'pink',
      popular: false
    },
    {
      id: 'exclusive',
      title: 'Exclusive Member',
      price: 50,
      duration: 'per day',
      gst: '+18% GST',
      altPrice: '₹500/month',
      features: [
        'Shown in "Exclusive Members" section',
        '5 custom chats per day',
        'Auto "Hi"/"Hello" messages after limit',
        'No video chat (unless combined)',
        'Can be combined with Pride memberships'
      ],
      color: 'yellow',
      popular: false,
      exclusive: true
    }
  ];

  const getColorClasses = (color: string, popular: boolean, current: boolean) => {
    if (current) return 'border-gray-300 bg-gray-50';
    if (popular) return 'border-purple-500 bg-purple-50 ring-2 ring-purple-500';
    
    const colorMap = {
      blue: 'border-blue-300 hover:border-blue-500',
      green: 'border-green-300 hover:border-green-500',
      purple: 'border-purple-300 hover:border-purple-500',
      orange: 'border-orange-300 hover:border-orange-500',
      pink: 'border-pink-300 hover:border-pink-500',
      yellow: 'border-yellow-300 hover:border-yellow-500',
      gray: 'border-gray-300'
    };
    
    return colorMap[color as keyof typeof colorMap] || 'border-gray-300';
  };

  const getButtonColor = (color: string, current: boolean) => {
    if (current) return 'bg-gray-400 text-white cursor-not-allowed';
    
    const colorMap = {
      blue: 'bg-blue-600 hover:bg-blue-700 text-white',
      green: 'bg-green-600 hover:bg-green-700 text-white',
      purple: 'bg-purple-600 hover:bg-purple-700 text-white',
      orange: 'bg-orange-600 hover:bg-orange-700 text-white',
      pink: 'bg-pink-600 hover:bg-pink-700 text-white',
      yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    };
    
    return colorMap[color as keyof typeof colorMap] || 'bg-umeed-gradient hover:opacity-90 text-white';
  };

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Upgrade Your Experience</h2>
          <p className="text-gray-600">Unlock premium features with our membership plans</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.slice(1, 4).map((plan) => (
            <Card key={plan.id} className={`relative ${getColorClasses(plan.color, plan.popular, false)} transition-all duration-200`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{plan.title}</span>
                  {plan.exclusive && <Crown className="w-5 h-5 text-yellow-500" />}
                </CardTitle>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold">₹{plan.price}</span>
                  <span className="text-sm text-gray-600">/{plan.duration}</span>
                  {plan.gst && <span className="text-xs text-gray-500">{plan.gst}</span>}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${getButtonColor(plan.color, false)}`}
                  onClick={() => onSelectPlan(plan.id, plan.price, plan.title)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    
    <div className="space-y-6">
        <div
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg z-10"
        style={{ position: 'sticky', top: 0 }}
      >
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Membership Plan</h1>
            
          </div>
        </div>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Umeed Membership Plans</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Whether you're exploring connections or seeking something serious, Umeed offers flexible membership
          options to match your pace. Here's a complete breakdown of all membership tiers:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${getColorClasses(plan.color, plan.popular, plan.current)} transition-all duration-200`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            {plan.current && (
              <div className="absolute -top-3 right-3">
                <Badge className="bg-gray-600 text-white px-3 py-1">
                  Current Plan
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                <span>{plan.title}</span>
                {plan.exclusive && <Crown className="w-6 h-6 text-yellow-500" />}
              </CardTitle>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-bold">
                  {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <>
                    <span className="text-sm text-gray-600">/{plan.duration}</span>
                    {plan.gst && <span className="text-xs text-gray-500">{plan.gst}</span>}
                  </>
                )}
              </div>
              {plan.altPrice && (
                <p className="text-sm text-gray-600">or {plan.altPrice}</p>
              )}
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${getButtonColor(plan.color, plan.current)}`}
                disabled={plan.current}
                onClick={() => onSelectPlan(plan.id, plan.price, plan.title)}
              >
                {plan.current ? (
                  'Current Plan'
                ) : plan.price === 0 ? (
                  'Free Forever'
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Pride Member Category</h3>
        <p className="text-sm text-gray-600 mb-3">
          You automatically become a Pride Member if you purchase any paid package.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Displayed in Pride Members section</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4 text-purple-600" />
            <span>Full chat and video features</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-purple-600" />
            <span>Enhanced profile visibility</span>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>All package prices are exclusive of 18% GST. GST will be added during checkout.</p>
      </div>
    </div>
  );
};

export default MembershipPlans;
