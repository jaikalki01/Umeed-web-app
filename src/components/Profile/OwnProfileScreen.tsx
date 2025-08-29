import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Camera, MapPin, Briefcase, GraduationCap, Calendar, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { BASE_URL1 } from '@/config';
interface OwnProfileScreenProps {
 user: any;
  onEdit: () => void;
  onBack: () => void;
}

const OwnProfileScreen = ({user, onEdit, onBack }: OwnProfileScreenProps) => {

  // If you need the authenticated user, rename it to avoid conflict
  //const { user} = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4"
      style={{ position: 'sticky', top: 0 ,zIndex: 10 }}>
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">My Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-white hover:bg-white/20"
          >
            <Edit className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="relative -mt-8 px-4 pt-10">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={`${BASE_URL1}/${user.photo1}`}
                alt={user.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="items-center mb-2">
                  <h2 className="text-2xl font-bold">{user.id}/{user.name}</h2>
                  {user.verify_status && (
                    <Badge className="bg-blue-500 text-white mr-2">✓ Verified</Badge>
                  )}
                  <Badge className={`${
                    user.status === 'paid' ? 'bg-yellow-500' :
                    user.status === 'exclusive' ? 'bg-purple-800' :
                    'bg-green-500'
                  }`}>
                    {user.status === 'paid' && '💎'}
                    {user.status === 'exclusive' && '👑'}
                    {user.status === 'active' && '✨'}
                    {user.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-lg opacity-90">{user.age} years old</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Details */}
      <div className="px-4 mt-4 space-y-4">
        {/* Basic Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-purple-600 mb-3">Basic Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{user.city_name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-gray-500" />
                <span>{user.occupation}</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-gray-500" />
                <span>{user.education}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>Born in {new Date().getFullYear() - user.age}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Me */}
        {user.bio && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-purple-600 mb-3">About Me</h3>
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Partner Expectations */}
        {user.partnerExpectations && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Partner Expectations
              </h3>
              <p className="text-gray-700 leading-relaxed">{user.partnerExpectations}</p>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {user.email}</p>
              {!user.phonehide && user.phone && (
                <p><span className="font-medium">Phone:</span> {user.phone}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-purple-600 mb-3">Privacy Settings</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Phone Number Hidden:</span>
                <Badge variant={user.phonehide ? "default" : "secondary"}>
                  {user.phonehide ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Photo Protection:</span>
                <Badge variant={user.photoProtect ? "default" : "secondary"}>
                  {user.photoProtect ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Profile Hidden:</span>
                <Badge variant={user.photohide ? "default" : "secondary"}>
                  {user.photohide ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnProfileScreen;
