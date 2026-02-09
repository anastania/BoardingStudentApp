import { useState } from 'react';
import logo from '@/assets/logo.jpg';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Dashboard } from '@/sections/Dashboard';
import { Profile } from '@/sections/Profile';
import { Matching } from '@/sections/Matching';
import { Journey } from '@/sections/Journey';
import { Support } from '@/sections/Support';
import { Toaster } from '@/components/ui/sonner';
import { Login } from '@/sections/Login';

export type AppView = 'dashboard' | 'profile' | 'matching' | 'journey' | 'support';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'profile':
        return <Profile />;
      case 'matching':
        return <Matching />;
      case 'journey':
        return <Journey />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <>
          {/* Desktop Sidebar */}
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          {/* Main Content */}
          <main
            className={`
              flex-1 flex flex-col min-h-screen pb-20 lg:pb-0 transition-all duration-300
              ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
            `}
          >
            {/* Desktop Navbar */}
            <Navbar currentView={currentView} onNavigate={setCurrentView} />

            {/* Header - Mobile Only */}
            <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Boarding Logo" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-semibold text-slate-900">Boarding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-slate-600">ER</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <div className="flex-1 overflow-auto">
              {renderView()}
            </div>
          </main>

          {/* Mobile Bottom Navigation */}
          <BottomNav currentView={currentView} onNavigate={setCurrentView} />
        </>
      )}

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
