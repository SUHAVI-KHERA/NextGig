
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ArrowRight, Sparkles, MessageSquare, Search } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/shared/header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-center bg-secondary/50">
           <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background"></div>
          <div className="container relative z-10">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/80 text-transparent bg-clip-text">
              Find Your Perfect Match in the World of Work
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              SkillSync is the AI-powered platform that connects top freelance talent with innovative projects. Whether you're looking to hire or find your next gig, we make it seamless.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/jobs">
                  Browse Jobs
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl font-bold">Why Choose SkillSync?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Discover the features that make finding work and talent easier than ever.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Search className="w-8 h-8 text-primary" />}
                title="AI-Powered Matching"
                description="Our smart algorithms connect freelancers to jobs based on skills, experience, and preferences, ensuring the perfect fit."
              />
              <FeatureCard
                icon={<Sparkles className="w-8 h-8 text-primary" />}
                title="Profile Enhancement"
                description="Get AI-driven suggestions for new skills to add to your profile, boosting your visibility and appeal to clients."
              />
               <FeatureCard
                icon={<MessageSquare className="w-8 h-8 text-primary" />}
                title="Direct & Simple Chat"
                description="Communicate directly with clients or freelancers through our simple, AI-assisted chat interface."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center border-secondary hover:border-primary/50 transition-colors duration-300">
      <CardHeader>
        <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-4">
            {icon}
        </div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
