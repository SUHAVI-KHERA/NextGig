
import { freelancers } from '@/lib/data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Lightbulb, Mail, Pencil, Phone, User } from 'lucide-react';
import { Video } from 'lucide-react';
import Link from 'next/link';

// For demonstration, we'll use a static freelancer profile.
// In a real app, you would fetch the logged-in user's data.
const userProfile = freelancers[0]; 

export default function ProfilePage() {

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="font-headline text-4xl font-bold">My Profile</h1>
        <Button asChild variant="outline">
          <Link href="/settings?loggedin=true">
            <Pencil className="mr-2 h-4 w-4" /> Edit Profile
          </Link>
        </Button>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Image
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-primary shadow-md mb-4"
                data-ai-hint="person portrait"
              />
              <h2 className="font-headline text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-lg text-primary font-medium">{userProfile.title}</p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span>aarav.sharma@example.com</span>
               </div>
               <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
           <Card>
             <CardHeader>
              <CardTitle className="font-headline">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{userProfile.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill) => (
                    <Badge key={skill} variant="default">{skill}</Badge>
                  ))}
                </div>
            </CardContent>
          </Card>

          {userProfile.videoResumeUrl && (
            <Card id="video-resume">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Video className="w-5 h-5 text-primary" /> Video Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <video
                    src={userProfile.videoResumeUrl}
                    controls
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><History className="w-5 h-5 text-primary" /> Work History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{userProfile.workHistory}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary" /> Job Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{userProfile.jobPreferences}</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
