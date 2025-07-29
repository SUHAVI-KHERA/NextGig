'use client';

import { useEffect, useState } from 'react';
import { matchJobsForFreelancer } from '@/ai/flows/match-jobs';
import type { JobPosting } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { JobCard } from '../jobs/job-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface MatchedJob {
  jobId: string;
  reason: string;
  job: JobPosting;
}

export function MatchedJobs({ freelancerId }: { freelancerId: string }) {
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatchedJobs() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await matchJobsForFreelancer({ freelancerId });
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
  }, [freelancerId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Analyzing profile for job matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (matchedJobs.length === 0) {
    return <p className="text-muted-foreground text-sm">No specific AI job matches found at this time.</p>;
  }

  return (
    <div className="space-y-4">
      {matchedJobs.map(({ job, reason }) => (
        <Card key={job.id} className="bg-secondary/50">
          <CardHeader className="pb-2">
             <JobCard job={job} isCompact={true} />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground italic">&quot;{reason}&quot;</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
