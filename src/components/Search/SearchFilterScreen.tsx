
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Filter, Loader2 } from 'lucide-react';
import ProfileCard  from '@/components/Home/ProfileCard';
import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect } from 'react';
//import { useEffect } from 'react';
import { BASE_URL } from '@/config';
import { GENDER_OPTIONS } from '../../types';
import api from "@/helpers/api";
import { title } from 'process';
interface SearchFilterScreenProps {
  title?:string;
  onBack: () => void;
  //onApplyFilters: (filters: any) => void;
   onLike: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onSendRequest?: (userId: string) => void;
  onViewProfile: (userId: string) => void;
}


const SearchFilterScreen = ({title, onBack, onLike, onMessage, onViewProfile,onSendRequest }: SearchFilterScreenProps) => {
  
   const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    userId: '',
    minAge: 18,
    maxAge: 65,
    location: '',
    genders: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

 const fetchProfiles = useCallback(async (reset = false) => {
  if (loading || loadingMore) return;

  try {
    setError(null);
    const currentOffset = reset ? 0 : offset;

    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    // Build query params
    const params = new URLSearchParams({
      limit: '10',
      offset: currentOffset.toString(),
    });

    if (filters.userId) params.append('user_id', filters.userId);
    if (filters.minAge) params.append('min_age', filters.minAge.toString());
    if (filters.maxAge) params.append('max_age', filters.maxAge.toString());
    if (filters.location) params.append('location', filters.location);
    if (filters.genders.length > 0) params.append('genders', filters.genders.join(','));

    const response = await api.get(`/users/profiles?${params.toString()}`) as { data: { users: any[] } };
    const data = response.data.users;


    if (reset) {
      setUsers(data);
    } else {
      setUsers(prev => [...prev, ...data]);
    }

    setHasMore(data.length === 10);
    setOffset(currentOffset + data.length);
  } catch (err) {
    setError('Failed to load profiles. Please try again later.');
    console.error('Error fetching profiles:', err);
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
}, [filters, offset, loading, loadingMore]);


  // Apply filters and reset pagination
  const applyFilters = useCallback((newFilters: any) => {
    setFilters({
      userId: newFilters.userId || '',
      minAge: newFilters.ageRange[0],
      maxAge: newFilters.ageRange[1],
      location: newFilters.location || '',
      genders: Object.keys(newFilters.genders).filter(g => newFilters.genders[g]),
    });
    setShowFilters(false);
  }, []);

  // Load more profiles when scrolled to bottom
  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      setLoadingMore(true);
      fetchProfiles();
    }
  }, [inView, hasMore, loadingMore, fetchProfiles]);

  // Initial load
  useEffect(() => {
    fetchProfiles(true);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
          
          </Button>
          <h1 className="text-xl font-bold">Discover Profiles</h1>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
             onClick={() => {
    setShowFilters(prev => !prev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
  <div className="p-4 space-y-4 bg-white shadow-md">
    {/* User ID Filter */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-purple-600">User ID</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter User ID"
          value={filters.userId}
          onChange={(e) => setFilters(prev => ({ ...prev, userId: e.target.value }))}
        />
      </CardContent>
    </Card>

    {/* Age Range Filter */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-purple-600">Age Range</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filters.minAge} years</span>
            <span>{filters.maxAge} years</span>
          </div>
          <Slider
            value={[filters.minAge, filters.maxAge]}
            onValueChange={(value) => setFilters(prev => ({
              ...prev,
              minAge: value[0],
              maxAge: value[1]
            }))}
            min={18}
            max={80}
            step={1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>

    {/* Location Filter */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-purple-600">Location</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter city, state, or country"
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        />
      </CardContent>
    </Card>

    {/* Gender Filter */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-purple-600">Gender</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.keys(GENDER_OPTIONS).map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={gender}
                checked={filters.genders.includes(gender)}
                onCheckedChange={(checked) => {
                  setFilters(prev => ({
                    ...prev,
                    genders: checked
                      ? [...prev.genders, gender]
                      : prev.genders.filter(g => g !== gender)
                  }));
                }}
              />
              <label htmlFor={gender} className="text-sm font-medium capitalize">{gender}</label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Actions */}
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() => {
          setFilters({
            userId: '',
            minAge: 18,
            maxAge: 65,
            location: '',
            genders: [],
          });
        }}
      >
        Clear
      </Button>
      <Button
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        onClick={() => setShowFilters(false)}
      >
        Apply Filters
      </Button>
    </div>
  </div>
)}


      {/* Profiles Grid */}
      <div className="p-4">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
        
       <div className="grid grid-cols-1 md: lg:grid-cols-3 gap-4 px-4 min-h-[50vh]">
        {users.map((user) => (
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
        
        {/* Loading indicator at the bottom */}
        <div ref={ref} className="text-center py-6">
          {loadingMore ? (
            <div className="flex justify-center items-center">
              <Loader2 className="w-6 h-6 mr-2 animate-spin text-purple-600" />
              <span className="text-gray-600">Loading more profiles...</span>
            </div>
          ) : hasMore ? (
            <Button 
              variant="outline"
              onClick={() => fetchProfiles()}
            >
              Load More
            </Button>
          ) : (
            <p className="text-gray-500">No more profiles to show</p>
          )}
        </div>
        
        {loading && users.length === 0 && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-purple-600" />
            <p className="mt-2 text-gray-600">Loading profiles...</p>
          </div>
        )}
        
        {!loading && users.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No profiles found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search filters
            </p>
            <Button 
              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Adjust Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterScreen;




