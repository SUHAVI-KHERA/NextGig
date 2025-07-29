'use server';

import { suggestSkillsForFreelancer, type SuggestSkillsInput } from '@/ai/flows/suggest-skills';

export async function getSkillSuggestions(input: SuggestSkillsInput) {
  try {
    const result = await suggestSkillsForFreelancer(input);
    if (result && result.suggestedSkills) {
        return { success: true, skills: result.suggestedSkills };
    }
    return { success: false, error: 'AI did not return any skills.' };
  } catch (error) {
    console.error('AI Skill Suggestion Error:', error);
    return { success: false, error: 'An unexpected error occurred while fetching skill suggestions.' };
  }
}
