import { useState } from 'react';
import {
  Search,
  MapPin,
  Euro,
  Clock,
  Building2,
  Heart,
  X,
  CheckCircle2,
  Briefcase,
  Filter,
  ChevronRight,
  ExternalLink,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { mockOpportunities, mockStudentOpportunities } from '@/data/mockData';
import type { Opportunity } from '@/types';

export function Matching() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(
    mockStudentOpportunities.filter(so => so.status === 'saved').map(so => so.opportunityId)
  );
  const [appliedOpportunities, setAppliedOpportunities] = useState<string[]>(
    mockStudentOpportunities.filter(so => so.status === 'applied' || so.status === 'interview_requested').map(so => so.opportunityId)
  );
  const [dismissedOpportunities, setDismissedOpportunities] = useState<string[]>([]);

  const locations = ['all', ...Array.from(new Set(mockOpportunities.map(o => o.company.location)))];

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = selectedLocation === 'all' || opp.company.location === selectedLocation;
    const notDismissed = !dismissedOpportunities.includes(opp.id);

    return matchesSearch && matchesLocation && notDismissed;
  });

  const savedOpps = mockOpportunities.filter(opp => savedOpportunities.includes(opp.id));

  const handleSave = (oppId: string) => {
    if (savedOpportunities.includes(oppId)) {
      setSavedOpportunities(savedOpportunities.filter(id => id !== oppId));
      toast.info('Removed from saved opportunities');
    } else {
      setSavedOpportunities([...savedOpportunities, oppId]);
      toast.success('Saved to your opportunities');
    }
  };

  const handleApply = (oppId: string) => {
    setAppliedOpportunities([...appliedOpportunities, oppId]);
    setSavedOpportunities(savedOpportunities.filter(id => id !== oppId));
    toast.success('Application submitted successfully!');
    setSelectedOpportunity(null);
  };

  const handleDismiss = (oppId: string) => {
    setDismissedOpportunities([...dismissedOpportunities, oppId]);
    setSavedOpportunities(savedOpportunities.filter(id => id !== oppId));
    toast.info('Opportunity dismissed');
  };

  const getStatusBadge = (oppId: string) => {
    if (appliedOpportunities.includes(oppId)) {
      return <Badge className="bg-green-100 text-green-700">Applied</Badge>;
    }
    if (savedOpportunities.includes(oppId)) {
      return <Badge className="bg-rose-100 text-rose-700">Saved</Badge>;
    }
    return null;
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Opportunities</h1>
            <p className="text-slate-600 mt-1">
              Discover internships that match your profile and interests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-slate-600">Matching Score: </span>
              <span className="font-semibold text-primary">92%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Locations</option>
              {locations.filter(l => l !== 'all').map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="saved">
            Saved
            {savedOpportunities.length > 0 && (
              <Badge variant="secondary" className="ml-2">{savedOpportunities.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="applied">
            Applied
            {appliedOpportunities.length > 0 && (
              <Badge variant="secondary" className="ml-2">{appliedOpportunities.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Discover Tab */}
        <TabsContent value="discover" className="space-y-4">
          {filteredOpportunities.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredOpportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200"
                  onClick={() => setSelectedOpportunity(opportunity)}
                >
                  <CardContent className="p-5">
                    {/* Company Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={opportunity.company.logo}
                          alt={opportunity.company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-slate-900 line-clamp-1">{opportunity.title}</h3>
                          <p className="text-sm text-slate-600">{opportunity.company.name}</p>
                        </div>
                      </div>
                      {getStatusBadge(opportunity.id)}
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {opportunity.company.location}, {opportunity.company.country}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Euro className="w-4 h-4 text-slate-400" />
                        {opportunity.stipend.amount.toLocaleString()} {opportunity.stipend.currency}/{opportunity.stipend.period}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {opportunity.duration}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {opportunity.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {opportunity.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{opportunity.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(opportunity.id);
                        }}
                      >
                        {savedOpportunities.includes(opportunity.id) ? (
                          <><BookmarkCheck className="w-4 h-4 mr-1" /> Saved</>
                        ) : (
                          <><Bookmark className="w-4 h-4 mr-1" /> Save</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOpportunity(opportunity);
                        }}
                        disabled={appliedOpportunities.includes(opportunity.id)}
                      >
                        {appliedOpportunities.includes(opportunity.id) ? (
                          <><CheckCircle2 className="w-4 h-4 mr-1" /> Applied</>
                        ) : (
                          'View Details'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No opportunities found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        {/* Saved Tab */}
        <TabsContent value="saved" className="space-y-4">
          {savedOpps.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {savedOpps.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedOpportunity(opportunity)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={opportunity.company.logo}
                          alt={opportunity.company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-slate-900 line-clamp-1">{opportunity.title}</h3>
                          <p className="text-sm text-slate-600">{opportunity.company.name}</p>
                        </div>
                      </div>
                      <Badge className="bg-rose-100 text-rose-700">Saved</Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {opportunity.company.location}, {opportunity.company.country}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Euro className="w-4 h-4 text-slate-400" />
                        {opportunity.stipend.amount.toLocaleString()} {opportunity.stipend.currency}/{opportunity.stipend.period}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(opportunity.id);
                        }}
                      >
                        <X className="w-4 h-4 mr-1" /> Remove
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOpportunity(opportunity);
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No saved opportunities</h3>
              <p className="text-slate-600">Save opportunities you're interested in to apply later</p>
            </div>
          )}
        </TabsContent>

        {/* Applied Tab */}
        <TabsContent value="applied" className="space-y-4">
          {appliedOpportunities.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockOpportunities
                .filter(opp => appliedOpportunities.includes(opp.id))
                .map((opportunity) => (
                  <Card key={opportunity.id} className="border-green-200 bg-green-50/30">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={opportunity.company.logo}
                            alt={opportunity.company.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-slate-900 line-clamp-1">{opportunity.title}</h3>
                            <p className="text-sm text-slate-600">{opportunity.company.name}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Applied
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {opportunity.company.location}, {opportunity.company.country}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4 text-slate-400" />
                          Applied on {new Date().toLocaleDateString()}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedOpportunity(opportunity)}
                      >
                        View Application
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications yet</h3>
              <p className="text-slate-600">Start applying to opportunities that interest you</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Opportunity Detail Dialog */}
      <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
          {selectedOpportunity && (
            <>
              {/* Header */}
              <div className="relative h-32 bg-primary">
                <button
                  onClick={() => handleSave(selectedOpportunity.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${savedOpportunities.includes(selectedOpportunity.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
                  />
                </button>
              </div>

              <div className="px-6 -mt-12">
                <div className="flex items-end gap-4">
                  <img
                    src={selectedOpportunity.company.logo}
                    alt={selectedOpportunity.company.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="pb-2">
                    {getStatusBadge(selectedOpportunity.id)}
                  </div>
                </div>
              </div>

              <ScrollArea className="max-h-[calc(90vh-200px)]">
                <div className="p-6 pt-4">
                  <DialogHeader className="text-left mb-6">
                    <DialogTitle className="text-2xl">{selectedOpportunity.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 text-base">
                      <Building2 className="w-4 h-4" />
                      {selectedOpportunity.company.name}
                      <span className="text-slate-400">•</span>
                      <MapPin className="w-4 h-4" />
                      {selectedOpportunity.company.location}, {selectedOpportunity.company.country}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Key Details */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <Euro className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="font-semibold text-slate-900">
                        {selectedOpportunity.stipend.amount.toLocaleString()} {selectedOpportunity.stipend.currency}
                      </p>
                      <p className="text-xs text-slate-500">per {selectedOpportunity.stipend.period}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <Clock className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="font-semibold text-slate-900">{selectedOpportunity.duration}</p>
                      <p className="text-xs text-slate-500">Duration</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <Briefcase className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="font-semibold text-slate-900">{selectedOpportunity.type}</p>
                      <p className="text-xs text-slate-500">Type</p>
                    </div>
                  </div>

                  {/* About */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">About the Role</h4>
                    <p className="text-slate-600 leading-relaxed">{selectedOpportunity.description}</p>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Requirements</h4>
                    <ul className="space-y-2">
                      {selectedOpportunity.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Responsibilities</h4>
                    <ul className="space-y-2">
                      {selectedOpportunity.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOpportunity.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="bg-slate-50 p-4 rounded-xl mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">About {selectedOpportunity.company.name}</h4>
                    <p className="text-slate-600 text-sm mb-3">{selectedOpportunity.company.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-600">{selectedOpportunity.company.industry}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{selectedOpportunity.company.size}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {!appliedOpportunities.includes(selectedOpportunity.id) ? (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleDismiss(selectedOpportunity.id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Not Interested
                        </Button>
                        <Button
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => handleApply(selectedOpportunity.id)}
                        >
                          Apply Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Application Submitted
                      </Button>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
