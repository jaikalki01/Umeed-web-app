import { useState, useEffect } from 'react';
import { fetchUsersByGender, fetchGenderCounts, fetchUsersByStatus } from '@/helpers/apiHelper';
import { GENDER_OPTIONS } from '../../types';
import GenderButton from './GenderButton';
import ProfileCard from './ProfileCard';
import { Button } from '@/components/ui/button';
import { Crown, MessageCircle, Zap } from 'lucide-react';
import { User } from '../../types';
import CountUp from 'react-countup';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images from public folder - use direct paths for Vite

import banner1m from '/public/img/banner-1-m.jpg';  
import banner2m from '/public/img/banner-2-m.jpg';  
import banner1 from '/public/img/banner-1.jpg';  
import banner2 from '/public/img/banner-2.jpg';  
import umeed1 from '/public/img/umeed-1.png';


const PAGE_SIZE = 10;

interface HomeScreenProps {
  onLike: (userId: string) => void;
  onMessage: (userId: string) => void;
  onViewProfile: (userId: string) => void;
  onShowProfileList?: (
    title: string,
    users: User[],
    filterType?: 'gender' | 'status',
    filterValue?: string
  ) => void;
  onViewMemberPlan: () => void;
}

const HomeScreen = ({
  onLike,
  onMessage,
  onViewProfile,
  onShowProfileList,
  onViewMemberPlan,
}: HomeScreenProps) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [genderCounts, setGenderCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const banners = [
    { mobileImage: banner1m, desktopImage: banner1 },
    { mobileImage: banner2m, desktopImage: banner2 },
  ];

  useEffect(() => {
    fetchGenderCounts()
      .then(setGenderCounts)
      .catch(() => setGenderCounts({}));
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        let data: User[] = [];
        if (selectedGender) {
          const response = await fetchUsersByGender(selectedGender, 1, PAGE_SIZE) as { users: User[] };
          data = Array.isArray(response.users) ? response.users : [];
        } else {
          const response = await fetchUsersByStatus('exclusive', 1, PAGE_SIZE) as { users: User[] };
          data = Array.isArray(response.users) ? response.users : [];
        }
        if (isMounted) {
          setUsers(data);
        }
      } catch {
        if (isMounted) setUsers([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [selectedGender]);

  const openGenderList = (gender: string) => {
    onShowProfileList?.(`${gender} Profiles`, [], 'gender', gender);
  };

  const openStatusList = (status: string) => {
    const titles: Record<string, string> = {
      online: 'Online Users',
      active: 'Active Users',
      paid: 'Paid Users',
      exclusive: 'Exclusive Users',
    };
    onShowProfileList?.(titles[status] || 'Users', [], 'status', status);
  };

  return (
    <div>
      <div className="backdrop-blur-sm bg-white/90">

        {/* ✅ Banner */}
        <div className="relative mb-[60px]">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
          >
            {banners.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <picture>
                  <source
                    srcSet={banner.desktopImage}
                    media="(min-width: 768px)"
                  />
                  <img
                    src={banner.mobileImage}
                    alt={`Banner ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <img
          src={umeed1}
          alt="Decorative"
          className="absolute left-2 w-[100px] h-[100px] sm:w-[150px] sm:h-[250px] md:w-[250px] md:h-[250px] opacity-40"
        />

        {/* ✅ Gender */}
        <div className="mb-[100px] relative">
          <h3 className="text-[32px] font-semibold mb-[40px] px-4 text-center">
            Browse by Gender
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 relative z-[99]">
            {["All", ...Object.keys(GENDER_OPTIONS)].map((gender) => (
              <GenderButton
                key={gender}
                gender={gender}
                count={genderCounts[gender] || 0}
                onClick={openGenderList}
              />
            ))}
          </div>

          <img
            src={umeed1}
            alt="Decorative"
            className="absolute right-2 bottom-[-100px] w-[100px] h-[100px] sm:w-[150px] sm:h-[250px] md:w-[250px] md:h-[250px] opacity-40"
          />
        </div>

        {/* ✅ Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-6 px-4 text-white container mx-auto mb-[100px] py-[50px] px-0">
          {['online', 'active', 'paid', 'exclusive'].map((status) => (
            <div
              key={status}
              onClick={() => openStatusList(status)}
              className="from-gray-900 to-gray-800 text-center rounded-lg cursor-pointer"
            >
              <div className="text-4xl text-[#7f32ce]">
                +<CountUp end={genderCounts[status] || 0} duration={2} start={0} />
              </div>
              <div className="mt-2 text-[#000] font-medium capitalize">{status}</div>
            </div>
          ))}
        </div>

           <img
          src={umeed1}
          alt="Decorative"
          className="absolute left-2 w-[100px] h-[100px] sm:w-[150px] sm:h-[250px] md:w-[250px] md:h-[250px] opacity-40 bottom-[440px] md:bottom-[270px]"
        />

        {/* ✅ Membership */}
        <div className="bg-gradient-to-r from-red-400 via-yellow-400 to-purple-500 pt-[100px] pb-[100px] px-[20px] relative">
        <div className="bg-white rounded-lg shadow-md border p-6 max-w-3xl mx-auto">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Crown className="w-5 h-5 text-purple-600" />
              Upgrade Your Experience
            </h3>
            <p className="text-sm text-gray-600">
              Unlock unlimited chats, video calls, and premium features
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700 border border-gray-200 px-2 py-1 rounded">
              <MessageCircle className="w-4 h-4 text-purple-600" />
              Unlimited Chats
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700 border border-gray-200 px-2 py-1 rounded">
              <Zap className="w-4 h-4 text-purple-600" />
              Video Calls
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700 border border-gray-200 px-2 py-1 rounded">
              <Crown className="w-4 h-4 text-purple-600" />
              Pride Badge
            </div>
          </div>

          <Button
            onClick={onViewMemberPlan}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 rounded shadow"
          >
            <Crown className="w-4 h-4 mr-2" />
            View Membership Plans
          </Button>
        </div>
        </div>

        {/* ✅ Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {users.map((user) => (
            <ProfileCard
              key={user.id}
              user={user}
              onLike={onLike}
              onMessage={onMessage}
              onViewProfile={() => onViewProfile(user.id)}
            />
          ))}
        </div>

        {loading && <div className="text-center py-4 text-gray-500">Loading...</div>}
      </div>
    </div>
  );
};

export default HomeScreen;
