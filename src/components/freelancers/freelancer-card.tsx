import Link from 'next/link';
import Image from 'next/image';
import type { FreelancerProfile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 border-secondary">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Image
          src={freelancer.avatarUrl}
          alt={freelancer.name}
          width={80}
          height={80}
          className="rounded-full border-2 border-primary"
          data-ai-hint="person portrait"
        />
        <div className="flex-1">
          <CardTitle className="font-headline text-xl">{freelancer.name}</CardTitle>
          <CardDescription className="text-primary">{freelancer.title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{freelancer.bio}</p>
        <div className="flex flex-wrap gap-2">
          {freelancer.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
          {freelancer.skills.length > 4 && (
            <Badge variant="outline">+{freelancer.skills.length - 4} more</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/50 p-4 flex justify-between items-center">
        <div className="font-semibold text-lg text-foreground">${freelancer.rate}/hr</div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href={`/freelancers/${freelancer.id}`}>
              View Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
