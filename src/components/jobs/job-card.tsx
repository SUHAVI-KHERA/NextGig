import Link from 'next/link';
import Image from 'next/image';
import type { JobPosting } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: JobPosting;
  isCompact?: boolean;
}

export function JobCard({ job, isCompact = false }: JobCardProps) {
  if (isCompact) {
    return (
       <Link href={`/jobs/${job.id}`} className="block hover:bg-muted/50 p-3 rounded-lg -m-3 transition-colors">
        <div className="flex items-start gap-3">
            <div className="bg-muted p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
                <p className="font-semibold text-sm">{job.title}</p>
                <p className="text-xs text-muted-foreground">{job.company}</p>
            </div>
        </div>
       </Link>
    )
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 border-secondary">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <div className="p-2 bg-secondary rounded-lg border border-border">
          <Image
            src={job.logoUrl}
            alt={`${job.company} logo`}
            width={48}
            height={48}
            className="rounded-md"
            data-ai-hint="company logo"
          />
        </div>
        <div className="flex-1">
          <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
          <CardDescription>{job.company}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.requiredSkills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/50 p-4 flex justify-between items-center">
        <div className="font-semibold text-lg text-primary">${job.budget.toLocaleString()}</div>
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>
            View Job <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
