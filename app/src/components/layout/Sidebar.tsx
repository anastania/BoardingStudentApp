
import {
  LayoutDashboard,
  User,
  Search,
  Map,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
} from 'lucide-react';
import patternBg from '@/assets/pattern-bg.png';
import logo from '@/assets/logo.jpg';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AppView } from '@/App';
import { mockNotifications } from '@/data/mockData';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems: { id: AppView; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'matching', label: 'Opportunities', icon: Search },
  { id: 'journey', label: 'My Journey', icon: Map },
  { id: 'support', label: 'Support Hub', icon: MessageSquare },
];

export function Sidebar({ currentView, onNavigate, isCollapsed, onToggle }: SidebarProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <aside
      className={`
        hidden lg:flex fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex-col z-40 transition-all duration-300 overflow-hidden
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none z-0"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Logo and Toggle */}
      <div className={`px-2 py-4 relative z-10 ${isCollapsed ? 'flex justify-center items-center' : 'flex items-center justify-between'}`}>
        {!isCollapsed && (
          <div className="flex-1 flex justify-center">
            <img
              src={logo}
              alt="Boarding Logo"
              className="object-contain h-20 w-auto max-w-[200px] transition-all duration-300"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-300 flex-shrink-0"
        >
          <Menu className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-90'}`} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative group
                ${isActive
                  ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
                ${isCollapsed ? 'justify-center' : 'text-left'}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-slate-500'}`} />

              {!isCollapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.id === 'dashboard' && unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs px-2 py-0.5">
                      {unreadCount}
                    </Badge>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                </>
              )}

              {isCollapsed && item.id === 'dashboard' && unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-100 relative z-10">
        <div className={`bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-3 mb-4 ${isCollapsed ? 'text-center' : ''}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center mb-0' : 'mb-3'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">ER</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-slate-900 text-sm truncate">Emma Rodriguez</p>
                <p className="text-xs text-slate-500 truncate">emma.rodriguez@uni.edu</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white rounded-lg px-2 py-1.5 text-center">
                <p className="text-xs text-slate-500">Profile</p>
                <p className="text-sm font-semibold text-green-600">85%</p>
              </div>
              <div className="flex-1 bg-white rounded-lg px-2 py-1.5 text-center">
                <p className="text-xs text-slate-500">Progress</p>
                <p className="text-sm font-semibold text-primary">45%</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <Button variant="ghost" size="sm" className={`w-full text-slate-600 ${isCollapsed ? 'justify-center px-0' : 'justify-start gap-2'}`}>
            <Settings className="w-4 h-4" />
            {!isCollapsed && "Settings"}
          </Button>
          <Button variant="ghost" size="sm" className={`w-full text-slate-600 hover:text-red-600 ${isCollapsed ? 'justify-center px-0' : 'justify-start gap-2'}`}>
            <LogOut className="w-4 h-4" />
            {!isCollapsed && "Sign Out"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
