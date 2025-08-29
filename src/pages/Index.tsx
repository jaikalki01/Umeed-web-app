import { useState,useEffect, useRef } from 'react';
import LoginScreen from '../components/Auth/LoginScreen';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';
import HomeScreen from '../components/Home/HomeScreen';
import SearchScreen from '../components/Search/SearchScreen';
import SearchFilterScreen from '../components/Search/SearchFilterScreen';
import ChatScreen from '../components/Chat/ChatScreen';
import ConnectionsScreen from '../components/Connections/ConnectionsScreen';
import MoreScreen from '../components/More/MoreScreen';
import ContactUsScreen from '../components/More/ContactUsScreen';
import AboutUsScreen from '../components/More/AboutUsScreen';
import FAQScreen from '../components/More/FAQScreen';
import PrivacyPolicyScreen from  '../components/More/PrivacyPolicy';
import TermsAndConditionsScreen from '../components/More/TermsConditionScreen';
import ChildPolicyScreen from '../components/More/ChildPolicyScreen';
import NotificationScreen from '../components/Notifications/NotificationScreen';
import ProfileListScreen from '../components/Profile/ProfileListScreen';
import ProfileDetailScreen from '../components/Profile/ProfileDetailScreen';
import OwnProfileScreen from '../components/Profile/OwnProfileScreen';
import EditProfileScreen from '../components/Profile/EditProfileScreen';
import { useToast } from '../hooks/use-toast';
import { mockUsers } from '../data/mockData';
import { useAuth } from '@/context/AuthContext'; // <-- Import AuthContext
import { toggleBlockUser,toggleSaveProfile, editUserProfile,fetchProfileDetails, respondToRequest,sendConnectionRequest, fetchBlockedUsers } from '@/helpers/apiHelper';
import MembershipPlans from '../components/Membership/MembershipPlans';

const Index = () => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'home');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'notification' | 'profile-list' | 'profile-detail' | 'own-profile' | 'edit-profile' | 'contact-us' | 'about-us' | 'faq' | 'search-filters' |'membership' | 'saved-profile' | 'blocked-profiles' | 'terms' | 'privacy-policy' | 'child-policy'>(() => (localStorage.getItem('currentScreen') as any) || 'home');
  const [profileListData, setProfileListData] = useState<{ title: string; users: any[] }>({
    title: '',
    users: []
  });
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  //const [getUser, setGetUser] = useState<any | null>(null);
   const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
  const { toast } = useToast();

  // Use AuthContext for login state
  const { user, setUser, logout } = useAuth();
  const [profileListFilterType, setProfileListFilterType] = useState<'gender' | 'status'>('gender');
  const [profileListFilterValue, setProfileListFilterValue] = useState<string>('');
  // Remove local isLoggedIn state, use user from AuthContext
  const isLoggedIn = !!user;

  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
   const [requestSent, setRequestSent] = useState(false);
const [showBlockedProfiles, setShowBlockedProfiles] = useState(false);

