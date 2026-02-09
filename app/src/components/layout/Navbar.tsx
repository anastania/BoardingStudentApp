import {
    LayoutDashboard,
    User,
    Search,
    Map,
    MessageSquare,
    Bell
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AppView } from '@/App';
import { mockNotifications } from '@/data/mockData';

interface NavbarProps {
    currentView: AppView;
    onNavigate: (view: AppView) => void;
}

const navItems: { id: AppView; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'matching', label: 'Opportunities', icon: Search },
    { id: 'journey', label: 'My Journey', icon: Map },
    { id: 'support', label: 'Support Hub', icon: MessageSquare },
];

export function Navbar({ currentView, onNavigate }: NavbarProps) {
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return (
        <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-3 sticky top-0 z-30 items-center justify-between">


            <nav className="flex items-center gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;

                    return (
                        <Button
                            key={item.id}
                            variant={isActive ? "secondary" : "ghost"}
                            className={`gap-2 ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-600'}`}
                            onClick={() => onNavigate(item.id)}
                        >
                            <Icon className="w-4 h-4" />
                            {item.label}
                            {item.id === 'dashboard' && unreadCount > 0 && (
                                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                                    {unreadCount}
                                </Badge>
                            )}
                        </Button>
                    );
                })}
            </nav>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-slate-500" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                </Button>
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">ER</span>
                    </div>
                    <div className="text-sm">
                        <p className="font-medium text-slate-900 leading-none">Emma R.</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
