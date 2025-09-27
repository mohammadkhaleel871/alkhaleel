'use server';

import { provideStudentDifficultyInsights } from '@/ai/flows/student-difficulty-insights';
import { suggestLearningContent } from '@/ai/flows/suggest-learning-content';
import type { StudentDifficultyInsightsInput } from '@/ai/flows/student-difficulty-insights';
import type { SuggestLearningContentInput } from '@/ai/flows/suggest-learning-content';

export async function getLearningContentSuggestions(input: SuggestLearningContentInput) {
  try {
    const result = await suggestLearningContent(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get suggestions.' };
  }
}

export async function getStudentDifficultyInsights(input: StudentDifficultyInsightsInput) {
  try {
    const result = await provideStudentDifficultyInsights(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get insights.' };
  }
}
