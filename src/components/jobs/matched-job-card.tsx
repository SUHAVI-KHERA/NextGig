
import Link from 'next/link';
import Image from 'next/image';
import type { JobPosting } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb } from 'lucide-react';

interface MatchedJobCardProps {
  job: JobPosting;
  reason: string;
}

export function MatchedJobCard({ job, reason }: MatchedJobCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 border-secondary bg-secondary/30">
        <CardHeader className="flex flex-row items-start gap-4 p-4">
            <div className="p-2 bg-background rounded-lg border border-border">
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
             <div className="flex items-start gap-3 bg-background/50 p-3 rounded-md border border-dashed border-primary/30">
                <Lightbulb className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-xs text-muted-foreground italic">&quot;{reason}&quot;</p>
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
