'use server';

/**
 * @fileOverview Suggests relevant skills to add to a freelancer's profile based on their work history and job preferences.
 *
 * - suggestSkillsForFreelancer - A function that suggests skills for a freelancer.
 * - SuggestSkillsInput - The input type for the suggestSkillsForFreelancer function.
 * - SuggestSkillsOutput - The return type for the suggestSkillsForFreelancer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillsInputSchema = z.object({
  workHistory: z
    .string()
    .describe('A detailed description of the freelancer\'s past work experiences.'),
  jobPreferences: z
    .string()
    .describe('The freelancer\'s preferred job types and industries.'),
});
export type SuggestSkillsInput = z.infer<typeof SuggestSkillsInputSchema>;

const SuggestSkillsOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('An array of skills suggested for the freelancer to add to their profile.'),
});
export type SuggestSkillsOutput = z.infer<typeof SuggestSkillsOutputSchema>;

export async function suggestSkillsForFreelancer(input: SuggestSkillsInput): Promise<SuggestSkillsOutput> {
  return suggestSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillsPrompt',
  input: {schema: SuggestSkillsInputSchema},
  output: {schema: SuggestSkillsOutputSchema},
  prompt: `You are an AI expert career advisor for freelancers. Your goal is to help them get hired.

  Based on the provided work history and job preferences, suggest a list of skills that the freelancer should add to their profile to improve their chances of matching with high-quality job opportunities. Be concise and only list the skills.

  Work History: {{{workHistory}}}
  Job Preferences: {{{jobPreferences}}}

  Ensure the suggested skills are commercially valuable and directly relevant to the freelancer's stated career goals.
  `, 
});

const suggestSkillsFlow = ai.defineFlow(
  {
    name: 'suggestSkillsFlow',
    inputSchema: SuggestSkillsInputSchema,
    outputSchema: SuggestSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
