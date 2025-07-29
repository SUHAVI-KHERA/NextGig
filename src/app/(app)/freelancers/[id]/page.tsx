import { freelancers, jobs } from '@/lib/data';
import type { JobPosting } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobCard } from '@/components/jobs/job-card';
import { Briefcase, DollarSign, History, Lightbulb } from 'lucide-react';

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const freelancer = freelancers.find((f) => f.id === params.id);

  if (!freelancer) {
    notFound();
  }

  const matchedJobs = jobs.filter(job => 
    job.requiredSkills.some(skill => freelancer.skills.includes(skill))
  );

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
              <CardTitle className="font-headline flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Matched Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {matchedJobs.length > 0 ? (
                matchedJobs.slice(0,3).map((job) => (
                  <JobCard key={job.id} job={job} isCompact={true} />
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No job matches found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
