
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '../../types';
import { Heart, MessageCircle, UserCheck, UserX, ChevronLeft, ChevronRight, MapPin, Briefcase, GraduationCap, Calendar, Phone, Mail } from 'lucide-react';

interface ProfileDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onLike: (userId: string) => void;
  onMessage: (userId: string) => void;
  onBlock: (userId: string) => void;
  onUnblock: (userId: string) => void;
  isBlocked?: boolean;
  isConnected?: boolean;
}

const ProfileDetailView = ({ 
  isOpen, 
  onClose, 
  user, 
  onLike, 
  onMessage, 
  onBlock, 
  onUnblock,
  isBlocked = false,
  isConnected = false 
}: ProfileDetailViewProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Photo Gallery */}
          <div className="relative h-80 bg-gray-200">
            {photos.length > 0 ? (
              <>
                <img
                  src={photos[currentPhotoIndex]}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
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
                <Badge className="bg-blue-500 text-white block">
                  <UserCheck className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              {user.onlineUsers && (
                <Badge className="bg-green-500 text-white block">
                  <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                  Online
                </Badge>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-purple-600">
                {user.name}, {user.age}
              </DialogTitle>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                {user.city_name}, {user.state}, {user.country}
              </div>
            </DialogHeader>

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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {!isBlocked ? (
                <>
                  <Button
                    onClick={() => onLike(user.id)}
                    className="flex-1 max-w-xs hover:bg-pink-50 hover:text-pink-600 hover:border-pink-600"
                    variant="outline"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Send Interest
                  </Button>
                  
                  {isConnected && (
                    <Button
                      onClick={() => onMessage(user.id)}
                      className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => onBlock(user.id)}
                    variant="destructive"
                    className="flex-1 max-w-xs"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Block
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => onUnblock(user.id)}
                  className="flex-1 max-w-xs bg-green-600 hover:bg-green-700"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Unblock
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetailView;
