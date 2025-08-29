import { useEffect, useRef, useState } from 'react';
import Header from '../Layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Phone, Video, ArrowLeft } from 'lucide-react';
import { getChatUsers, getMessagesForUser } from '@/helpers/apiHelper';
import { BASE_URL1, BASE_URL } from '@/config';
import { useAuth } from '@/context/AuthContext';

interface ChatScreenProps {
  chatUser?: any; // optional: open directly
  onBack?: () => void; // optional: callback for back
}

const ChatScreen = ({ chatUser: initialChatUser, onBack }: ChatScreenProps) => {
  const [chatUsers, setChatUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(initialChatUser ? { user: initialChatUser } : null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuth();
  const selectedChatId = selectedUser?.user?.id;

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialChatUser) return;
    const fetchUsers = async () => {
      const users = await getChatUsers();
      setChatUsers(users as any[]);
    };
    fetchUsers();
  }, [initialChatUser]);

  useEffect(() => {
    if (!selectedChatId) return;
    const fetchMessages = async () => {
      setLoadingMessages(true);
      const msgs = await getMessagesForUser(selectedChatId);
      setMessages(msgs as any[]);
      setLoadingMessages(false);
    };
    fetchMessages();
  }, [selectedChatId]);

  useEffect(() => {
    if (!selectedChatId) return;
    const token = localStorage.getItem('token');
    const ws = new WebSocket(`${BASE_URL.replace(/^http/, 'ws')}/chat/ws/chat/${selectedChatId}?token=${token}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, {
        id: data.id,
        sender_id: data.from_id,
        receiver_id: data.to_id,
        message: data.message,
        timestamp: data.timestamp,
      }]);
    };

    return () => ws.close();
  }, [selectedChatId]);

  const handleSendMessage = () => {
    if (newMessage.trim() && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(newMessage);
      setNewMessage('');
    }
  };

  const handleBack = () => {
    setSelectedUser(null);
    setMessages([]);
    if (onBack) onBack();
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">{/* pb-16 to clear BottomNav on mobile */}
      {/* 📌 Header */}
    {/* <Header activeTab="chat"/> */}


      <main className="flex-1">
        {selectedUser ? (
          <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-80px)]">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleBack} className="text-white hover:bg-white/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img
                src={`${BASE_URL1}/${selectedUser.user.photo1}`}
                alt={selectedUser.user.id}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{selectedUser.user.id}</h3>
                <p className="text-sm opacity-90">{selectedUser.user.onlineUsers ? 'Online' : 'Last seen recently'}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Video className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 pb-28 md:pb-6">
  {loadingMessages ? (
    <div className="text-center text-gray-400">Loading messages...</div>
  ) : (
    <>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`px-4 py-2 rounded-2xl text-sm sm:text-base max-w-[80%] sm:max-w-sm md:max-w-md break-words ${
              msg.sender_id === user.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p>{msg.message}</p>
            <p
              className={`text-xs mt-1 ${
                msg.sender_id === user.id ? 'text-white/70' : 'text-gray-500'
              }`}
            >
              {formatTime(msg.timestamp)}
            </p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </>
  )}
</div>


            {/* Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-[60] md:z-20 pb-[env(safe-area-inset-bottom)]">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={!newMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 pb-20 md:pb-4">{/* bottom padding to avoid BottomNav overlap */}
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="space-y-3">
              {chatUsers.length === 0 ? (
                <div className="p-6 text-center text-gray-400">No chat started</div>
              ) : (
                chatUsers.map((chat) =>
                  chat.user && (
                    <Card
                      key={chat.user.id}
                      className="p-3 cursor-pointer"
                      onClick={() => setSelectedUser(chat)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={`${BASE_URL1}/${chat.user.photo1}`}
                              alt={chat.user.id}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            {chat.user.onlineUsers && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold truncate">{chat.user.id}</h3>
                              <div className="flex items-center space-x-2">
                                {chat.user.verify_status && (
                                  <Badge variant="secondary" className="text-xs">✓</Badge>
                                )}
                                {chat.timestamp && (
                                  <span className="text-xs text-gray-500">{formatTime(chat.timestamp)}</span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {chat.last_message || 'Start a conversation'}
                            </p>
                          </div>
                          <MessageCircle className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  )
                )
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatScreen;
