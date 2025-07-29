import { freelancers } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, DollarSign, History, Lightbulb } from 'lucide-react';
import { ChatDialog } from '@/components/chat/chat-dialog';
import type { FreelancerProfile } from '@/lib/types';
import { MatchedJobs } from '@/components/freelancers/matched-jobs';

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const freelancer = freelancers.find((f) => f.id === params.id);

  if (!freelancer) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-col md:flex-row items-start gap-6">
              <Image
                src={freelancer.avatarUrl}
                alt={freelancer.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-primary shadow-md"
                data-ai-hint="person portrait"
              />
              <div className="flex-1 mt-2 md:mt-0">
                <h1 className="font-headline text-4xl font-bold">{freelancer.name}</h1>
                <p className="text-xl text-primary font-medium">{freelancer.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <Badge key={skill} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>
               <ChatDialog freelancer={freelancer as FreelancerProfile} />
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{freelancer.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><History className="w-5 h-5 text-primary" /> Work History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{freelancer.workHistory}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary" /> Job Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{freelancer.jobPreferences}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Hourly Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">${freelancer.rate}<span className="text-lg text-muted-foreground font-normal">/hr</span></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> AI Matched Jobs</CardTitle>
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
