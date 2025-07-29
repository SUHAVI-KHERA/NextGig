'use client';

import { useState } from 'react';
import type { FreelancerProfile } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { FreelancerCard } from './freelancer-card';
import { Search } from 'lucide-react';

interface FreelancerListProps {
  freelancers: FreelancerProfile[];
}

export function FreelancerList({ freelancers }: FreelancerListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFreelancers = freelancers.filter(
    (freelancer) =>
      freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name, title, or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg pl-10"
        />
      </div>

      {filteredFreelancers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFreelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="font-headline text-2xl">No Freelancers Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}
