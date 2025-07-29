
'use server';
import type { FreelancerProfile } from '@/lib/types';
import { generateChatResponse } from '@/ai/flows/generate-chat-response';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs } from 'firebase/firestore';


interface ChatMessage {
  sender: 'user' | 'freelancer';
  text: string;
}

export async function sendMessage(freelancer: FreelancerProfile, conversationId: string, message: string) {
    try {
        const conversationRef = collection(db, 'chats', conversationId, 'messages');

        // Add user message to Firestore
        await addDoc(conversationRef, {
            sender: 'user',
            text: message,
            createdAt: serverTimestamp(),
        });

        // Get chat history for AI
        const q = query(conversationRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        const chatHistory = querySnapshot.docs.map(doc => doc.data() as ChatMessage);

        // Get AI response
        const result = await generateChatResponse({ freelancer, chatHistory });
        
        if (result && result.response) {
            // Add AI response to Firestore
            await addDoc(conversationRef, {
                sender: 'freelancer',
                text: result.response,
                createdAt: serverTimestamp(),
            });
             return { success: true };
        } else {
            // If AI fails, add an error message to chat
             await addDoc(conversationRef, {
                sender: 'freelancer',
                text: "I'm sorry, I seem to be having trouble connecting. Please try again in a moment.",
                createdAt: serverTimestamp(),
            });
            return { success: false, error: 'AI did not return a response.' };
        }

    } catch (error) {
        console.error('Send Message Error:', error);
         try {
            // Try to add an error message to the chat if possible
            const conversationRef = collection(db, 'chats', conversationId, 'messages');
             await addDoc(conversationRef, {
                sender: 'freelancer',
                text: "An unexpected error occurred. I can't continue this conversation right now.",
                createdAt: serverTimestamp(),
            });
        } catch (e) {
            console.error("Failed to add error message to chat:", e)
        }

        return { success: false, error: 'An unexpected error occurred while sending the message.' };
    }
}
