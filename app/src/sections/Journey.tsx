import { useState } from 'react';
import {
  User,
  Search,
  MessageSquare,
  FileCheck,
  FileText,
  Plane,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { mockJourney, mockStudentOpportunities } from '@/data/mockData';
import type { JourneyStage, JourneyStep } from '@/types';

const stageIcons: Record<JourneyStage, React.ElementType> = {
  profile: User,
  matching: Search,
  interviews: MessageSquare,
  placement: FileCheck,
  visa: FileText,
  departure: Plane,
};

export function Journey() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const journey = mockJourney;

  const activeOpportunity = mockStudentOpportunities.find(
    so => so.status === 'interview_requested' || so.status === 'interview_scheduled'
  );

  const getStepIcon = (step: JourneyStep) => {
    const Icon = stageIcons[step.stage];
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Journey</h1>
            <p className="text-slate-600 mt-1">
              Track your progress from profile to departure
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/5 px-4 py-2 rounded-lg">
              <span className="text-sm text-slate-600">Overall Progress: </span>
              <span className="font-semibold text-primary">{journey.overallProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">{journey.overallProgress}%</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-lg">
                Current Stage: {journey.steps.find(s => s.status === 'current')?.title}
              </h3>
              <p className="text-slate-600">
                {journey.steps.find(s => s.status === 'current')?.description}
              </p>
            </div>
          </div>
          <Progress value={journey.overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Application Timeline</CardTitle>
          <CardDescription>Your step-by-step journey to your international internship</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200" />

            <div className="space-y-6">
              {journey.steps.map((step) => {
                const Icon = stageIcons[step.stage];

                return (
                  <div
                    key={step.id}
                    className={`relative flex gap-4 ${step.status === 'upcoming' ? 'opacity-60' : ''}`}
                  >
                    {/* Icon Circle */}
                    <div
                      className={`
                        relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                        ${step.status === 'completed' ? 'bg-green-500 text-white' : ''}
                        ${step.status === 'current' ? 'bg-primary text-white ring-4 ring-primary/20' : ''}
                        ${step.status === 'upcoming' ? 'bg-slate-300 text-slate-500' : ''}
                      `}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`
                        flex-1 p-4 rounded-xl border cursor-pointer transition-all
                        ${step.status === 'current'
                          ? 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                        }
                      `}
                      onClick={() => setSelectedStep(step)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900">{step.title}</h4>
                            {step.status === 'current' && (
                              <Badge className="bg-primary/10 text-primary">Current</Badge>
                            )}
                            {step.status === 'completed' && (
                              <Badge className="bg-green-100 text-green-700">Completed</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">{step.description}</p>

                          {step.completedAt && (
                            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Completed on {new Date(step.completedAt).toLocaleDateString()}
                            </p>
                          )}

                          {step.dueDate && step.status === 'current' && (
                            <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Due by {new Date(step.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Application Status */}
      {activeOpportunity && (
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Active Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <img
                src={activeOpportunity.opportunity.company.logo}
                alt={activeOpportunity.opportunity.company.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 text-lg">
                  {activeOpportunity.opportunity.title}
                </h4>
                <p className="text-slate-600">{activeOpportunity.opportunity.company.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Interview Requested
                  </Badge>
                  <span className="text-sm text-slate-500">
                    Applied on {new Date(activeOpportunity.appliedAt!).toLocaleDateString()}
                  </span>
                </div>
                {activeOpportunity.notes && (
                  <p className="text-sm text-slate-600 mt-3 bg-white p-3 rounded-lg">
                    <span className="font-medium">Notes:</span> {activeOpportunity.notes}
                  </p>
                )}
              </div>
              <Button variant="outline">View Details</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900">Schedule Interview</h4>
                <p className="text-sm text-slate-600">Book a time slot</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900">Visa Documents</h4>
                <p className="text-sm text-slate-600">Check requirements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900">Housing Guide</h4>
                <p className="text-sm text-slate-600">Find accommodation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step Detail Dialog */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${selectedStep?.status === 'completed' ? 'bg-green-500 text-white' : ''}
                  ${selectedStep?.status === 'current' ? 'bg-primary text-white' : ''}
                  ${selectedStep?.status === 'upcoming' ? 'bg-slate-300 text-slate-500' : ''}
                `}
              >
                {selectedStep && getStepIcon(selectedStep)}
              </div>
              <div>
                <DialogTitle>{selectedStep?.title}</DialogTitle>
                <DialogDescription>
                  {selectedStep?.status === 'completed' && 'Completed'}
                  {selectedStep?.status === 'current' && 'In Progress'}
                  {selectedStep?.status === 'upcoming' && 'Not Started'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <p className="text-slate-600">{selectedStep?.description}</p>

            {selectedStep?.status === 'completed' && selectedStep.completedAt && (
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-green-700 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Completed on {new Date(selectedStep.completedAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {selectedStep?.status === 'current' && (
              <div className="space-y-3">
                {selectedStep.dueDate && (
                  <div className="bg-amber-50 p-4 rounded-xl">
                    <p className="text-amber-700 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Due by {new Date(selectedStep.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Stage-specific actions */}
                {selectedStep.stage === 'profile' && (
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Complete Profile
                  </Button>
                )}

                {selectedStep.stage === 'matching' && (
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Browse Opportunities
                  </Button>
                )}

                {selectedStep.stage === 'interviews' && (
                  <div className="space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Schedule Interview
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Interview Prep Guide
                    </Button>
                  </div>
                )}

                {selectedStep.stage === 'placement' && (
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Review Offer
                  </Button>
                )}

                {selectedStep.stage === 'visa' && (
                  <div className="space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Start Visa Application
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Requirements
                    </Button>
                  </div>
                )}

                {selectedStep.stage === 'departure' && (
                  <div className="space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Pre-Departure Checklist
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Guide
                    </Button>
                  </div>
                )}
              </div>
            )}

            {selectedStep?.status === 'upcoming' && (
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-slate-600 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  This stage will become available once you complete the current stage.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
