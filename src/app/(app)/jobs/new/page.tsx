import { JobCreatorForm } from '@/components/jobs/job-creator-form';

export default function NewJobPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Create a New Job Posting</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Start by providing a title and key responsibilities. Our AI will help you write a professional job description and suggest relevant skills.
        </p>
      </div>
      <JobCreatorForm />
    </div>
  );
}
