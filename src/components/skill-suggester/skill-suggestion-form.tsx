'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSkillSuggestions } from '@/app/(app)/skill-suggester/actions';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  workHistory: z.string().min(50, 'Please provide more details about your work history.'),
  jobPreferences: z.string().min(20, 'Please provide more details about your job preferences.'),
});

type FormValues = z.infer<typeof formSchema>;

export function SkillSuggestionForm() {
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workHistory: '',
      jobPreferences: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setSuggestedSkills([]);
    
    const result = await getSkillSuggestions(values);

    if (result.success) {
      setSuggestedSkills(result.skills ?? []);
    } else {
      setError(result.error ?? 'An unknown error occurred.');
    }
    
    setIsLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Get AI Skill Suggestions</CardTitle>
          <CardDescription>
            Enter your work history and job preferences, and our AI will suggest relevant skills to add to your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="workHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Lead Developer at TechCorp (2018-2023), developed a large-scale e-commerce platform using React and TypeScript..."
                        rows={8}
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
                        placeholder="e.g., Interested in remote frontend roles, particularly in the SaaS and e-commerce sectors. Prefers working with modern tech stacks..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Suggest Skills
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="min-h-[200px] flex flex-col">
           <CardHeader>
            <CardTitle className="font-headline text-2xl">Suggested Skills</CardTitle>
            <CardDescription>
                Skills suggested by our AI based on your input will appear here.
            </CardDescription>
           </CardHeader>
           <CardContent className="flex-grow flex items-center justify-center">
             {isLoading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
             
             {!isLoading && error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
             )}

             {!isLoading && !error && suggestedSkills.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {suggestedSkills.map((skill, index) => (
                        <Badge key={index} variant="default" className="text-base px-4 py-2">{skill}</Badge>
                    ))}
                </div>
             )}

            {!isLoading && !error && suggestedSkills.length === 0 && (
                <p className="text-muted-foreground">Results will be shown here.</p>
            )}
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