const [showSavedProfiles, setShowSavedProfiles] = useState(false);
const [notificationCount, setNotificationCount] = useState(3); // Test notifications

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('currentScreen', currentScreen);
  }, [currentScreen]);

  const backPressRef = useRef(0);
  const tabHistoryRef = useRef<string[]>([]);
  useEffect(() => {
    // Ensure we stay within the SPA and handle hardware back
    const pushState = () => window.history.pushState(null, '', window.location.href);
    pushState();

    const handlePopState = () => {
      // Step 1: Collapse in-app screens to home
      if (currentScreen !== 'home') {
        setCurrentScreen('home');
        pushState();
        return;
      }
      // Step 2: Walk back through tab history if available
      if (tabHistoryRef.current.length > 0) {
        const previousTab = tabHistoryRef.current.pop() as string;
        setActiveTab(previousTab || 'home');
        pushState();
        return;
      }
      // Step 3: Collapse to home if not already
      if (activeTab !== 'home') {
        setActiveTab('home');
        pushState();
        return;
      }
      // Step 4: Triple-back to really exit the page/app
      if (backPressRef.current === 0) {
        backPressRef.current = 1;
        alert('Press back 2 more times to exit');
        pushState();
        setTimeout(() => (backPressRef.current = 0), 2000);
      } else if (backPressRef.current === 1) {
        backPressRef.current = 2;
        alert('Press back once more to exit');
        pushState();
      } else {
        // Attempt to navigate back, then close if possible (PWA/standalone)
        window.history.back();
        setTimeout(() => {
          try { window.close(); } catch { /* ignore */ }
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab, currentScreen]);
  const handleLogin = (email: string, password: string) => {
    console.log('Logging in with:', email, password);
    // setIsLoggedIn(true); // <-- Remove this line
    toast({
      title: "Welcome to Umeed!",
      description: "You have successfully logged in.",
    });
  };

  const handleRegister = () => {
    alert('Registration flow would start here');
  };
  const PAGE_SIZE = 10;
const fetchBlockedUsersGet = async () => {
  try {
     let data: any[] = [];
    const response = await fetchBlockedUsers(1, PAGE_SIZE) as {users: any[]}; // ✅ Call the function
    data = Array.isArray(response.users) ? response.users : [];
    setBlockedUsers(response.users || []);    // ✅ response.blocked, not response.data.blocked
    setShowBlockedProfiles(true);
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch blocked profiles",
      variant: "destructive"
    });
  }
};


const handleToggleLike = async (userId: string) => {
  try {
    const res = await toggleSaveProfile(userId) as { success: boolean; message: string };

    if (res.success) {
      // Profile liked
      setLikedUsers(prev => [...prev, userId]);
      toast({
        title: "Profile Liked!",
        description: res.message,
      });
    } else {
      // Profile unliked
      setLikedUsers(prev => prev.filter(id => id !== userId));
      toast({
        title: "Profile Unliked!",
        description: res.message,
      });
    }
  } catch {
    toast({
      title: "Error",
      description: "Could not update like status.",
      variant: "destructive",
    });
  }
};
  

   const handleSendRequest = async (userId: string) => {
    try {
      const res = await sendConnectionRequest(userId) as { success: boolean; message?: string };
      if (res.success) {
        setRequestSent(true);
        toast({
          title: "Request Sent",
          description: res.message || "Your request has been sent.",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not send request.",
        variant: "destructive"
      });
    }
  };
  

  const handleLike = async (userId: string) => {
    try {
      const res = await toggleSaveProfile(userId) as { success: boolean; message: string };
      if (res.success) {
        setLikedUsers(prev => [...prev, userId]);
        toast({ title: "Profile Liked!", description: res.message });
      } else {
        setLikedUsers(prev => prev.filter(id => id !== userId));
        toast({ title: "Profile Unliked!", description: res.message });
      }
    } catch {
      toast({ title: "Error", description: "Could not update like status.", variant: "destructive" });
    }
  };

const FetchUserDetails = async (userId: string) => {
  try {
    const res = await fetchProfileDetails(userId);

    if (res) {
      setSelectedUser(res);
      setCurrentScreen('profile-detail');
    } else {
      toast({
        title: "Error",
        description: "Could not fetch user details.",
        variant: "destructive"
      });
    }
  } catch (error) {
    console.error("FetchUserDetails Error:", error);
    toast({
      title: "Error",
      description: "An unexpected error occurred.",
      variant: "destructive"
    });
  }
};
   
  const handleToggleBlock = async (userId: string) => {
  try {
    const res = await toggleBlockUser(userId);
    const result = res as { success: boolean; message: string };

    if (result.success) {
      // User just got blocked
      setBlockedUsers(prev => [...prev, userId]);
      toast({
        title: "User Blocked!",
        description: result.message,
      });
    } else {
      // User just got unblocked
      setBlockedUsers(prev => prev.filter(id => id !== userId));
      toast({
        title: "User Unblocked!",
        description: result.message,
      });
    }
  } catch {
    toast({
      title: "Error",
      description: "Could not update block status.",
      variant: "destructive",
    });
  }
};

  const handleMessage = (userId: string) => {
    console.log('Message user:', userId);
    setActiveTab('chat');
    setCurrentScreen('home');
    toast({
      title: "Opening Chat",
      description: "Redirecting to chat screen.",
    });
  };

  const handleViewProfile = (user: any) => {
    FetchUserDetails(user.id);
    //setSelectedUser(user);
    //setCurrentScreen('profile-detail');
    console.log('View profile:', user.id);
  };

  const handleShowProfileList = (
  title: string,
  users: any[],
  filterType?: 'gender' | 'status',
  filterValue?: string
) => {
  setProfileListData({ title, users });
  setProfileListFilterType(filterType || 'gender');
  setProfileListFilterValue(filterValue || '');
  setCurrentScreen('profile-list');
};

  const handleBlock = async (userId: string) => {
    try {
      const res = await toggleBlockUser(userId);
      const result = res as { success: boolean; message: string };
      if (result.success) {
        setBlockedUsers(prev => [...prev, userId]);
        toast({ title: "User Blocked!", description: result.message });
      } else {
        setBlockedUsers(prev => prev.filter(id => id !== userId));
        toast({ title: "User Unblocked!", description: result.message });
      }
    } catch {
      toast({ title: "Error", description: "Could not update block status.", variant: "destructive" });
    }
  };

  const handleUnblock = (userId: string) => {
    console.log('Unblocked user:', userId);
    toast({
      title: "User Unblocked",
      description: "User has been unblocked successfully.",
    });
  };

  const handleBackToMain = () => {
    setCurrentScreen('home');
  };

const handleAcceptRequest = async (userId: string) => {
  try {
    const res = await respondToRequest(userId, 'accepted') as { success: boolean; message: string };
    toast({
      title: "Request Accepted",
      description: res.message || "You have accepted the connection request.",
    });
    // Optional: refresh state if needed
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to accept the request.",
      variant: "destructive",
    });
  }
};

const handleRejectRequest = async (userId: string) => {
  try {
    const res = await respondToRequest(userId, 'rejected') as { success: boolean; message: string };
    toast({
      title: "Request Rejected",
      description: res.message || "You have rejected the connection request.",
    });
    // Optional: refresh state if needed
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to reject the request.",
      variant: "destructive",
    });
  }
};

  const handleNotifications = () => {
    //setActiveTab('notifications');
    setCurrentScreen('notification');
  };
  const handleOwnProfile = () => {
    setCurrentScreen('own-profile');
  };

  const handleEditProfile = () => {
    setCurrentScreen('edit-profile');
  };

 const handleSaveProfile = async (profileData: any) => {
  try {
    const res = await editUserProfile(profileData);
    const { success, message, user } = res as { success: boolean; message: string, user: any };
    if (!success) {
      throw new Error(message || "Failed to update profile");
    }
    toast({
      title: "Profile Updated",

      description: message || "Your profile has been successfully updated.",
      
    });
    setUser(user);
    setCurrentScreen('own-profile');

  } catch (error) {
    toast({
      title: "Update Failed",
      description: (error as Error).message || "An error occurred while updating your profile.",
      variant: "destructive",
    });
  }
};


  const handleContactUs = () => {
    setCurrentScreen('contact-us');
  };

  const handleAboutUs = () => {
    setCurrentScreen('about-us');
  };

  const handleFAQ = () => {
    setCurrentScreen('faq');
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Account deletion functionality will be implemented soon.",
    });
  };

  const handleShowSearchFilters = () => {
    setCurrentScreen('search-filters');
  };

  const handleApplySearchFilters = (filters: any) => {
    console.log('Applied search filters:', filters);
    toast({
      title: "Filters Applied",
      description: "Search results have been updated based on your filters.",
    });
  };
 
  const handleMembership = () => {
    setCurrentScreen('membership');
  }
