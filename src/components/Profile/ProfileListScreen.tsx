import { useEffect, useRef, useState, useCallback } from 'react';
import { User } from '../../types';
import ProfileCard from '../Home/ProfileCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { fetchUsersByGender, fetchUsersByStatus } from '@/helpers/apiHelper';
import BottomNav from '../Layout/BottomNav'; 

interface ProfileListScreenProps {
  title?: string;
  onLike: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onSendRequest?: (userId: string) => void;
  onUnblock?: (userId: string) => void;
  onAcceptRequest?: (userId: string) => void;
  onRejectRequest?: (userId: string) => void;
  onViewProfile: (user: User) => void;
  onBack: () => void;
  filterType?: 'gender' | 'status';
  filterValue?: string;
}

const PAGE_SIZE = 10;

const ProfileListScreen = ({
  title,
  onLike,
  onMessage,
  onUnblock,
  onAcceptRequest,
  onRejectRequest,
  onSendRequest,
  onViewProfile,
  onBack,
  filterType = 'gender',
  filterValue = '',
}: ProfileListScreenProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset when filters change
  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
    setTotal(0);
  }, [filterType, filterValue]);

  // Fetch users
  useEffect(() => {
    let isMounted = true;

    interface FetchUsersResult {
      users?: User[];
      has_next?: boolean;
      total?: number;
      [key: string]: any;
    }

    const fetchPage = async () => {
      setLoading(true);
      setError(null);

      try {
        const result: FetchUsersResult =
          filterType === 'gender'
            ? await fetchUsersByGender(filterValue, page, PAGE_SIZE)
            : await fetchUsersByStatus(filterValue, page, PAGE_SIZE);

        if (result && typeof result === 'object') {
          const newUsers = Array.isArray(result.users) ? result.users : [];

          if (isMounted) {
            setUsers(prev => (page === 1 ? newUsers : [...prev, ...newUsers]));
            setHasMore(result.has_next === true);
            setTotal(result.total || 0);
          }
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('Failed to load profiles. Please try again.');
          setHasMore(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPage();

    return () => {
      isMounted = false;
    };
  }, [page, filterType, filterValue]);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="pb-20"
      ref={containerRef}
      style={{ height: '100vh', overflowY: 'auto' }}
    >
      {/* Header */}
      <div
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg z-10"
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
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-sm opacity-90">{total} profiles</p>
          </div>
        </div>
      </div>

      {/* Content */}
      {error ? (
        <div className="p-4 text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={() => setPage(1)}>Retry</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
            {users.map(user => (
              <ProfileCard
                title={title}
                key={user.id}
                user={user}
                onLike={onLike}
                onMessage={onMessage}
                onSendRequest={onSendRequest}
                onUnblock={onUnblock}
                onAcceptRequest={onAcceptRequest}
                onRejectRequest={onRejectRequest}
                onViewProfile={() => onViewProfile(user)}
              />
            ))}
          </div>

          {loading && (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          )}

          {!hasMore && users.length >= total && total > 0 && (
            <div className="text-center py-4 text-gray-400">No more profiles</div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileListScreen;