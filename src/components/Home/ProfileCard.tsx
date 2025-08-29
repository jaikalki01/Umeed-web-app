import { useState } from "react";
import { User } from '../../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Handshake, UserCheck } from 'lucide-react';
import { BASE_URL1 } from '@/config';

interface ProfileCardProps {
  title?: string;
  user: User;
  onLike: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onViewProfile: (userId: string) => void;
  onSendRequest?: (userId: string) => void;
  onUnblock?: (userId: string) => void;
  onAcceptRequest?: (userId: string) => void;
  onRejectRequest?: (userId: string) => void;
}

const ProfileCard = ({ title, user, onLike, onMessage, onViewProfile, onSendRequest, onUnblock }: ProfileCardProps) => {
  const [liked, setLiked] = useState(title === "Saved Profiles"); // initial liked state

  const handleLike = () => {
    setLiked(!liked);       // toggle heart glow
    onLike(user.id);        // call parent handler
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
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={
            user.photo1 === "nophoto.gif"
              ? `${BASE_URL1}/umeedc00145b6-a62e-4cc0-a258-7d35443c8fb4newlogo.png`
              : `${BASE_URL1}/${user.photo1}`
          }
          alt={user.id}
          className="w-full aspect-[2/2] !object-cover"
        />

        <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
          {/* Left: Status Badge */}
          <Badge className={`${getStatusColor(user.status)} text-white`}>
            {getStatusIcon(user.status)} {user.status.toUpperCase()}
          </Badge>

          {/* Right: Like Button */}
          <button
            onClick={handleLike}
            className="p-1.5 bg-white rounded-full shadow hover:bg-pink-50 transition"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                liked
                  ? 'text-red-500 fill-red-500 scale-110'
                  : 'text-gray-600 fill-none scale-100'
              }`}
            />
          </button>
        </div>

        {user.verify_status && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-blue-500 text-white">
              <UserCheck className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}

        {user.onlineUsers && (
          <div className="absolute bottom-2 left-2">
            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{user.id}</h3>
            <p className="text-sm text-gray-600">{user.age} years • {user.city_name}</p>
          </div>
        </div>

        <div className="mb-3">
          <Badge variant="outline" className="mr-2 mb-1">{user.gender}</Badge>
          <Badge variant="outline" className="mr-2 mb-1">{user.occupation}</Badge>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{user.bio}</p>

        <div className="flex space-x-2">
          {title !== "Saved Profiles" && title !== "Blocked Profiles" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendRequest && onSendRequest(user.id)}
              className="flex-1 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-600"
            >
              <Handshake className="w-4 h-4 mr-1" />
              Send Request
            </Button>
          )}

          {title === "Blocked Profiles" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUnblock && onUnblock(user.id)}
              className="flex-1 hover:bg-green-50 hover:text-green-600 hover:border-green-600"
            >
              <UserCheck className="w-4 h-4 mr-1" />
              Unblock
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => onViewProfile(user.id)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
