import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, Check, X, User, ArrowLeft, Bell } from 'lucide-react';
import { fetchNotify } from '@/helpers/apiHelper';

interface NotificationScreenProps {
   onViewProfile: (user) => void; 
  onAcceptRequest: (userId: string) => void;
  onRejectRequest: (userId: string) => void;
  onBack: () => void;
}

interface User {
  id: string;
  name: string;
  photo1: string;
  age: number;
  city_name: string;
}

interface Notification {
  id: number;
  sender_id: User | null;
  receiver_id: string;
  status: 'view' | 'pending' | 'accepted' | 'rejected' | 'msg';
  message: string;
  is_read: boolean;
  created_at: string;
}

interface ProfileView {
  id: string;
  userId: string;
  viewedAt: Date;
}

interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  type: 'sent' | 'received';
  createdAt: Date;
}

interface MessageItem {
  id: string;
  message: string;
  created_at: Date;
}

const NotificationScreen = ({ onViewProfile, onAcceptRequest, onRejectRequest, onBack }: NotificationScreenProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [profileViews, setProfileViews] = useState<ProfileView[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [notifications, setNotifications] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  const fetchNotificationsByStatus = async (status: string) => {
    try {
      const res = await fetchNotify(status) as Notification[];
      // console.log(`✅ API Response for '${status}'`, res);

      if (status === 'view') {
        const views = res.map((n: Notification) => ({
          id: String(n.id),
          userId: n.sender_id?.id || '',
          viewedAt: new Date(n.created_at),
        }));

        const viewUsers = res.map(n => n.sender_id).filter(Boolean) as User[];
        // console.log("👁️ View Users", viewUsers);
        setUsers(prev => [...prev, ...viewUsers]);
        setProfileViews(views);
      } else if (['pending', 'accepted', 'rejected'].includes(status)) {
        const requests: ConnectionRequest[] = res.map((n: Notification) => ({
          id: String(n.id),
          fromUserId: n.sender_id?.id || '',
          toUserId: n.receiver_id,
          status: n.status as 'pending' | 'accepted' | 'rejected',
          type: 'received',
          createdAt: new Date(n.created_at),
        }));

        const requestUsers = res.map(n => n.sender_id).filter(Boolean) as User[];
        // console.log("❤️ Request Users", requestUsers);
        setUsers(prev => [...prev, ...requestUsers]);
        setConnectionRequests(prev => [...prev, ...requests]);
      } else if (status === 'message') {
        const messages = res.map((n: Notification) => ({
          id: String(n.id),
          message: n.message,
          created_at: new Date(n.created_at),
        }));

        // console.log("📩 Messages", messages);
        setNotifications(messages);
      }
    } catch (err) {
      // console.error(`❌ Failed to load ${status} notifications`, err);
    }
  };

  const fetchAllNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchNotificationsByStatus('view');
      await fetchNotificationsByStatus('pending');
      await fetchNotificationsByStatus('accepted');
      await fetchNotificationsByStatus('rejected');
      await fetchNotificationsByStatus('message');
    } catch (err) {
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (userId: string) => {
    const user = users.find(user => user.id === userId);
    if (!user) console.warn("⚠️ User not found for ID:", userId);
    return user;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / 3600000);
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleAcceptRequest = (requestId: string, fromUserId: string) => {
    setConnectionRequests(prev => prev.map(req => req.id === requestId ? { ...req, status: 'accepted' } : req));
    onAcceptRequest(fromUserId);
  };

  const handleRejectRequest = (requestId: string, fromUserId: string) => {
    setConnectionRequests(prev => prev.map(req => req.id === requestId ? { ...req, status: 'rejected' } : req));
    onRejectRequest(fromUserId);
  };

  const getStatusBadge = (status: string, type: string) => {
    if (status === 'accepted') return <Badge className="bg-green-500 text-white">Accepted</Badge>;
    if (status === 'rejected') return <Badge className="bg-red-500 text-white">Rejected</Badge>;
    if (type === 'sent') return <Badge className="bg-blue-500 text-white">Sent</Badge>;
    return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 md:p-4 shadow-lg z-10 sticky top-0">
        <div className="flex items-center space-x-2 md:space-x-3 max-w-7xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-1 md:p-2">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <h1 className="text-lg md:text-xl font-bold">Notifications</h1>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full">
        <Tabs defaultValue="views" className="w-full pb-16 md:pb-8">
          <TabsList className="grid grid-cols-3 mx-2 md:mx-4 mb-3 md:mb-4 h-12 md:h-auto">
            <TabsTrigger value="views" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Eye className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Views</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Heart className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="notify" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Bell className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>

          {/* Views Tab */}
          <TabsContent value="views" className="px-2 md:px-4">
            <div className="space-y-2 md:space-y-3">
              {profileViews.length ? profileViews.map(view => {
                const user = getUserById(view.userId);
                if (!user) return null;
                return (
                  <Card key={view.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-3 md:p-4">
                      {/* Mobile 50/50 Layout */}
                      <div className="md:hidden">
                        <div className="flex items-center space-x-3 mb-3">
                          {/* Profile Image - 50% width on mobile */}
                          <div className="w-1/2 flex justify-center">
                            <img
                              src={user.photo1}
                              alt={user.id}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          </div>
                          {/* User Details - 50% width on mobile */}
                          <div className="w-1/2">
                            <h3 className="font-semibold text-purple-600 text-sm truncate">{user.id}</h3>
                            <p className="text-xs text-gray-600">{user.age} years • {user.city_name}</p>
                            <p className="text-xs text-gray-500">Viewed your profile {formatTimeAgo(view.viewedAt)}</p>
                          </div>
                        </div>
                        {/* Mobile Button at bottom */}
                        <Button
                          size="sm"
                          onClick={() => onViewProfile(user)}
                          className="bg-purple-600 text-white text-xs px-4 py-2 w-full"
                        >
                          <User className="w-3 h-3 mr-1" />
                          <span>View</span>
                        </Button>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:flex items-center space-x-4">
                        <img
                          src={user.photo1}
                          alt={user.id}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-purple-600 text-base truncate">{user.id}</h3>
                          <p className="text-sm text-gray-600">{user.age} years • {user.city_name}</p>
                          <p className="text-xs text-gray-500">Viewed your profile {formatTimeAgo(view.viewedAt)}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onViewProfile(user)}
                          className="bg-purple-600 text-white text-sm px-3 py-2 flex-shrink-0"
                        >
                          <User className="w-4 h-4 mr-1" />
                          <span>View</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              }) : (
                <div className="text-center py-12 md:py-16 text-gray-500">
                  <Eye className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-sm md:text-base">No profile views</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="px-2 md:px-4">
            <div className="space-y-2 md:space-y-3">
              {connectionRequests.length ? connectionRequests.map(request => {
                const user = getUserById(request.fromUserId);
                if (!user) return null;
                return (
                  <Card key={request.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-3 md:p-4">
                      {/* Mobile 50/50 Layout */}
                      <div className="md:hidden">
                        <div className="flex items-center space-x-3 mb-3">
                          {/* Profile Image - 50% width on mobile */}
                          <div className="w-1/2 flex justify-center">
                            <img
                              src={user.photo1}
                              alt={user.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          </div>
                          {/* User Details - 50% width on mobile */}
                          <div className="w-1/2">
                            <div className="flex flex-col mb-1">
                              <h3 className="font-semibold text-purple-600 text-sm truncate">{user.name}</h3>
                              <div className="mt-1">
                                {getStatusBadge(request.status, request.type)}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">{user.age} years • {user.city_name}</p>
                            <p className="text-xs text-gray-500">Request {formatTimeAgo(request.createdAt)}</p>
                          </div>
                        </div>
                        {/* Mobile buttons at bottom */}
                        {request.status === 'pending' ? (
                          <div className="flex space-x-2 w-full">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(request.id, request.fromUserId)}
                              className="bg-green-600 text-xs px-4 py-2 flex-1"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              <span>Accept</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectRequest(request.id, request.fromUserId)}
                              className="text-xs px-4 py-2 flex-1"
                            >
                              <X className="w-3 h-3 mr-1" />
                              <span>Reject</span>
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => onViewProfile(user)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-xs px-4 py-2 w-full"
                          >
                            <User className="w-3 h-3 mr-1" />
                            <span>View</span>
                          </Button>
                        )}
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:flex items-center space-x-4">
                        <img
                          src={user.photo1}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-purple-600 text-base truncate">{user.name}</h3>
                            {getStatusBadge(request.status, request.type)}
                          </div>
                          <p className="text-sm text-gray-600">{user.age} years • {user.city_name}</p>
                          <p className="text-xs text-gray-500">Request {formatTimeAgo(request.createdAt)}</p>
                        </div>
                        {/* Desktop buttons */}
                        <div className="flex-shrink-0">
                          {request.status === 'pending' ? (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleAcceptRequest(request.id, request.fromUserId)}
                                className="bg-green-600 text-sm px-3 py-2"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                <span>Accept</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectRequest(request.id, request.fromUserId)}
                                className="text-sm px-3 py-2"
                              >
                                <X className="w-4 h-4 mr-1" />
                                <span>Reject</span>
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => onViewProfile(user)}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 text-sm px-3 py-2"
                            >
                              <User className="w-4 h-4 mr-1" />
                              <span>View</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }) : (
                <div className="text-center py-12 md:py-16 text-gray-500">
                  <Heart className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-sm md:text-base">No connection requests</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="notify" className="px-2 md:px-4">
            <div className="space-y-2 md:space-y-3">
              {notifications.length ? notifications.map(n => (
                <Card key={n.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-3 md:p-4">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{n.message}</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-2">{formatTimeAgo(n.created_at)}</p>
                  </CardContent>
                </Card>
              )) : (
                <div className="text-center py-12 md:py-16 text-gray-500">
                  <Bell className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-sm md:text-base">No messages yet</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NotificationScreen;