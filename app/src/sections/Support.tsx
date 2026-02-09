import { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  ChevronRight,
  FileText,
  Home,
  MapPin,
  Briefcase,
  CheckSquare,
  Search,
  BookOpen,
  Download,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { mockAppointments, mockResources, mockConversations } from '@/data/mockData';
import type { Appointment, Resource } from '@/types';
import patternBg from '@/assets/pattern-bg.png';

const categoryIcons: Record<Resource['category'], React.ElementType> = {
  housing: Home,
  visa: FileText,
  local_life: MapPin,
  career: Briefcase,
  preparation: CheckSquare,
};

const categoryColors: Record<Resource['category'], string> = {
  housing: 'bg-amber-100 text-amber-700',
  visa: 'bg-primary/10 text-primary',
  local_life: 'bg-emerald-100 text-emerald-700',
  career: 'bg-purple-100 text-purple-700',
  preparation: 'bg-rose-100 text-rose-700',
};

export function Support() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'date' | 'time' | 'confirm'>('date');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const upcomingAppointments = mockAppointments.filter(a => a.status === 'scheduled');
  const pastAppointments = mockAppointments.filter(a => a.status === 'completed');

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookAppointment = () => {
    toast.success('Appointment booked successfully!');
    setShowBookingDialog(false);
    setBookingStep('date');
    setSelectedTimeSlot(null);
  };

  const getAppointmentTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto relative overflow-hidden min-h-screen">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none -z-10"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Support Hub</h1>
        <p className="text-slate-600 mt-1">
          Book appointments with advisors and access helpful resources
        </p>
      </div>

      <Tabs defaultValue="advising" className="space-y-6 relative z-10">
        <TabsList>
          <TabsTrigger value="advising">Advising</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Advising Tab */}
        <TabsContent value="advising" className="space-y-6">
          {/* Book Appointment Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">Book an Appointment</h3>
                    <p className="text-slate-600">Schedule a call with your career advisor</p>
                  </div>
                </div>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowBookingDialog(true)}
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Appointments
            </h3>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={appointment.advisorAvatar}
                          alt={appointment.advisorName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900">{appointment.advisorName}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {getAppointmentTypeIcon(appointment.type)}
                              <span className="ml-1 capitalize">{appointment.type}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{appointment.notes}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(appointment.scheduledAt).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(appointment.scheduledAt).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            <span>{appointment.duration} min</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Join
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-50">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600">No upcoming appointments</p>
                  <Button
                    variant="outline"
                    className="mt-3"
                    onClick={() => setShowBookingDialog(true)}
                  >
                    Book your first appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Past Appointments</h3>
              <div className="space-y-3">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="opacity-70">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={appointment.advisorAvatar}
                          alt={appointment.advisorName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{appointment.advisorName}</h4>
                          <p className="text-sm text-slate-500">
                            {new Date(appointment.scheduledAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Completed</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Conversations List */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="font-semibold text-slate-900 mb-3">Conversations</h3>
              {mockConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${conversation.unreadCount > 0 ? 'border-primary/20 bg-primary/5' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={conversation.advisorAvatar}
                        alt={conversation.advisorName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-900 truncate">{conversation.advisorName}</h4>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-primary text-white text-xs">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">
                          {conversation.lastMessage?.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="h-[500px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={mockConversations[0].advisorAvatar}
                      alt={mockConversations[0].advisorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-base">{mockConversations[0].advisorName}</CardTitle>
                      <CardDescription>Career Advisor</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                        <p className="text-slate-700">Hi Emma! How can I help you today?</p>
                        <span className="text-xs text-slate-400 mt-1">10:00 AM</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-primary rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                        <p className="text-white">Hi Sarah! I had a question about my profile. Should I add more details about my projects?</p>
                        <span className="text-xs text-white/70 mt-1">10:05 AM</span>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                        <p className="text-slate-700">Hi Emma, I have reviewed your profile and have some suggestions for improvement. Let me know when you are available for a call!</p>
                        <span className="text-xs text-slate-400 mt-1">11:00 AM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button className="bg-primary hover:bg-primary/90">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'visa', 'housing', 'local_life', 'career', 'preparation'].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? 'bg-primary' : ''}
                >
                  {cat === 'all' ? 'All' : cat.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => {
              const Icon = categoryIcons[resource.category];
              return (
                <Card
                  key={resource.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedResource(resource)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[resource.category]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <Badge className={`mb-2 ${categoryColors[resource.category]}`}>
                          {resource.category.replace('_', ' ')}
                        </Badge>
                        <h4 className="font-semibold text-slate-900 mb-1">{resource.title}</h4>
                        <p className="text-sm text-slate-600">{resource.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No resources found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogDescription>
              {bookingStep === 'date' && 'Select a date for your appointment'}
              {bookingStep === 'time' && 'Choose a time slot'}
              {bookingStep === 'confirm' && 'Confirm your booking details'}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {bookingStep === 'date' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-900 text-center">Select a Date</h3>
                  </div>
                  <div className="p-4 flex justify-center">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      className="rounded-lg border-0"
                      classNames={{
                        head_cell: "text-slate-500 font-medium text-xs w-9 h-9",
                        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 rounded-md transition-colors",
                        day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
                        day_today: "bg-slate-100 text-slate-900",
                        day_outside: "text-slate-300 opacity-50",
                        day_disabled: "text-slate-300 opacity-50",
                        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 h-11 text-base"
                  onClick={() => setBookingStep('time')}
                  disabled={!selectedDate}
                >
                  Continue to Time
                </Button>
              </div>
            )}

            {bookingStep === 'time' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Morning Slots</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.slice(0, 6).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`
                          py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 border
                          ${selectedTimeSlot === slot
                            ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-primary/50 hover:bg-primary/5'
                          }
                        `}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Afternoon Slots</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.slice(6).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`
                          py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 border
                          ${selectedTimeSlot === slot
                            ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-primary/50 hover:bg-primary/5'
                          }
                        `}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 h-11" onClick={() => setBookingStep('date')}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 h-11"
                    onClick={() => setBookingStep('confirm')}
                    disabled={!selectedTimeSlot}
                  >
                    Continue to Confirm
                  </Button>
                </div>
              </div>
            )}

            {bookingStep === 'confirm' && (
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                  {/* Advisor Info */}
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                      alt="Sarah Johnson"
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Sarah Johnson</h4>
                      <p className="text-slate-500 text-sm">Senior Career Advisor</p>
                      <Badge variant="secondary" className="mt-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        Available
                      </Badge>
                    </div>
                  </div>

                  {/* Meeting Details */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Date</p>
                        <p className="text-slate-900 font-semibold">
                          {selectedDate?.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Time</p>
                        <p className="text-slate-900 font-semibold">{selectedTimeSlot}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Video className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Format</p>
                        <p className="text-slate-900 font-semibold">Video Call (Google Meet)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-11" onClick={() => setBookingStep('time')}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 h-11"
                    onClick={handleBookAppointment}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Resource Detail Dialog */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          {selectedResource && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[selectedResource.category]}`}>
                    {(() => {
                      const Icon = categoryIcons[selectedResource.category];
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div>
                    <Badge className={`mb-1 ${categoryColors[selectedResource.category]}`}>
                      {selectedResource.category.replace('_', ' ')}
                    </Badge>
                    <DialogTitle>{selectedResource.title}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-4 prose prose-slate max-w-none">
                <div className="whitespace-pre-line text-slate-700">
                  {selectedResource.content}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                  <ExternalLink className="w-4 h-4" />
                  Open Guide
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
