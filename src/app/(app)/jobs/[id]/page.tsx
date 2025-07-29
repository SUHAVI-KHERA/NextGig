import { jobs, freelancers } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FreelancerCard } from '@/components/freelancers/freelancer-card';
import { PaymentButton } from '@/components/jobs/payment-button';
import { Users, DollarSign, CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  const matchedFreelancers = freelancers.filter(freelancer =>
    job.requiredSkills.every(skill => freelancer.skills.includes(skill))
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-6">
                 <Image
                    src={job.logoUrl}
                    alt={`${job.company} logo`}
                    width={80}
                    height={80}
                    className="rounded-lg border p-1 bg-white"
                    data-ai-hint="company logo"
                />
                <div>
                    <h1 className="font-headline text-4xl font-bold">{job.title}</h1>
                    <p className="text-xl text-muted-foreground font-medium">{job.company}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 whitespace-pre-wrap">{job.description}</p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><CheckSquare className="w-5 h-5 text-primary" /> Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="default">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Project Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">${job.budget.toLocaleString()}</p>
              <PaymentButton budget={job.budget} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Matched Freelancers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {matchedFreelancers.length > 0 ? (
                matchedFreelancers.slice(0,3).map((freelancer) => (
                  <div key={freelancer.id} className="border-b last:border-b-0 pb-2 last:pb-0">
                    <Link href={`/freelancers/${freelancer.id}`} className="block hover:bg-muted/50 p-2 rounded-lg -m-2 transition-colors">
                        <div className="flex items-center gap-3">
                            <Image
                            src={freelancer.avatarUrl}
                            alt={freelancer.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                            data-ai-hint="person portrait"
                            />
                            <div>
                                <p className="font-semibold text-sm">{freelancer.name}</p>
                                <p className="text-xs text-muted-foreground">{freelancer.title}</p>
                            </div>
                        </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No freelancers found with this exact skill set.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
