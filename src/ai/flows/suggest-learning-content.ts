'use server';

/**
 * @fileOverview An AI agent that suggests relevant learning content based on quiz performance.
 *
 * - suggestLearningContent - A function that suggests learning content based on quiz performance.
 * - SuggestLearningContentInput - The input type for the suggestLearningContent function.
 * - SuggestLearningContentOutput - The return type for the suggestLearningContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLearningContentInputSchema = z.object({
  quizPerformance: z
    .string()
    .describe(
      'A description of the student’s quiz performance, including areas of strength and weakness.'
    ),
  lessonTopic: z.string().describe('The topic of the lesson.'),
  studentId: z.string().describe('The ID of the student.'),
});
export type SuggestLearningContentInput = z.infer<
  typeof SuggestLearningContentInputSchema
>;

const SuggestLearningContentOutputSchema = z.object({
  suggestedVideos: z
    .array(z.string())
    .describe('A list of suggested video URLs.'),
  suggestedSummaries: z
    .array(z.string())
    .describe('A list of suggested summary URLs.'),
  reasoning: z
    .string()
    .describe(
      'The AI’s reasoning for suggesting the videos and summaries, based on the quiz performance.'
    ),
});
export type SuggestLearningContentOutput = z.infer<
  typeof SuggestLearningContentOutputSchema
>;

export async function suggestLearningContent(
  input: SuggestLearningContentInput
): Promise<SuggestLearningContentOutput> {
  return suggestLearningContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLearningContentPrompt',
  input: {schema: SuggestLearningContentInputSchema},
  output: {schema: SuggestLearningContentOutputSchema},
  prompt: `You are an AI learning assistant. A student with the ID of {{{studentId}}} has just completed a quiz on the topic of {{{lessonTopic}}}. Based on their quiz performance, suggest relevant learning content to help them improve.

Quiz Performance: {{{quizPerformance}}}

Suggest a list of videos and summaries that would be helpful for the student. Provide a reasoning for your suggestions.

Videos:
{{#each suggestedVideos}}- {{this}}
{{/each}}

Summaries:
{{#each suggestedSummaries}}- {{this}}
{{/each}}

Reasoning: {{{reasoning}}}`,
});

const suggestLearningContentFlow = ai.defineFlow(
  {
    name: 'suggestLearningContentFlow',
    inputSchema: SuggestLearningContentInputSchema,
    outputSchema: SuggestLearningContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
