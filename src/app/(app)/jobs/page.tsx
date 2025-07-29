import { jobs } from '@/lib/data';
import { JobList } from '@/components/jobs/job-list';

export default function JobsPage() {
  const allJobs = jobs;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Find Your Next Project</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse freelance jobs from top companies.
        </p>
      </div>
      <JobList jobs={allJobs} />
    </div>
  );
}
