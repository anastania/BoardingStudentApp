import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Briefcase,
  Calendar,
  Globe,
  Languages,
  FileText,
  Upload,
  History,
  CheckCircle2,
  Edit3,
  Save,
  X,
  Plus,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { mockStudentProfile, mockCVDocs } from '@/data/mockData';
import type { StudentProfile, CVDocument } from '@/types';

export function Profile() {
  const [profile, setProfile] = useState<StudentProfile>(mockStudentProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<StudentProfile>(mockStudentProfile);
  const [cvDocs, setCvDocs] = useState<CVDocument[]>(mockCVDocs);
  const [showCVHistory, setShowCVHistory] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const calculateCompletion = () => {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.phone,
      profile.university,
      profile.major,
      profile.nationality,
      profile.about,
    ];
    const filled = fields.filter(f => f && f.trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedProfile.skills.includes(newSkill.trim())) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter(s => s !== skill)
    });
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !editedProfile.languages.includes(newLanguage.trim())) {
      setEditedProfile({
        ...editedProfile,
        languages: [...editedProfile.languages, newLanguage.trim()]
      });
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    setEditedProfile({
      ...editedProfile,
      languages: editedProfile.languages.filter(l => l !== lang)
    });
  };

  const handleCVUpload = () => {
    const newCV: CVDocument = {
      id: `cv-${Date.now()}`,
      filename: `Emma_Rodriguez_CV_v${cvDocs.length + 1}.pdf`,
      url: `/uploads/cv-${Date.now()}.pdf`,
      uploadedAt: new Date().toISOString(),
      version: cvDocs.length + 1,
    };
    setCvDocs([newCV, ...cvDocs]);
    toast.success('CV uploaded successfully!');
  };

  const displayProfile = isEditing ? editedProfile : profile;
  const completion = calculateCompletion();

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-600 mt-1">
              Manage your personal information and preferences
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} className="gap-2">
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="gap-2 bg-primary hover:bg-primary/90">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">{completion}%</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Profile Completion</h3>
              <p className="text-sm text-slate-600 mt-1">
                {completion === 100
                  ? 'Great job! Your profile is complete.'
                  : 'Complete your profile to increase your chances of matching with top companies.'}
              </p>
              <Progress value={completion} className="mt-3 h-2" />
            </div>
            {profile.status === 'published' ? (
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Published
              </Badge>
            ) : (
              <Badge variant="secondary">Draft</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic & Skills</TabsTrigger>
          <TabsTrigger value="cv">CV Center</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="firstName"
                      value={displayProfile.firstName}
                      onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="lastName"
                      value={displayProfile.lastName}
                      onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={displayProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="phone"
                      value={displayProfile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="nationality"
                    value={displayProfile.nationality}
                    onChange={(e) => setEditedProfile({ ...editedProfile, nationality: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location Preferences
              </CardTitle>
              <CardDescription>Where would you like to intern?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Locations</Label>
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {editedProfile.preferredLocation.map((loc) => (
                        <Badge key={loc} variant="secondary" className="gap-1">
                          {loc}
                          <button
                            onClick={() => setEditedProfile({
                              ...editedProfile,
                              preferredLocation: editedProfile.preferredLocation.filter(l => l !== loc)
                            })}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add location..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = e.currentTarget.value;
                            if (value && !editedProfile.preferredLocation.includes(value)) {
                              setEditedProfile({
                                ...editedProfile,
                                preferredLocation: [...editedProfile.preferredLocation, value]
                              });
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {displayProfile.preferredLocation.map((loc) => (
                      <Badge key={loc} variant="secondary">{loc}</Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Preferred Roles</Label>
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {editedProfile.preferredRole.map((role) => (
                        <Badge key={role} variant="secondary" className="gap-1">
                          {role}
                          <button
                            onClick={() => setEditedProfile({
                              ...editedProfile,
                              preferredRole: editedProfile.preferredRole.filter(r => r !== role)
                            })}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Add role..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const value = e.currentTarget.value;
                          if (value && !editedProfile.preferredRole.includes(value)) {
                            setEditedProfile({
                              ...editedProfile,
                              preferredRole: [...editedProfile.preferredRole, value]
                            });
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {displayProfile.preferredRole.map((role) => (
                      <Badge key={role} variant="secondary">{role}</Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="availability"
                    type="date"
                    value={displayProfile.availability}
                    onChange={(e) => setEditedProfile({ ...editedProfile, availability: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic & Skills */}
        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Academic Information
              </CardTitle>
              <CardDescription>Your educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="university"
                    value={displayProfile.university}
                    onChange={(e) => setEditedProfile({ ...editedProfile, university: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="major">Major/Field of Study</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="major"
                      value={displayProfile.major}
                      onChange={(e) => setEditedProfile({ ...editedProfile, major: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Expected Graduation</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="graduationYear"
                      value={displayProfile.graduationYear}
                      onChange={(e) => setEditedProfile({ ...editedProfile, graduationYear: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Skills & Expertise
              </CardTitle>
              <CardDescription>Add your technical and soft skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {displayProfile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1">
                      {skill}
                      {isEditing && (
                        <button onClick={() => handleRemoveSkill(skill)} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <Button type="button" onClick={handleAddSkill} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Languages
                </Label>
                <div className="flex flex-wrap gap-2">
                  {displayProfile.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="gap-1 px-3 py-1">
                      {lang}
                      {isEditing && (
                        <button onClick={() => handleRemoveLanguage(lang)} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Add a language..."
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
                    />
                    <Button type="button" onClick={handleAddLanguage} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                About Me
              </CardTitle>
              <CardDescription>Tell companies about yourself</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={displayProfile.about}
                onChange={(e) => setEditedProfile({ ...editedProfile, about: e.target.value })}
                disabled={!isEditing}
                rows={5}
                placeholder="Write a brief introduction about yourself, your goals, and what you're looking for..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* CV Center */}
        <TabsContent value="cv" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload CV
              </CardTitle>
              <CardDescription>Upload your latest CV in PDF format</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                onClick={handleCVUpload}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Drop your CV here or click to upload</h3>
                <p className="text-sm text-slate-500 mb-4">Supported format: PDF (max 5MB)</p>
                <Button variant="outline">Select File</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Current CV
                  </CardTitle>
                  <CardDescription>Your most recent upload</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowCVHistory(true)}
                >
                  <History className="w-4 h-4" />
                  Version History
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {cvDocs.length > 0 ? (
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{cvDocs[0].filename}</p>
                    <p className="text-sm text-slate-500">
                      Uploaded on {new Date(cvDocs[0].uploadedAt).toLocaleDateString()} • Version {cvDocs[0].version}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600">No CV uploaded yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CV History Dialog */}
      <Dialog open={showCVHistory} onOpenChange={setShowCVHistory}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>CV Version History</DialogTitle>
            <DialogDescription>View and download previous versions of your CV</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {cvDocs.map((cv, index) => (
              <div key={cv.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{cv.filename}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(cv.uploadedAt).toLocaleDateString()} • Version {cv.version}
                  </p>
                </div>
                {index === 0 && (
                  <Badge className="bg-green-100 text-green-700">Current</Badge>
                )}
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
