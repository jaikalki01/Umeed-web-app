import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCard from '../Home/ProfileCard';
// import Header from '../Layout/Header';
import { fetchRecommended, fetchNearby, fetchNewProfile } from '@/helpers/apiHelper';
import { mockUsers } from '../../data/mockData';
import { useBackButtonHandler } from '@/components/useBackButtonHandler';

interface SearchScreenProps {
  title?: string;
  onLike: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onViewProfile: (user: any) => void;
  onSendRequest?: (userId: string) => void;
}


const PAGE_SIZE = 10;

const SearchScreen = ({ title, onSendRequest, onLike, onMessage, onViewProfile }: SearchScreenProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Back button handler for mobile
  useBackButtonHandler("/"); // "/" is your home path

  // Get initial tab from URL or default
  const initialTab = (searchParams.get('tab') as 'recommended' | 'nearby' | 'new') || 'recommended';
  const [activeTab, setActiveTab] = useState<'recommended' | 'nearby' | 'new'>(initialTab);

  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Reset when tab changes
  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [activeTab]);

  // Fetch data
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (activeTab === 'recommended') data = await fetchRecommended(page, PAGE_SIZE);
        else if (activeTab === 'nearby') data = await fetchNearby(page, PAGE_SIZE);
        else data = await fetchNewProfile(page, PAGE_SIZE);

        if (isMounted) {
          setUsers(prev => page === 1 ? data.users : [...prev, ...data.users]);
          setHasMore(data.has_next);
        }
      } catch {
        if (isMounted) setHasMore(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [activeTab, page]);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle tab change & keep in URL for refresh-safe
  const handleTabChange = (tab: 'recommended' | 'nearby' | 'new') => {
    setActiveTab(tab);
    setSearchParams({ tab }); // saves current tab in URL
  };

  // Remember scroll position per tab
  useEffect(() => {
    const scrollY = sessionStorage.getItem(`scroll-${activeTab}`);
    if (scrollY) window.scrollTo(0, parseInt(scrollY));
  }, [activeTab]);

  useEffect(() => {
    return () => {
      sessionStorage.setItem(`scroll-${activeTab}`, window.scrollY.toString());
    };
  }, [activeTab]);

  const renderProfiles = (profiles: typeof mockUsers) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 min-h-[50vh]">
      {profiles.map(user => (
        <ProfileCard
          title={title}
          key={user.id}
          user={user}
          onLike={onLike}
          onSendRequest={onSendRequest}
          onViewProfile={() => onViewProfile(user)}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header activeTab="search" showSearch onSearchClick={() => console.log('search click')} /> */}

      <main className="flex-1 pb-20">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList
  className="
    flex sm:grid sm:grid-cols-3 
    overflow-x-auto sm:overflow-visible
    gap-2 sm:gap-0
    mx-2 sm:mx-4 mb-4
    no-scrollbar mt-[5px]
  "
>
  <TabsTrigger
    value="recommended"
    className="min-w-[100px] sm:min-w-0 text-xs sm:text-sm px-4 py-2"
  >
    Recommended
  </TabsTrigger>
  <TabsTrigger
    value="nearby"
    className="min-w-[100px] sm:min-w-0 text-xs sm:text-sm px-4 py-2"
  >
    Nearby
  </TabsTrigger>
  <TabsTrigger
    value="new"
    className="min-w-[100px] sm:min-w-0 text-xs sm:text-sm px-4 py-2"
  >
    New
  </TabsTrigger>
</TabsList>


          <TabsContent value="recommended">
            <div className="px-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recommended for You</h2>
              <p className="text-sm text-gray-600">Profiles matched based on your preferences</p>
            </div>
            {renderProfiles(users)}
            {loading && <div className="text-center py-4 text-gray-500">Loading...</div>}
            {!hasMore && users.length > 0 && <div className="text-center py-4 text-gray-400">No more profiles</div>}
          </TabsContent>

          <TabsContent value="nearby">
            <div className="px-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Nearby Profiles</h2>
              <p className="text-sm text-gray-600">Profiles in your area</p>
            </div>
            {renderProfiles(users)}
            {loading && <div className="text-center py-4 text-gray-500">Loading...</div>}
            {!hasMore && users.length > 0 && <div className="text-center py-4 text-gray-400">No more profiles</div>}
          </TabsContent>

          <TabsContent value="new">
            <div className="px-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">New Profiles</h2>
              <p className="text-sm text-gray-600">Recently joined members</p>
            </div>
            {renderProfiles(users)}
            {loading && <div className="text-center py-4 text-gray-500">Loading...</div>}
            {!hasMore && users.length > 0 && <div className="text-center py-4 text-gray-400">No more profiles</div>}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SearchScreen;
