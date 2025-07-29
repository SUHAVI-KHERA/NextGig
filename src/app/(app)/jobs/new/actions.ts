'use server';

import {
  generateJobDescription,
  type GenerateJobDescriptionInput,
} from '@/ai/flows/generate-job-description';

export async function getJobDescriptionSuggestion(input: GenerateJobDescriptionInput) {
  try {
    const result = await generateJobDescription(input);
    if (result) {
      return { success: true, ...result };
    }
    return { success: false, error: 'AI did not return a valid response.' };
  } catch (error) {
    console.error('AI Job Description Generation Error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while generating the job description.',
    };
  }
}
