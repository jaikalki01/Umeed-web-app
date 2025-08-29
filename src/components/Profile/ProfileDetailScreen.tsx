import { sendConnectionRequest } from '@/helpers/apiHelper';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '../../types';
import { Heart, MessageCircle, UserCheck, UserX, ChevronLeft, ChevronRight, MapPin, Briefcase, Calendar, Phone, ArrowLeft } from 'lucide-react';
import { BASE_URL1 } from '@/config';
import { toast } from '@/components/ui/use-toast';



interface ProfileDetailScreenProps {
  user: User | null;
  onLike: (userId: string) => void;
  onMessage: (userId: string) => void;
  onBlock: (userId: string) => void;
  onUnblock: (userId: string) => void;
  onBack: () => void;
  onAcceptRequest?: (userId: string) => void;
  onRejectRequest?: (userId: string) => void;
  onSendRequest?: (userId: string) => void;
  //onSaveProfile?: (userId: string) => void;
  //onToggleSaveProfile?: (userId: string) => void;
  isBlocked?: boolean;
  isConnected?: boolean;
}

const ProfileDetailScreen = ({ 
  user, 
  onLike, 
  onMessage, 
  onBlock, 
  onUnblock,
  onBack,
  onAcceptRequest,
  onRejectRequest,
  onSendRequest,
  isBlocked = false,
  isConnected = false 
}: ProfileDetailScreenProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [requestSent, setRequestSent] = useState(false);

  if (!user) return null;

  const photos = [user.photo1, user.photo2].filter(Boolean);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-gold-500';
      case 'exclusive': return 'bg-purple-600';
      case 'active': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return '💎';
      case 'exclusive': return '👑';
      case 'active': return '✨';
      default: return '';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-[120px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg"
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
            <h1 className="text-xl font-bold">Profile Details</h1>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="relative h-80 bg-gray-200 overflow-hidden">
        {photos.length > 0 ? (
          <>
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{
                width: `${photos.length * 100}%`,
                transform: `translateX(-${currentPhotoIndex * (100 / photos.length)}%)`,
              }}
            >
              {photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={`${BASE_URL1}/${photo}`}
                  alt={user.name}
                  className="w-full h-full object-contain flex-shrink-0"
                  style={{ width: `${100 / photos.length}%` }}
                />
              ))}
            </div>
            {photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {photos.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">No photo available</div>
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-4 right-4 space-y-2">
          <Badge className={`${getStatusColor(user.status)} text-white`}>
            {getStatusIcon(user.status)} {user.status.toUpperCase()}
          </Badge>
          {user.verify_status && (
            <Badge className="bg-blue-500 text-white block flex">
              <UserCheck className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {user.onlineUsers && (
            <Badge className="bg-green-500 text-white block flex">
              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
              Online
            </Badge>
          )}

           <button
          onClick={() => onLike(user.id)}
          className="p-1.5 bg-white rounded-full shadow hover:bg-pink-50 transition"
        >
         <Heart className="w-5 h-5 text-red-500 fill-red-500" /> 
        
        </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">
            {user.name}, {user.age}
          </h2>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            {user.city_name}, {user.state}, {user.country}
          </div>
        </div>

        {/* Basic Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-600 mb-3 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Professional
              </h3>
              <div className="space-y-2 text-sm">
                <div><strong>Occupation:</strong> {user.occupation}</div>
                <div><strong>Education:</strong> {user.education}</div>
                <div><strong>Languages:</strong> {user.language}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-600 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Personal
              </h3>
              <div className="space-y-2 text-sm">
                <div><strong>Gender:</strong> {user.gender}</div>
                <div><strong>Marital Status:</strong> {user.maritalStatus}</div>
                <div><strong>Height:</strong> {user.height}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-600 mb-3">
                Lifestyle
              </h3>
              <div className="space-y-2 text-sm">
                <div><strong>Diet:</strong> {user.diet}</div>
                <div><strong>Smoking:</strong> {user.smoke}</div>
                <div><strong>Drinking:</strong> {user.drink}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-600 mb-3 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </h3>
              <div className="space-y-2 text-sm">
                <div><strong>Email:</strong> {user.verify_email ? user.email : 'Hidden'}</div>
                <div><strong>Mobile:</strong> {user.phonehide ? 'Hidden' : `${user.mobilecode} ${user.mobile}`}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bio Section */}
        {user.bio && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-600 mb-3">About Me</h3>
              <p className="text-gray-700">{user.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Partner Expectations */}
        {user.partnerExpectations && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-600 mb-3">What I'm Looking For</h3>
              <p className="text-gray-700">{user.partnerExpectations}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="flex gap-3 justify-center max-w-md mx-auto">
      {user.isBlocked ? (
  <Button
    onClick={() => onUnblock(user.id)}
    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
  >
    <UserCheck className="w-4 h-4 mr-2" />
    Unblock
  </Button>
) : (
  <>
    {/* Match status actions */}
    {user.match_status === 'none' && (
      <Button
        disabled={requestSent}
        onClick={() => onSendRequest(user.id)}
        className="flex-1"
      >
        {requestSent ? "Request Sent" : "Send Request"}
      </Button>
    )}

    {user.match_status === 'sent' && (
      <Button disabled className="flex-1 bg-gray-300 text-gray-700 cursor-not-allowed">
        Request Already Sent
      </Button>
    )}

    {user.match_status === 'pending' && (
      <div className="flex gap-3 w-full">
        <Button
          onClick={() =>onAcceptRequest(user.id)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Accept Request
        </Button>
        <Button
          onClick={() => onRejectRequest(user.id)}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-black"
        >
          Reject Request
        </Button>
      </div>
    )}

   {user.match_status === 'accepted' && (
  <>
    <Button
      onClick={() => onMessage(user.id)}
      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      Chat
    </Button>
    <Button
      onClick={() => onBlock(user.id)}
      variant="destructive"
      className="flex-1"
    >
      <UserX className="w-4 h-4 mr-2" />
      Block
    </Button>
  </>
)}
  </>
)}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailScreen;
