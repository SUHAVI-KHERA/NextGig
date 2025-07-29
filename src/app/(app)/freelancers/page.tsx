import { freelancers } from '@/lib/data';
import { FreelancerList } from '@/components/freelancers/freelancer-list';

export default function FreelancersPage() {
  const allFreelancers = freelancers;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Find Top Talent</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Connect with our community of professional freelancers.
        </p>
      </div>
      <FreelancerList freelancers={allFreelancers} />
    </div>
  );
}
