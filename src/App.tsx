import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatPage from "@/components/Chat/ChatScreen";
import ConnectionsPage from "@/components/Connections/ConnectionsScreen";
import MoreScreen from "@/components/More/MoreScreen";
import SearchScreen from "@/components/Search/SearchScreen";

const queryClient = new QueryClient();




const App = () => {
  // Dummy handler functions for MoreScreen
  const handleContactUs = () => alert("Contact Us");
  const handleAboutUs = () => alert("About Us");
  const handleFAQ = () => alert("FAQ");
  const handleTerms = () => alert('terms');
  const handlePrivacyPolicy = () => alert('privacy-policy');
  const handleChildPolicy = () => alert('child-policy');
  const handleDeleteAccount = () => alert("Delete Account");
  const handleEditProfile = () => alert("Edit Profile");
  const handleLogout = () => alert("Logout");
  const handleViewBlockedProfiles = () => alert("View Blocked Profiles");
  const handleViewSavedProfiles = () => alert("View Saved Profiles");
  const handleViewMemberPlan = () => alert("View Membership Plans");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />

        <Sonner />
        <AuthProvider>
          <BrowserRouter>

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/connections" element={<ConnectionsPage />} />
              <Route
                path="/search"
                element={
                  <SearchScreen
                    onLike={(userId) => console.log("Liked", userId)}
                    onMessage={(userId) => console.log("Message", userId)}
                    onViewProfile={(user) => console.log("View Profile", user)}
                  />
                }
              />



              <Route
                path="/more"
                element={
                  <MoreScreen
                    onContactUs={handleContactUs}
                    onAboutUs={handleAboutUs}
                    onFAQ={handleFAQ}
                    onPrivacyPolicy={handlePrivacyPolicy}
                    onTermsAndConditions={handleTerms}
                    onChildPolicy={handleChildPolicy}
                    onDeleteAccount={handleDeleteAccount}
                    onEditProfile={handleEditProfile}
                    onLogout={handleLogout}
                    onViewBlockedProfiles={handleViewBlockedProfiles}
                    onViewSavedProfiles={handleViewSavedProfiles}
                    onViewMemberPlan={handleViewMemberPlan}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
