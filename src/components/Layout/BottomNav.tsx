import {
  Home,
  MessageCircle,
  Users,
  UserCheck,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Users, label: 'Search' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'connections', icon: UserCheck, label: 'Connections' },
    { id: 'more', icon: Settings, label: 'More' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2 shadow-md md:hidden"
    >
      {/* md:hidden ensures it only shows on mobile/small screens */}
      <div className="flex justify-between items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="default"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-3 flex-1 rounded-md transition-all ${
                isActive
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[12px] leading-none">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
