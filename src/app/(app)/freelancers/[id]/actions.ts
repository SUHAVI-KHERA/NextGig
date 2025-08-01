
'use server';
import type { FreelancerProfile } from '@/lib/types';
import { generateChatResponse, type GenerateChatResponseInput } from '@/ai/flows/generate-chat-response';


interface ChatMessage {
  sender: 'user' | 'freelancer';
  text: string;
}

export async function getSimpleAiResponse(freelancer: FreelancerProfile, chatHistory: ChatMessage[]) {
    try {
        const result = await generateChatResponse({ freelancer, chatHistory });
        if (result && result.response) {
            return { success: true, response: result.response };
        }
        return { success: false, error: 'AI did not return a response.' };
    } catch (error) {
        console.error('AI Chat Response Error:', error);
        return { success: false, error: 'An unexpected error occurred while generating the AI response.' };
    }
}
