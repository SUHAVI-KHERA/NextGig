'use server';

/**
 * @fileOverview Generates a professional job description and suggests skills based on a title and responsibilities.
 *
 * - generateJobDescription - A function that generates job details.
 * - GenerateJobDescriptionInput - The input type for the function.
 * - GenerateJobDescriptionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateJobDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the job.'),
  responsibilities: z
    .string()
    .describe('A brief list of key responsibilities for the role.'),
});
export type GenerateJobDescriptionInput = z.infer<typeof GenerateJobDescriptionInputSchema>;

const GenerateJobDescriptionOutputSchema = z.object({
  description: z.string().describe('The full, professionally written job description.'),
  suggestedSkills: z
    .array(z.string())
    .describe('An array of recommended skills for this job.'),
});
export type GenerateJobDescriptionOutput = z.infer<typeof GenerateJobDescriptionOutputSchema>;

export async function generateJobDescription(
  input: GenerateJobDescriptionInput
): Promise<GenerateJobDescriptionOutput> {
  return generateJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobDescriptionPrompt',
  input: { schema: GenerateJobDescriptionInputSchema },
  output: { schema: GenerateJobDescriptionOutputSchema },
  prompt: `You are an expert AI recruitment assistant. Your task is to generate a compelling and professional job posting.

Job Title: {{{title}}}

Key Responsibilities:
{{{responsibilities}}}

Based on the title and responsibilities, please generate:
1.  A complete and engaging job 'description' that outlines the role, requirements, and what makes the opportunity attractive. The description should be well-structured and formatted with paragraphs.
2.  A list of 'suggestedSkills' (e.g., specific programming languages, software, or soft skills) that are most relevant for this position.
`,
});

const generateJobDescriptionFlow = ai.defineFlow(
  {
    name: 'generateJobDescriptionFlow',
    inputSchema: GenerateJobDescriptionInputSchema,
    outputSchema: GenerateJobDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
