
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { matchJobsForFreelancer } from '@/ai/flows/match-jobs';
import type { JobPosting } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MatchedJobCard } from '@/components/jobs/matched-job-card';

interface MatchedJob {
  jobId: string;
  reason: string;
  job: JobPosting;
}

export default function DashboardPage() {
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatchedJobs() {
      setIsLoading(true);
      setError(null);
      try {
        // Using the default freelancer '1' for the dashboard
        const result = await matchJobsForFreelancer({ freelancerId: '1' });
        if (result && result.matchedJobs) {
          setMatchedJobs(result.matchedJobs as MatchedJob[]);
        }
      } catch (e) {
        setError('Failed to fetch AI job matches. Please try again later.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMatchedJobs();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">Welcome back, Aarav!</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Here's your hub for finding talent, discovering projects, and improving your profile.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 mb-12">
        <Card className="border-secondary hover:border-primary transition-colors duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Find Talent</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/freelancers">
                Explore Freelancers <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-secondary hover:border-primary transition-colors duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-full">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Find Work</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/jobs">
                Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20 relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-primary/20 rounded-full">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <CardTitle className="font-headline text-primary">Improve Your Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <Button asChild variant="outline" className="w-full bg-secondary hover:bg-secondary/80 border-secondary-foreground/20">
              <Link href="/skill-suggester">
                Get AI Suggestions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="font-headline text-3xl font-bold mb-6 text-center">Your AI-Matched Jobs</h2>
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Finding the best opportunities for you...</p>
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!isLoading && !error && (
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matchedJobs.length > 0 ? (
              matchedJobs.map(({ job, reason }) => (
                <MatchedJobCard key={job.id} job={job} reason={reason} />
              ))
            ) : (
              <p className="text-muted-foreground text-center col-span-full">No specific AI job matches found at this time.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
