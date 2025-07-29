'use server';

/**
 * @fileOverview Generates a contextual chat response from a freelancer.
 *
 * - generateChatResponse - A function that generates a chat response.
 * - GenerateChatResponseInput - The input type for the generateChatResponse function.
 * - GenerateChatResponseOutput - The return type for the generateChatResponse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { FreelancerProfile } from '@/lib/types';

interface ChatMessage {
    sender: 'user' | 'freelancer';
    text: string;
}

const GenerateChatResponseInputSchema = z.object({
  freelancer: z.custom<FreelancerProfile>(),
  chatHistory: z.array(z.custom<ChatMessage>()),
});
export type GenerateChatResponseInput = z.infer<typeof GenerateChatResponseInputSchema>;

const GenerateChatResponseOutputSchema = z.object({
  response: z.string().describe("The AI-generated response from the freelancer."),
});
export type GenerateChatResponseOutput = z.infer<typeof GenerateChatResponseOutputSchema>;


export async function generateChatResponse(input: GenerateChatResponseInput): Promise<GenerateChatResponseOutput> {
  return generateChatResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatResponsePrompt',
  input: { schema: GenerateChatResponseInputSchema },
  output: { schema: GenerateChatResponseOutputSchema },
  prompt: `You are acting as a freelancer in a chat conversation with a potential client. Your name is {{{freelancer.name}}}, and you are a {{{freelancer.title}}}. Your skills include: {{#each freelancer.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.

Keep your responses concise, professional, and friendly. Your goal is to answer the client's questions and encourage them to hire you.

Here is the recent chat history (the last message is from the client):
{{#each chatHistory}}
**{{sender}}:** {{{text}}}
{{/each}}

Based on this conversation, generate the next response from your perspective as the freelancer.
  `,
});

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
