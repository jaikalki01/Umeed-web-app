
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Camera, Save } from 'lucide-react';
import { editUserProfile } from '@/helpers/apiHelper'; // Adjust the import based on your API utility location
import { BASE_URL1 } from '@/config'; // Adjust the import based on your config location
interface EditProfileScreenProps {
  
  user: any;
  onSave: (profileData: any) => void;
  //onSave: (res: any) => void;
  onBack: () => void;
}

const EditProfileScreen = ({ user, onSave, onBack }: EditProfileScreenProps) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    bio: user.bio || '',
    occupation: user.occupation || '',
    education: user.education || '',
    city_name: user.city_name || '',
    partnerExpectations: user.partnerExpectations || '',
    phonehide: user.phonehide || false,
    photoProtect: user.photoProtect || false,
    //photohide: user.photohide || false,
  });
  const [photo1, setPhoto1] = useState<File | null>(null);
  const [photo2, setPhoto2] = useState<File | null>(null);

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
  const file = e.target.files?.[0];
  if (file) {
    index === 1 ? setPhoto1(file) : setPhoto2(file);
  }
};

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
  const form = new FormData();

  // Append text fields
  Object.entries(formData).forEach(([key, value]) => {
    form.append(key, value as string);
  });

  // Append photo files
  if (photo1) form.append('photo1', photo1);
  if (photo2) form.append('photo2', photo2);

  try {
    //const res = await editUserProfile(form);
    //console.log('Saved:', res);
    onSave(form); // or pass res.user if needed
  } catch (err) {
    //console.error('Save failed:', err);
  }
};


  //const handleSave = () => {
   // onSave(formData);
  //};

  //const handleImageUpload = () => {
    // In a real app, this would open a file picker
    //alert('Image upload functionality would be implemented here');
  //};

  return (
    <div className="min-h-screen bg-gray-50 pb-20"
    
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4"
      style={{ position: 'sticky', top: 0 }}>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="text-white hover:bg-white/20"
          >
            <Save className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Profile Photo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                //src={user.photo1}
                 src={`${BASE_URL1}/${user.photo1}`}
                alt={user.id}
                className="w-20 h-20 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 1)}
                className="hidden"
                id="photo1"
              />
              <label htmlFor="photo1" className="cursor-pointer text-purple-600 hover:underline">
                <Camera className="w-5 h-5 inline-block mr-1" />
                Change Photo 1
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <img
                //src={user.photo2}
                src={`${BASE_URL1}/${user.photo2}`}
                alt={user.id}
                className="w-20 h-20 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, 2)}
                className="hidden"
                id="photo2"
              />
              <label htmlFor="photo2" className="cursor-pointer text-purple-600 hover:underline">
                <Camera className="w-5 h-5 inline-block mr-1" />
                Change Photo 2
              </label> 
            </div>
        
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city_name}
                onChange={(e) => handleInputChange('city_name', e.target.value)}
                placeholder="Enter your city"
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                placeholder="Enter your occupation"
              />
            </div>
            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="Enter your education"
              />
            </div>
          </CardContent>
        </Card>

        {/* About Me */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell others about yourself..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Partner Expectations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Partner Expectations</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="partner">What are you looking for?</Label>
            <Textarea
              id="partner"
              value={formData.partnerExpectations}
              onChange={(e) => handleInputChange('partnerExpectations', e.target.value)}
              placeholder="Describe your ideal partner..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Hide Phone Number</Label>
                <p className="text-sm text-gray-600">Don't show your phone to others</p>
              </div>
              <Switch
                checked={formData.phonehide}
                onCheckedChange={(checked) => handleInputChange('phonehide', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Photo Protection</Label>
                <p className="text-sm text-gray-600">Protect your photos from screenshots</p>
              </div>
              <Switch
                checked={formData.photoProtect}
                onCheckedChange={(checked) => handleInputChange('photoProtect', checked)}
              />
            </div>
          
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditProfileScreen;
