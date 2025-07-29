
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/shared/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Code, Megaphone, Palette, Star, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { freelancers } from '@/lib/data';
import { FreelancerCard } from '@/components/freelancers/freelancer-card';

const categories = [
  { name: 'Developers', icon: <Code className="w-8 h-8 text-primary" />, href: '/freelancers' },
  { name: 'Designers', icon: <Palette className="w-8 h-8 text-primary" />, href: '/freelancers' },
  { name: 'Marketers', icon: <Megaphone className="w-8 h-8 text-primary" />, href: '/freelancers' },
  { name: 'Consultants', icon: <Users className="w-8 h-8 text-primary" />, href: '/freelancers' },
];

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'Project Manager',
    quote: 'NextGig made it incredibly easy to find a talented developer for our project. The AI matching was spot-on and saved us hours of searching!',
    avatar: 'https://placehold.co/100x100.png/EFEFEF/AAAAAA&text=S',
  },
  {
    name: 'David C.',
    title: 'Mobile Developer',
    quote: "As a freelancer, finding high-quality leads is tough. NextGig's job board and AI suggestions helped me land a fantastic long-term contract.",
    avatar: 'https://placehold.co/100x100.png/EFEFEF/AAAAAA&text=D',
  },
   {
    name: 'Emily T.',
    title: 'Startup Founder',
    quote: "The quality of talent on NextGig is exceptional. We hired a UI/UX designer who completely transformed our app's user experience. Highly recommended!",
    avatar: 'https://placehold.co/100x100.png/EFEFEF/AAAAAA&text=E',
  },
];


export default function LandingPage() {
    const plugin = React.useRef(
      Autoplay({ delay: 4000, stopOnInteraction: true })
    )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0">
                <Image
                    src="https://storage.googleapis.com/project-spark-312615.appspot.com/generated/372a0149-623d-4c75-b286-6512ed7e3760.png"
                    alt="Workspace"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          </div>
          <div className="container relative z-10 text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/80 text-transparent bg-clip-text">
              Where Talent Meets Opportunity
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              NextGig is the AI-powered platform that connects top freelance talent with innovative projects. Your next great hire or gig is just a click away.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-12">
            <div className="container">
                 <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    >
                    <CarouselContent>
                        <CarouselItem>
                            <div className="p-1">
                               <Card className="bg-primary/10 border-primary/20 flex items-center justify-between p-8 md:p-12 rounded-lg">
                                    <div className="max-w-xl">
                                        <h2 className="font-headline text-3xl font-bold text-primary">Find the Perfect Freelancer, Faster</h2>
                                        <p className="mt-2 text-primary/80">Our AI-driven matching connects you with the ideal candidate based on skills, experience, and project needs.</p>
                                    </div>
                                    <Image src="https://placehold.co/400x250.png/172038/EFEFEF" alt="AI Matching" width={400} height={250} className="hidden md:block rounded-lg shadow-lg" data-ai-hint="abstract technology" />
                               </Card>
                            </div>
                        </CarouselItem>
                         <CarouselItem>
                            <div className="p-1">
                               <Card className="bg-accent/10 border-accent/20 flex items-center justify-between p-8 md:p-12 rounded-lg">
                                    <div className="max-w-xl">
                                        <h2 className="font-headline text-3xl font-bold text-accent-foreground">Discover Your Next Big Project</h2>
                                        <p className="mt-2 text-accent-foreground/80">Get matched with high-quality job opportunities that align with your unique skills and career goals.</p>
                                    </div>
                                    <Image src="https://placehold.co/400x250.png/172038/EFEFEF" alt="Job Opportunities" width={400} height={250} className="hidden md:block rounded-lg shadow-lg" data-ai-hint="modern office" />
                               </Card>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </section>

        {/* Top Freelancers Section */}
        <section className="py-20 md:py-24 bg-secondary/20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl font-bold">Meet Our Top Talent</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        A glimpse of the highly-skilled and trusted professionals in our network.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {freelancers.slice(0, 4).map(f => (
                       <FreelancerCard key={f.id} freelancer={f} />
                   ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/freelancers">Browse All Talent <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 md:py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl font-bold">Browse by Category</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Find specialized talent for any role or project requirement.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link href={category.href} key={category.name} className="group">
                             <Card className="text-center p-8 border-secondary hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-4 transition-colors group-hover:bg-primary/20">
                                    {category.icon}
                                </div>
                                <h3 className="font-headline text-xl font-semibold">{category.name}</h3>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-24 bg-secondary/20">
            <div className="container">
                 <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl font-bold">Trusted by a Thriving Community</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Hear what our clients and freelancers have to say about their experience.
                    </p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="p-6 bg-background">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-4 mb-4">
                                     <Avatar className="h-12 w-12 border-2 border-primary">
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person avatar" />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className="text-foreground/90 italic">&quot;{testimonial.quote}&quot;</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
      </main>

        {/* Footer */}
        <footer className="border-t border-border/40 py-8">
            <div className="container text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} NextGig. All rights reserved.</p>
                <p className="mt-2">A demo application built with Next.js and Firebase.</p>
            </div>
        </footer>
    </div>
  );
}
