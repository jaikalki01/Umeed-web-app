import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../Layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, MessageCircle, UserCheck } from 'lucide-react';
import {
  fetchConnectedRequests,
  fetchReceivedRequests,
  respondToRequest,
  fetchPendingRequests
} from '@/helpers/apiHelper';
import ChatScreen from '@/components/Chat/ChatScreen';
import { BASE_URL1 } from '@/config';
import { toast } from '@/components/ui/use-toast';

const PAGE_SIZE = 10;

type Tab = 'pending' | 'connected' | 'sent';

type User = {
  id: string;
  photo1: string;
  onlineUsers: boolean;
  verify_status: boolean;
  status: 'active' | 'paid' | 'exclusive';
  age: number;
  city_name: string;
  occupation: string;
  bio: string;
};

const ConnectionsScreen = () => {
  const [activeTab, setActiveTab] = useState<Tab>('pending');
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [pendingTotal, setPendingTotal] = useState(0);
  const [sentTotal, setSentTotal] = useState(0);
  const [connectedTotal, setConnectedTotal] = useState(0);
  const [chatUser, setChatUser] = useState<User | null>(null);

  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [activeTab]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (activeTab === 'pending') {
          data = await fetchReceivedRequests(page, PAGE_SIZE);
          if (isMounted && page === 1) setPendingTotal(data.total);
        } else if (activeTab === 'sent') {
          data = await fetchPendingRequests(page, PAGE_SIZE);
          if (isMounted && page === 1) setSentTotal(data.total);
        } else if (activeTab === 'connected') {
          data = await fetchConnectedRequests(page, PAGE_SIZE);
          if (isMounted && page === 1) setConnectedTotal(data.total);
        }

        if (isMounted) {
          setUsers(prev => page === 1 ? data.users : [...prev, ...data.users]);
          setHasMore(data.has_next);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setHasMore(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [activeTab, page]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleAcceptRequest = async (userId: string) => {
    try {
      const res = await respondToRequest(userId, 'accepted');
      if (res.success) {
        toast({ title: "Request Accepted", description: res.message });
        setUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not accept request.", variant: "destructive" });
    }
  };

  const handleRejectRequest = async (userId: string) => {
    try {
      const res = await respondToRequest(userId, 'rejected');
      if (res.success) {
        toast({ title: "Request Rejected", description: res.message });
        setUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not reject request.", variant: "destructive" });
    }
  };

  const renderUserCard = (user: User, actions?: Tab) => (
    <Card key={user.id} className="mb-2 md:mb-3 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-3 md:p-4">
        {/* Mobile 50/50 Layout */}
        <div className="md:hidden">
          <div className="flex items-center space-x-3 mb-3">
            {/* Profile Image - 50% width on mobile */}
            <div className="w-1/2 flex justify-center">
              <div className="relative">
                <img
                  src={`${BASE_URL1}/${user.photo1}`}
                  alt={user.id}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {user.onlineUsers && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
            </div>
            {/* User Details - 50% width on mobile */}
            <div className="w-1/2">
              <div className="flex flex-col mb-1">
                <div className="flex items-center space-x-1 mb-1">
                  <h3 className="font-semibold text-sm truncate">{user.id}</h3>
                  {user.verify_status && <UserCheck className="w-3 h-3 text-blue-500 flex-shrink-0" />}
                </div>
                <Badge className={`text-xs w-fit ${
                  user.status === 'paid' ? 'bg-yellow-500' :
                  user.status === 'exclusive' ? 'bg-purple-500' :
                  'bg-green-500'
                }`}>
                  {user.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-gray-600">
                {user.age} years • {user.city_name}
              </p>
              <p className="text-xs text-gray-600">{user.occupation}</p>
              <p className="text-xs text-gray-500 truncate mt-1">{user.bio}</p>
            </div>
          </div>

          {/* Mobile Action Buttons at bottom */}
          <div className="w-full">
            {actions === 'pending' && (
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleAcceptRequest(user.id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-2 flex-1">
                  <Check className="w-3 h-3 mr-1" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleRejectRequest(user.id)}
                  className="text-red-500 border-red-500 hover:bg-red-50 text-xs px-4 py-2 flex-1">
                  <X className="w-3 h-3 mr-1" />
                  Reject
                </Button>
              </div>
            )}
            {actions === 'sent' && (
              <div className="flex justify-center">
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
            )}
            {actions === 'connected' && (
              <Button size="sm" variant="outline" onClick={() => setChatUser(user)}
                className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-600 text-xs px-4 py-2 w-full">
                <MessageCircle className="w-3 h-3 mr-1" />
                Chat
              </Button>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={`${BASE_URL1}/${user.photo1}`}
              alt={user.id}
              className="w-12 h-12 rounded-full object-cover"
            />
            {user.onlineUsers && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-base truncate">{user.id}</h3>
              {user.verify_status && <UserCheck className="w-4 h-4 text-blue-500" />}
              <Badge className={`text-xs ${
                user.status === 'paid' ? 'bg-yellow-500' :
                user.status === 'exclusive' ? 'bg-purple-500' :
                'bg-green-500'
              }`}>
                {user.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              {user.age} years • {user.city_name} • {user.occupation}
            </p>
            <p className="text-xs text-gray-500 truncate mt-1">{user.bio}</p>
          </div>

          <div className="flex flex-col space-y-2 flex-shrink-0">
            {actions === 'pending' && (
              <>
                <Button size="sm" onClick={() => handleAcceptRequest(user.id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2">
                  <Check className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleRejectRequest(user.id)}
                  className="text-red-500 border-red-500 hover:bg-red-50 text-sm px-3 py-2">
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            {actions === 'sent' && (
              <Badge variant="outline" className="text-xs">Pending</Badge>
            )}
            {actions === 'connected' && (
              <Button size="sm" variant="outline" onClick={() => setChatUser(user)}
                className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-600 text-sm px-3 py-2">
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (chatUser) {
    return <ChatScreen chatUser={chatUser} onBack={() => setChatUser(null)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* <Header activeTab="connections" /> */}

      <main className="flex-1 pb-16 md:pb-8 max-w-7xl mx-auto w-full">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Tab)} className="w-full">
          <TabsList className="grid grid-cols-3 mx-2 md:mx-4 mb-3 md:mb-4 h-12 md:h-auto">
            <TabsTrigger value="connected" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <span className="hidden sm:inline">Connected</span>
              <span className="sm:hidden">Connect</span>
              {connectedTotal > 0 && (
                <Badge className="ml-1 bg-red-500 text-white text-xs">{connectedTotal}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <span className="hidden sm:inline">Pending</span>
              <span className="sm:hidden">Pending</span>
              {pendingTotal > 0 && (
                <Badge className="ml-1 bg-red-500 text-white text-xs">{pendingTotal}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <span className="hidden sm:inline">Sent</span>
              <span className="sm:hidden">Sent</span>
              {sentTotal > 0 && (
                <Badge className="ml-1 bg-red-500 text-white text-xs">{sentTotal}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {(['connected', 'pending', 'sent'] as Tab[]).map(tab => (
            <TabsContent key={tab} value={tab} className="mt-3 md:mt-4">
              <div
                ref={containerRef}
                className="overflow-y-auto max-h-[calc(100vh-140px)] md:max-h-[calc(100vh-160px)]"
              >
                <div className="mb-3 md:mb-4 px-2 md:px-4">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests ({tab === 'pending' ? pendingTotal : tab === 'sent' ? sentTotal : connectedTotal})
                  </h3>
                </div>
                <div className="px-2 md:px-4 space-y-2 md:space-y-3">
                  {users.length > 0 ? (
                    users.map(user => renderUserCard(user, tab))
                  ) : (
                    <div className="text-center py-12 md:py-16 text-gray-500">
                      <MessageCircle className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 opacity-50" />
                      <p className="text-sm md:text-base">No {tab} requests</p>
                      <p className="text-xs md:text-sm">Start connecting with people!</p>
                    </div>
                  )}
                  {loading && (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default ConnectionsScreen;
