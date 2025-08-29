import {
   Bell,
  Filter,
  User,
  Home,
  Users,
  MessageCircle,
  UserCheck,
  Settings,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Import images from public folder - use direct paths for Vite

import umeednav from '/public/img/umeed-nav.gif';
import bannerm from '/public/img/banner-m.png';
import logo from '/public/img/logo.png';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  notificationCount?: number;
}

const Header = ({
  title,
  showSearch = false,
  onSearchClick,
  onNotificationClick,
  onProfileClick,
  activeTab = "home",
  onTabChange,
  className,
  notificationCount = 0,
}: HeaderProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home', },
    { id: 'search', icon: Users, label: 'Search' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'connections', icon: UserCheck, label: 'Connections' },
    { id: 'more', icon: Settings, label: 'More' },
  ];

  const handleTabClick = (tabId: string) => {
    if (onTabChange) onTabChange(tabId);
  };

  return (
    <header className={cn("relative bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 text-white shadow-lg sticky top-0 z-50")}>
      <div className="flex items-center justify-between container px-[20px] py-[20px]">
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="block ">
            <img
              src={logo}
              alt="Umeed Logo"
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right: Buttons + Hamburger */}
        <div className="flex items-center space-x-2">
          {showSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSearchClick}
              className="text-white hover:bg-white/20"
            >
              {/* <Filter className="w-5 h-5" /> */}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onProfileClick}
            className="text-white hover:bg-white/20"
          >
            <User className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationClick}
            className="text-white hover:bg-white/20 relative"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold border-2 border-white z-10 shadow-lg">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </Button>

          {/* Desktop-Only Dropdown Menu */}
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="end"
                className="bg-white shadow-md text-gray-800"
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <DropdownMenuItem
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex items-center gap-2 rounded-md transition-all ${
                        isActive
                          ? "text-purple-600 font-semibold bg-purple-50 cursor-pointer"
                          : "hover:bg-purple-50 cursor-pointer"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Decorative Background */}
      <img
        src={umeednav}
        alt="Decorative Header Background"
        className="absolute bottom-0 left-0 h-full w-full object-contain opacity-100 pointer-events-none hidden md:block"
      />
      <img
        src={bannerm}
        alt="Decorative Header Background"
        className="absolute bottom-0 left-0 h-full w-full object-contain opacity-100 pointer-events-none block md:hidden"
      />
    </header>
  );
};

export default Header;