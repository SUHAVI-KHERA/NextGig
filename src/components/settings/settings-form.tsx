
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { FreelancerProfile } from '@/lib/types';
import { useState } from 'react';

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
import { Save } from 'lucide-react';
import { updateUserProfile } from '@/app/(app)/settings/actions';

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
  videoResumeUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function SettingsForm({ userProfile }: { userProfile: FreelancerProfile }) {
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);

    const defaultValues: Partial<ProfileFormValues> = {
      name: userProfile.name,
      title: userProfile.title,
      bio: userProfile.bio,
      workHistory: userProfile.workHistory,
      jobPreferences: userProfile.jobPreferences,
      skills: userProfile.skills.join(', '),
      rate: userProfile.rate,
      videoResumeUrl: userProfile.videoResumeUrl || '',
    };

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    async function onSubmit(data: ProfileFormValues) {
        setIsSaving(true);
        const result = await updateUserProfile(data);
        setIsSaving(false);

        if (result.success) {
            toast({
                title: 'Profile Updated!',
                description: 'Your changes have been saved successfully.',
                className: 'bg-primary text-primary-foreground border-primary',
            });
        } else {
             toast({
                title: 'Update Failed',
                description: result.message,
                variant: 'destructive',
            });
        }
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
              <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Make changes to your public profile here. Click save when you're done.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
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
                 <FormField
                control={form.control}
                name="videoResumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                     <FormControl>
                      <Input placeholder="https://example.com/your-video" {...field} />
                    </FormControl>
                    <FormDescription>
                        Link to a video resume you have hosted on a platform like YouTube or Vimeo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              </CardContent>
          </Card>

          <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </form>
      </Form>
    );
}
