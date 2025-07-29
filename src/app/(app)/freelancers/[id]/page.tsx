import { freelancers } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, DollarSign, History, Lightbulb, Video } from 'lucide-react';
import { ChatDialog } from '@/components/chat/chat-dialog';
import type { FreelancerProfile } from '@/lib/types';
import { MatchedJobs } from '@/components/freelancers/matched-jobs';

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const freelancer = freelancers.find((f) => f.id === params.id);

  if (!freelancer) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
            <Card className="text-center p-6">
              <Image
                src={freelancer.avatarUrl}
                alt={freelancer.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-primary shadow-lg mx-auto mb-4"
                data-ai-hint="person portrait"
              />
              <h1 className="font-headline text-2xl font-bold">{freelancer.name}</h1>
              <p className="text-lg text-primary font-medium mb-4">{freelancer.title}</p>
              <ChatDialog freelancer={freelancer as FreelancerProfile} />
            </Card>

            <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Hourly Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${freelancer.rate}<span className="text-lg text-muted-foreground font-normal">/hr</span></p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">{freelancer.bio}</p>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">Skills</CardTitle>
              </Header>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>
                    ))}
                </div>
              </CardContent>
            </Card>

          {freelancer.videoResumeUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2"><Video className="w-5 h-5 text-primary" /> Video Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full">
                   <video
                    src={freelancer.videoResumeUrl}
                    controls
                    className="w-full h-full rounded-lg bg-black"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2"><History className="w-5 h-5 text-primary" /> Work History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{freelancer.workHistory}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary" /> Job Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{freelancer.jobPreferences}</p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> AI Matched Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MatchedJobs freelancerId={freelancer.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
