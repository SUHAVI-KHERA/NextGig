
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { freelancers } from '@/lib/data';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, Sparkles, Film, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { generateVideoResume } from '@/app/(app)/settings/actions';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  bio: z.string().min(20, {
    message: 'Bio must be at least 20 characters.',
  }).max(300, {
    message: 'Bio must not be longer than 300 characters.',
  }),
   workHistory: z.string().min(20, {
    message: 'Work history must be at least 20 characters.',
  }),
  jobPreferences: z.string().min(20, {
    message: 'Job preferences must be at least 20 characters.',
  }),
  skills: z.string().min(2, {
    message: 'Please add at least one skill.',
  }),
  rate: z.coerce.number().min(1, {
    message: 'Rate must be a positive number.',
  }),
  videoScript: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This would typically be fetched for the logged-in user.
const userProfile = freelancers[0];

const defaultValues: Partial<ProfileFormValues> = {
  name: userProfile.name,
  title: userProfile.title,
  bio: userProfile.bio,
  workHistory: userProfile.workHistory,
  jobPreferences: userProfile.jobPreferences,
  skills: userProfile.skills.join(', '),
  rate: userProfile.rate,
  videoScript: `Hello, my name is ${userProfile.name}. As a ${userProfile.title}, I specialize in ${userProfile.skills.slice(0,2).join(' and ')}. I'm passionate about my work and I am looking for new opportunities. Let's create something amazing together.`,
};

export function SettingsForm() {
    const { toast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    function onSubmit(data: ProfileFormValues) {
        toast({
            title: 'Profile Updated!',
            description: 'Your changes have been saved successfully.',
            className: 'bg-primary text-primary-foreground border-primary',
        });
        console.log(data);
    }

    async function handleGenerateVideo() {
        setIsGenerating(true);
        setGenerationError(null);
        setGeneratedVideoUrl(null);

        const script = form.getValues('videoScript');
        if (!script || script.trim().length < 20) {
            setGenerationError("Please provide a script with at least 20 characters.");
            setIsGenerating(false);
            return;
        }
        
        toast({
            title: 'Video Generation Started!',
            description: "We're creating your video. This may take a few minutes...",
        });

        const result = await generateVideoResume({ script, freelancerId: userProfile.id });

        if (result.success && result.url) {
             toast({
                title: 'Video Ready!',
                description: "Your new AI-generated video resume is ready below.",
                className: "bg-primary text-primary-foreground border-primary",
            });
            setGeneratedVideoUrl(result.url);
        } else {
            setGenerationError(result.error ?? "An unknown error occurred during video generation.");
             toast({
                title: 'Generation Failed',
                description: result.error,
                variant: 'destructive',
            });
        }

        setIsGenerating(false);
    }

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Make changes to your public profile here. Click save when you're done.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Professional Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-y"
                                            rows={4}
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="skills"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Skills</FormLabel>
                                        <FormControl>
                                            <Input placeholder="React, TypeScript, Figma..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your skills separated by commas.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                        control={form.control}
                                        name="rate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hourly Rate ($)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="90" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                <FormField
                                    control={form.control}
                                    name="workHistory"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Work History</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Describe your past work experiences."
                                            rows={6}
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="jobPreferences"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Job Preferences</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Describe your ideal job or project."
                                            rows={4}
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
             <div className="lg:col-span-1 space-y-4">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Film /> AI Video Resume</CardTitle>
                        <CardDescription>Generate a short, professional video resume using AI. Write a script below or use the default.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form className="space-y-4">
                               <FormField
                                    control={form.control}
                                    name="videoScript"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Video Script</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Write your video script here..."
                                            className="resize-y"
                                            rows={8}
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" onClick={handleGenerateVideo} disabled={isGenerating} className="w-full">
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating... (this may take a minute)
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Generate Video
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                         {generationError && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertTitle>Generation Failed</AlertTitle>
                                <AlertDescription>{generationError}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
                {generatedVideoUrl && (
                     <Card>
                        <CardHeader>
                            <CardTitle>Generated Video</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video rounded-lg overflow-hidden border">
                                <video
                                    src={generatedVideoUrl}
                                    controls
                                    className="w-full h-full"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
