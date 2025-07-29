'use server';

/**
 * @fileOverview Finds relevant job postings for a freelancer based on their profile.
 * 
 * - matchJobsForFreelancer - A function that returns job matches for a freelancer.
 * - MatchJobsInput - The input type for the matchJobsForFreelancer function.
 * - MatchJobsOutput - The return type for the matchJobsForFreelancer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { freelancers, jobs } from '@/lib/data';
import type { FreelancerProfile, JobPosting } from '@/lib/types';


const MatchJobsInputSchema = z.object({
  freelancerId: z.string().describe('The ID of the freelancer to match jobs for.'),
});
export type MatchJobsInput = z.infer<typeof MatchJobsInputSchema>;


const MatchedJobSchema = z.object({
    jobId: z.string().describe("The ID of the matched job posting."),
    reason: z.string().describe("A brief explanation of why this job is a good match for the freelancer."),
});

const MatchJobsOutputSchema = z.object({
  matchedJobs: z.array(MatchedJobSchema).describe('An array of matched jobs with explanations.'),
});
export type MatchJobsOutput = z.infer<typeof MatchJobsOutputSchema>;


export async function matchJobsForFreelancer(input: MatchJobsInput): Promise<MatchJobsOutput> {
  const result = await matchJobsFlow(input);
  // Augment the result with full job details
  const augmentedJobs = result.matchedJobs.map(match => {
      const jobDetails = jobs.find(j => j.id === match.jobId);
      return {
          ...match,
          job: jobDetails
      }
  }).filter(match => match.job); // Filter out any matches where job details couldn't be found

  return { matchedJobs: augmentedJobs as any[] };
}

const prompt = ai.definePrompt({
  name: 'matchJobsPrompt',
  input: {
      schema: z.object({
        freelancer: z.any(),
        jobs: z.any(),
    })
  },
  output: { schema: MatchJobsOutputSchema },
  prompt: `You are an expert AI recruiter. Your task is to find the most relevant jobs for a freelancer based on their profile.

Analyze the provided freelancer profile:
- Name: {{{freelancer.name}}}
- Title: {{{freelancer.title}}}
- Bio: {{{freelancer.bio}}}
- Skills: {{#each freelancer.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Work History: {{{freelancer.workHistory}}}
- Job Preferences: {{{freelancer.jobPreferences}}}

Now, review the following available job postings:
{{#each jobs}}
---
Job ID: {{{this.id}}}
Title: {{{this.title}}}
Company: {{{this.company}}}
Description: {{{this.description}}}
Required Skills: {{#each this.requiredSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Budget: {{{this.budget}}}
---
{{/each}}

Based on your analysis, identify the top 3-5 job postings that are the best fit for the freelancer. For each match, provide the 'jobId' and a concise 'reason' (1-2 sentences) explaining why it's a strong match, considering their skills, experience, and preferences. Focus on high-quality matches over quantity.
  `,
});

const matchJobsFlow = ai.defineFlow(
  {
    name: 'matchJobsFlow',
    inputSchema: MatchJobsInputSchema,
    outputSchema: MatchJobsOutputSchema,
  },
  async (input) => {
    const freelancer = freelancers.find(f => f.id === input.freelancerId);
    if (!freelancer) {
      throw new Error('Freelancer not found');
    }

    // In a real app, you might fetch jobs from a database here.
    const availableJobs = jobs;

    const { output } = await prompt({
        freelancer,
        jobs: availableJobs
    });
    return output!;
  }
);