const handleSaveProfiles = () => {
    setCurrentScreen('saved-profile');
  }
  const handleBlockedProfiles = () => {
    setCurrentScreen('blocked-profiles');
  }
  const handleSelectPlan = (planId: string, amount: number, title: string) => {
    console.log('Selected plan:', planId, amount, title);
    // Here you would integrate with your payment gateway
    alert(`Payment gateway integration for ${title} - ₹${amount} would be implemented here`);
  };

  const handlePrivacyPolicy = () => {
    setCurrentScreen('privacy-policy');
  };

  const handleTerms = () => {
    setCurrentScreen('terms');
  };

  const handleChildPolicy = () => {
    setCurrentScreen('child-policy');
  };

  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      // push current tab to history before switching
      tabHistoryRef.current.push(activeTab);
    }
    setActiveTab(tabId);
    setCurrentScreen('home'); // Reset to home screen when changing tabs
  };


  const getHeaderTitle = () => {
    if (currentScreen === 'profile-detail') return 'Profile';
    if (currentScreen === 'profile-list') return profileListData.title;
    if (currentScreen === 'own-profile') return 'My Profile';
    if (currentScreen === 'edit-profile') return 'Edit Profile';
    if (currentScreen === 'contact-us') return 'Contact Us';
    if (currentScreen === 'about-us') return 'About Us';
    if (currentScreen === 'faq') return 'FAQ';
    if (currentScreen === 'notification') return 'Notifications';
    if (currentScreen === 'search-filters') return 'Search Filters';
    if (currentScreen === 'membership') return 'Membership Plans';
     if (currentScreen === 'saved-profile') return 'Likes Profiles';
      if (currentScreen === 'blocked-profiles') return 'Blocked Profiles';
    switch (activeTab) {
      case 'home': return 'Umeed';
      case 'search': return 'Search';
     // case 'notifications': return 'Notifications';
      case 'chat': return 'Chat';
      case 'connections': return 'Connections';
      case 'more': return 'More';
      default: return 'Umeed';
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  
  // Show search filters screen
  if (currentScreen === 'search-filters') {
    return (
      <div className="min-h-screen bg-gray-50">
        <SearchFilterScreen
          title='search-filters'
          onBack={handleBackToMain}
           onLike={handleToggleLike}
          onSendRequest={handleSendRequest}
          onViewProfile={handleViewProfile}
          //onApplyFilters={handleApplySearchFilters}


        />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }
  // Show membership plans screen
  if (currentScreen === 'membership') {
    return (  
      <div className="min-h-screen bg-gray-50">
        <MembershipPlans
        onSelectPlan={handleSelectPlan}
        onBack={handleBackToMain}
         />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  if (currentScreen === 'saved-profile') {
    return (  
      <div className="min-h-screen bg-gray-50">
         <ProfileListScreen
        title="Saved Profiles"
        //users={[]}
        onLike={handleToggleLike}
        onViewProfile={handleViewProfile}
        onBack={handleBackToMain}
        filterType="status"
        filterValue={"saveProfile"}
      />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

   if (currentScreen === 'blocked-profiles') {
    return (  
      <div className="min-h-screen bg-gray-50">
         <ProfileListScreen
        title="Blocked Profiles"
        //users={[]}
        onLike={handleToggleLike}
        onUnblock={handleToggleBlock}
        onViewProfile={handleViewProfile}
        onBack={handleBackToMain}
        filterType="status"
        filterValue={"blocked"}
      />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }
  // Show FAQ screen
  if (currentScreen === 'faq') {
    return (
      <div className="min-h-screen bg-gray-50">
        <FAQScreen onBack={handleBackToMain} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  if (currentScreen === 'terms') {
  return (
    <div className="min-h-screen bg-gray-50">
      <TermsAndConditionsScreen onBack={handleBackToMain} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

if (currentScreen === 'privacy-policy') {
  return (
    <div className="min-h-screen bg-gray-50">
      <PrivacyPolicyScreen onBack={handleBackToMain} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

if (currentScreen === 'child-policy') {
  return (
    <div className="min-h-screen bg-gray-50">
      <ChildPolicyScreen onBack={handleBackToMain} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

  // Show about us screen
  if (currentScreen === 'about-us') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AboutUsScreen onBack={handleBackToMain} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    );
  }

  // Show contact us screen
  if (currentScreen === 'contact-us') {
    return (
      <div className="min-h-screen bg-gray-50">
        <ContactUsScreen onBack={handleBackToMain} />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Show edit profile screen
  if (currentScreen === 'edit-profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        <EditProfileScreen
          user={user}
          onSave={handleSaveProfile}
          onBack={() => setCurrentScreen('own-profile')}
        />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Show own profile screen
  if (currentScreen === 'own-profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        <OwnProfileScreen
          user={user}
          onEdit={handleEditProfile}
          onBack={handleBackToMain}
        />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Show profile detail screen
  if (currentScreen === 'profile-detail') {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProfileDetailScreen
          user={selectedUser}
          onLike={handleToggleLike}
          onMessage={handleMessage}
          onBlock={handleToggleBlock}
          onUnblock={handleToggleBlock}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
          onSendRequest={handleSendRequest}
          onBack={handleBackToMain}
          isBlocked={false}
          isConnected={false}
        />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Show profile list screen
  if (currentScreen === 'profile-list') {
    return (
      <div className="min-h-screen bg-gray-50">
       <ProfileListScreen
  title={profileListData.title}
  //users={[]}
  onLike={handleToggleLike}
  onSendRequest={handleSendRequest}
  onViewProfile={handleViewProfile}
  onBack={handleBackToMain}
  filterType={profileListFilterType}
  filterValue={profileListFilterValue}
/>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  if (currentScreen === 'notification') {
    return (
      <div className="min-h-screen bg-gray-50">
        <NotificationScreen
          //user={user}
          onViewProfile={handleViewProfile}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
          onBack={handleBackToMain}

        />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Show main screens
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={getHeaderTitle()}
        showSearch={activeTab === 'search'}
        onProfileClick={handleOwnProfile}
        onNotificationClick={handleNotifications}
        onSearchClick={handleShowSearchFilters}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        notificationCount={notificationCount}
        //onHandleBack={currentScreen !== 'main' ? handleBackToMain : undefined}
     // onBack={handleBackToMain}
      />
      
      <main className="">
        {activeTab === 'home' && (
          <HomeScreen
            onLike={handleToggleLike}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
            onShowProfileList={handleShowProfileList}
           onViewMemberPlan={ handleMembership}
          />
        )}
        {activeTab === 'search' && (
          <SearchScreen
          title='search'
            onLike={handleToggleLike}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
            onSendRequest={handleSendRequest}
           //onShowFilters={handleShowSearchFilters}
          />
        )}
        {/* {activeTab === 'notifications' && (
          <NotificationScreen
            onViewProfile={handleViewProfile}
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
            onBack={handleBackToMain}
          />
        )} */}
        {activeTab === 'chat' && <ChatScreen />}
        {activeTab === 'connections' && <ConnectionsScreen />}
       {activeTab === 'more' && (
  <>
    {showBlockedProfiles || showSavedProfiles ? (
      <ProfileListScreen
        title={showBlockedProfiles ? "Blocked Profiles" : "Saved Profiles"}
       // users={[]}
        onLike={handleToggleLike}
        onMessage={handleMessage}
        onViewProfile={handleViewProfile}
        onBack={() => {
          setShowBlockedProfiles(false);
          setShowSavedProfiles(false);
        }}
        filterType="status"
        filterValue={showBlockedProfiles ? "blocked" : "saveProfile"}
      />
    ) : (
      <MoreScreen
        onContactUs={handleContactUs}
        onAboutUs={handleAboutUs}
        onFAQ={handleFAQ}
        onDeleteAccount={handleDeleteAccount}
        onEditProfile={handleEditProfile}
        onLogout={logout}
        onViewBlockedProfiles={handleBlockedProfiles}
        onViewSavedProfiles={handleSaveProfiles}
        onViewMemberPlan={ handleMembership}
                    onPrivacyPolicy={handlePrivacyPolicy}
                    onTermsAndConditions={handleTerms}
                    onChildPolicy={handleChildPolicy}
      />
    )}
  </>
)}


      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;

