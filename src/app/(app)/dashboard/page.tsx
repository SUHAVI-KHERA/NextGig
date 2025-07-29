import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">Welcome to SkillSync</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your platform for connecting with top freelance talent and finding your next project. Powered by AI to make matching seamless.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="flex flex-col border-secondary hover:border-primary transition-colors duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Find Talent</CardTitle>
            </div>
            <CardDescription className="pt-2">Browse profiles of skilled freelancers ready to bring your projects to life.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/freelancers">
                Explore Freelancers <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col border-secondary hover:border-primary transition-colors duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-full">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Find Work</CardTitle>
            </div>
            <CardDescription className="pt-2">Discover exciting job opportunities tailored to your skills and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/jobs">
                Browse Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col bg-primary/10 border-primary/20 relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-primary/20 rounded-full">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <CardTitle className="font-headline text-primary">Improve Your Profile</CardTitle>
            </div>
            <CardDescription className="pt-2 text-muted-foreground">Use our AI tool to get skill suggestions based on your work history and career goals.</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 flex-grow flex items-end">
            <Button asChild variant="outline" className="w-full bg-secondary hover:bg-secondary/80 border-secondary-foreground/20">
              <Link href="/skill-suggester">
                Get AI Suggestions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
