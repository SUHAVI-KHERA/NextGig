'use server';

import { generateVideo, type GenerateVideoInput } from "@/ai/flows/generate-video";

export async function generateVideoResume(input: GenerateVideoInput) {
    try {
        const result = await generateVideo(input);
        if (result && result.videoUrl) {
            return { success: true, url: result.videoUrl };
        }
        return { success: false, error: 'AI did not return a video.' };
    } catch (error: any) {
        console.error('AI Video Generation Error:', error);
        return { success: false, error: error.message || 'An unexpected error occurred while generating the video.' };
    }
}
