import { useState, useEffect } from 'react';
import {
  Briefcase,
  Heart,
  Calendar,
  Bell,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  MessageSquare,
  Search,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { AppView } from '@/App';
import {
  mockDashboardStats,
  mockNotifications,
  mockStudentOpportunities,
  mockAppointments,
  mockJourney
} from '@/data/mockData';
import patternBg from '@/assets/pattern-bg.png';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  
  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = mockDashboardStats;
  const recentNotifications = mockNotifications.slice(0, 3);
  const savedOpps = mockStudentOpportunities.filter(so => so.status === 'saved');
  const upcomingAppointment = mockAppointments.find(a => a.status === 'scheduled');
  const currentStep = mockJourney.steps.find(s => s.status === 'current');

  if (loading) {
    return (
      <div className="p-4 lg:p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Welcome back, Emma!
            </h1>
            <p className="text-slate-600 mt-1">
              Here's what's happening with your internship journey
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => onNavigate('matching')}
            >
              <Search className="w-4 h-4" />
              Browse Jobs
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => onNavigate('journey')}
            >
              <MapPin className="w-4 h-4" />
              View Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-primary font-medium">Profile Complete</p>
                <p className="text-2xl font-bold text-primary mt-1">{stats.profileCompletion}%</p>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
            </div>
            <Progress value={stats.profileCompletion} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-rose-700 font-medium">Saved Jobs</p>
                <p className="text-2xl font-bold text-rose-900 mt-1">{stats.savedOpportunities}</p>
              </div>
              <div className="w-10 h-10 bg-rose-200 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-700" />
              </div>
            </div>
            <p className="text-xs text-rose-600 mt-3">Opportunities you're interested in</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">Applied</p>
                <p className="text-2xl font-bold text-amber-900 mt-1">{stats.appliedOpportunities}</p>
              </div>
              <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-amber-700" />
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-3">Applications submitted</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">Interviews</p>
                <p className="text-2xl font-bold text-emerald-900 mt-1">{stats.upcomingInterviews}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-200 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-700" />
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-3">Upcoming interviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Journey Stage */}
          <Card className="relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `url(${patternBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Your Journey Progress
                </CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {stats.overallProgress}% Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{stats.overallProgress}%</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Current Stage: {currentStep?.title}</p>
                    <p className="text-sm text-slate-600">{currentStep?.description}</p>
                  </div>
                </div>
                <Progress value={stats.overallProgress} className="h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Profile</span>
                  <span className="text-slate-500">Matching</span>
                  <span className="text-primary font-medium">Interviews</span>
                  <span className="text-slate-500">Placement</span>
                  <span className="text-slate-500">Departure</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Opportunities */}
          <Card className="relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `url(${patternBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Saved Opportunities
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-primary"
                  onClick={() => onNavigate('matching')}
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {savedOpps.length > 0 ? (
                <div className="space-y-3">
                  {savedOpps.map((so) => (
                    <div
                      key={so.id}
                      className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      onClick={() => onNavigate('matching')}
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={so.opportunity.company.logo} />
                        <AvatarFallback>{so.opportunity.company.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">{so.opportunity.title}</p>
                        <p className="text-sm text-slate-600 truncate">{so.opportunity.company.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {so.opportunity.company.location}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {so.opportunity.stipend.amount} {so.opportunity.stipend.currency}/{so.opportunity.stipend.period}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Apply</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600">No saved opportunities yet</p>
                  <Button
                    variant="outline"
                    className="mt-3"
                    onClick={() => onNavigate('matching')}
                  >
                    Browse Jobs
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Upcoming Appointment */}
          <Card className="relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `url(${patternBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              {upcomingAppointment ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={upcomingAppointment.advisorAvatar} />
                      <AvatarFallback>{upcomingAppointment.advisorName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{upcomingAppointment.advisorName}</p>
                      <p className="text-sm text-slate-600">Career Advisor</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700">
                        {new Date(upcomingAppointment.scheduledAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700">
                        {new Date(upcomingAppointment.scheduledAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 capitalize">{upcomingAppointment.type} Call</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => onNavigate('support')}
                  >
                    Join Meeting
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-600 text-sm">No upcoming appointments</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => onNavigate('support')}
                  >
                    Book Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card className="relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `url(${patternBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-600" />
                  Notifications
                </CardTitle>
                {stats.unreadNotifications > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {stats.unreadNotifications} new
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3">
                {recentNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-xl text-sm ${notif.read ? 'bg-slate-50' : 'bg-blue-50 border border-blue-100'}`}
                  >
                    <p className={`font-medium ${notif.read ? 'text-slate-700' : 'text-blue-900'}`}>
                      {notif.title}
                    </p>
                    <p className={`mt-1 ${notif.read ? 'text-slate-500' : 'text-blue-700'}`}>
                      {notif.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 text-slate-600"
              >
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
