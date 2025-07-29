import { jobs } from '@/lib/data';
import { JobList } from '@/components/jobs/job-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function JobsPage() {
  const allJobs = jobs;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Find Your Next Project</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse freelance jobs from top companies.
          </p>
        </div>
        <Button asChild>
          <Link href="/jobs/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post a New Job
          </Link>
        </Button>
      </div>
      <JobList jobs={allJobs} />
    </div>
  );
}
