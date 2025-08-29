import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { GENDER_OPTIONS } from '../../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BASE_URL } from '@/config';
interface RegistrationData {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  mobile: string;
  mobilecode: string;
  gender: string;
  dob: string;
  maritalStatus: string;
  education: string;
  occupation: string;
  language: string;
  height: string;
  diet: string;
  smoke: string;
  drink: string;
  city_name: string;
  postal: string;
  state: string;
  country: string;
  partnerExpectations: string;
  bio: string;
  photo1: File | null;
  photo2: File | null;
}

interface RegistrationScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

import background from "/public/img/umeed-banner.jpg";

const RegistrationScreen = ({ onComplete, onBack }: RegistrationScreenProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    password: '',
    confirm_password: '',
    name: '',
    mobile: '',
    mobilecode: '+1',
    gender: '',
    dob: '',
    maritalStatus: '',
    education: '',
    occupation: '',
    language: '',
    height: '',
    diet: '',
    smoke: '',
    drink: '',
    city_name: '',
    postal: '',
    state: '',
    country: '',
    partnerExpectations: '',
    bio: '',
    photo1: null,
    photo2: null
  });

  const updateFormData = (field: keyof RegistrationData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = async () => {
    if (currentStep === 5) {
      await submitForm();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const submitForm = async () => {
    setError(null);
    setLoading(true);
    
    // Password validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else if (value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      onComplete();
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / 5) * 100;

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-white">Email*</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-white">Password*</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData('password', e.target.value)}
          placeholder="Create a password"
          required
        />
      </div>
      <div>
        <Label htmlFor="confirm_password" className="text-white">Confirm Password*</Label>
        <Input
          id="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={(e) => updateFormData('confirm_password', e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </div>
      <div>
        <Label htmlFor="name" className="text-white">Full Name*</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="flex space-x-2">
        <div className="w-1/3">
          <Label htmlFor="mobilecode" className="text-white">Code*</Label>
          <Select 
            value={formData.mobilecode} 
            onValueChange={(value) => updateFormData('mobilecode', value)}
            required
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+1">+1 (US)</SelectItem>
              <SelectItem value="+91">+91 (IN)</SelectItem>
              <SelectItem value="+44">+44 (UK)</SelectItem>
              <SelectItem value="+61">+61 (AU)</SelectItem>
              <SelectItem value="+65">+65 (SG)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="mobile" className="text-white">Mobile Number*</Label>
          <Input
            id="mobile"
            value={formData.mobile}
            onChange={(e) => updateFormData('mobile', e.target.value)}
            placeholder="Enter mobile number"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="gender" className='text-white'>Gender*</Label>
        <Select 
          value={formData.gender} 
          onValueChange={(value) => updateFormData('gender', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(GENDER_OPTIONS).map((gender) => (
              <SelectItem key={gender} value={gender}>{gender}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="dob" className="text-white">Date of Birth*</Label>
        <Input
          id="dob"
          type="date"
          value={formData.dob}
          onChange={(e) => updateFormData('dob', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="maritalStatus" className="text-white">Marital Status*</Label>
        <Select 
          value={formData.maritalStatus} 
          onValueChange={(value) => updateFormData('maritalStatus', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Single">Single</SelectItem>
            <SelectItem value="Divorced">Divorced</SelectItem>
            <SelectItem value="Widowed">Widowed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="education" className="text-white">Education*</Label>
        <Select 
          value={formData.education} 
          onValueChange={(value) => updateFormData('education', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select education" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High School">High School</SelectItem>
            <SelectItem value="Bachelors">Bachelors</SelectItem>
            <SelectItem value="Masters">Masters</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="occupation" className="text-white">Occupation*</Label>
        <Input
          id="occupation"
          value={formData.occupation}
          onChange={(e) => updateFormData('occupation', e.target.value)}
          placeholder="Enter your occupation"
          required
        />
      </div>
      <div>
        <Label htmlFor="language" className="text-white">Languages*</Label>
        <Input
          id="language"
          value={formData.language}
          onChange={(e) => updateFormData('language', e.target.value)}
          placeholder="Languages you speak"
          required
        />
      </div>
      <div>
        <Label htmlFor="height" className="text-white">Height (cm)</Label>
        <Input
          id="height"
          type="number"
          value={formData.height}
          onChange={(e) => updateFormData('height', e.target.value)}
          placeholder="Enter your height in cm"
           required
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="diet" className="text-white">Diet</Label>
          <Select value={formData.diet} onValueChange={(value) => updateFormData('diet', value)}
             required
             >
            <SelectTrigger>
              <SelectValue placeholder="Diet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Vegetarian">Vegetarian</SelectItem>
              <SelectItem value="Non-vegetarian">Non-vegetarian</SelectItem>
              <SelectItem value="Vegan">Vegan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="smoke" className="text-white">Smoke</Label>
          <Select value={formData.smoke} onValueChange={(value) => updateFormData('smoke', value)}
             required>
            <SelectTrigger>
              <SelectValue placeholder="Smoke" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Occasionally">Occasionally</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="drink" className="text-white">Drink</Label>
          <Select value={formData.drink} onValueChange={(value) => updateFormData('drink', value)}
             required>
            <SelectTrigger>
              <SelectValue placeholder="Drink" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Socially">Socially</SelectItem>
              <SelectItem value="Occasionally">Occasionally</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="city_name" className="text-white">City*</Label>
        <Input
          id="city_name"
          value={formData.city_name}
          onChange={(e) => updateFormData('city_name', e.target.value)}
          placeholder="Enter your city"
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="postal" className="text-white">Postal Code</Label>
          <Input
            id="postal"
            value={formData.postal}
            onChange={(e) => updateFormData('postal', e.target.value)}
            placeholder="Postal code"
             required
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-white">State*</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => updateFormData('state', e.target.value)}
            placeholder="State"
            required
          />
        </div>
        <div>
          <Label htmlFor="country" className="text-white">Country*</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => updateFormData('country', e.target.value)}
            placeholder="Country"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="partnerExpectations" className="text-white">Partner Expectations</Label>
        <Textarea
          id="partnerExpectations"
          value={formData.partnerExpectations}
          onChange={(e) => updateFormData('partnerExpectations', e.target.value)}
          placeholder="What are you looking for in a partner?"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="bio" className="text-white">Bio*</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => updateFormData('bio', e.target.value)}
          placeholder="Tell us about yourself"
          rows={4}
          required
        />
      </div>
      <div>
        <Label htmlFor="photo1" className="text-white">Profile Photo 1*</Label>
        <Input
          id="photo1"
          type="file"
          accept="image/*"
          onChange={(e) => updateFormData('photo1', e.target.files?.[0] || null)}
          required
        />
        {formData.photo1 && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {formData.photo1.name}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="photo2" className="text-white">Profile Photo 2</Label>
        <Input
          id="photo2"
          type="file"
          accept="image/*"
          onChange={(e) => updateFormData('photo2', e.target.files?.[0] || null)}
           required
        />
        {formData.photo2 && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {formData.photo2.name}
          </div>
        )}
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Contact Information';
      case 2: return 'Personal Details';
      case 3: return 'Professional Details';
      case 4: return 'Lifestyle & Location';
      case 5: return 'About You & Photos';
      default: return '';
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${background})`
      }}>
      <Card className="w-full max-w-md shadow-2xl bg-black/30 backdrop-blur-md border-none">
        <CardHeader>
          <CardTitle className="
      text-center
    text-2xl
    font-bold
    bg-gradient-to-r 
    from-red-300
    via-orange-200 
    via-[#FDFFB8] 
    via-green-200 
    via-blue-300 
    via-[#EABDE6]
    to-purple-300
    bg-clip-text 
    text-transparent
  ">
            Join Umeed - Step {currentStep} of 5
          </CardTitle>
          <div className="text-center text-sm text-white mb-4">
            {getStepTitle()}
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center space-x-2"
              disabled={loading}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{currentStep === 5 ? 'Complete' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationScreen;