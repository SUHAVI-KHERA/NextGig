
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getJobDescriptionSuggestion } from '@/app/(app)/jobs/new/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  title: z.string().min(5, 'Please provide a descriptive job title.'),
  responsibilities: z
    .string()
    .min(30, 'Please list at least a few key responsibilities.'),
});

type FormValues = z.infer<typeof formSchema>;

export function JobCreatorForm() {
  const [generatedContent, setGeneratedContent] = useState<{
    description: string;
    suggestedSkills: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      responsibilities: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    const result = await getJobDescriptionSuggestion(values);

    if (result.success) {
      setGeneratedContent({
        description: result.description ?? '',
        suggestedSkills: result.suggestedSkills ?? [],
      });
    } else {
      setError(result.error ?? 'An unknown error occurred.');
    }

    setIsLoading(false);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Job Details</CardTitle>
          <CardDescription>
            Provide a title and the main responsibilities for the role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Senior Frontend Developer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="responsibilities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Responsibilities</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g.,- Develop and maintain web applications using React and TypeScript.\n- Collaborate with designers and backend engineers.\n- Write clean, testable code."
                        rows={6}
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
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate with AI
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="min-h-[200px] flex flex-col sticky top-24">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI-Generated Posting</CardTitle>
          <CardDescription>
            The generated job description and suggested skills will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          {isLoading && (
             <div className="flex-grow flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!isLoading && error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && generatedContent && (
            <div className="space-y-6">
                <div>
                    <h3 className="font-headline text-lg mb-2">Suggested Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {generatedContent.suggestedSkills.map((skill, index) => (
                            <Badge key={index} variant="default">{skill}</Badge>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="font-headline text-lg mb-2">Job Description</h3>
                    <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap rounded-md border bg-secondary/50 p-4">
                        {generatedContent.description}
                    </div>
                </div>
            </div>
          )}

          {!isLoading && !error && !generatedContent && (
             <div className="flex-grow flex items-center justify-center">
                <p className="text-muted-foreground">Results will be shown here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
