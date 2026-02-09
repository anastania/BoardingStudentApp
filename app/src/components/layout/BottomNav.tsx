import {
  LayoutDashboard,
  User,
  Search,
  Map,
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { AppView } from '@/App';
import { mockNotifications } from '@/data/mockData';

interface BottomNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const navItems: { id: AppView; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'matching', label: 'Jobs', icon: Search },
  { id: 'journey', label: 'Journey', icon: Map },
  { id: 'support', label: 'Support', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[64px]
                ${isActive
                  ? 'text-primary'
                  : 'text-slate-500'
                }
              `}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-500'}`} />
                {item.id === 'dashboard' && unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 text-[10px] h-4 w-4 flex items-center justify-center p-0"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
