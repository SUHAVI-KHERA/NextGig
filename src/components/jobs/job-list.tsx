'use client';

import { useState } from 'react';
import type { JobPosting } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { JobCard } from './job-card';
import { Search } from 'lucide-react';

interface JobListProps {
  jobs: JobPosting[];
}

export function JobList({ jobs }: JobListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by title, company, or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg pl-10"
        />
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="font-headline text-2xl">No Jobs Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}
