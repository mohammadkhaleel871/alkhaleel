'use server';

/**
 * @fileOverview AI-driven performance analysis for instructors to identify student difficulties in specific lessons.
 *
 * - provideStudentDifficultyInsights - A function that provides insights into student difficulties.
 * - StudentDifficultyInsightsInput - The input type for the provideStudentDifficultyInsights function.
 * - StudentDifficultyInsightsOutput - The return type for the provideStudentDifficultyInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudentDifficultyInsightsInputSchema = z.object({
  lessonName: z.string().describe('The name of the lesson to analyze.'),
  studentQuizResults: z
    .array(z.object({studentId: z.string(), score: z.number()}))
    .describe('Array of student quiz results for the lesson.'),
  lessonContentSummary: z
    .string()
    .describe('A summary of the content covered in the lesson.'),
});
export type StudentDifficultyInsightsInput = z.infer<
  typeof StudentDifficultyInsightsInputSchema
>;

const StudentDifficultyInsightsOutputSchema = z.object({
  keyDifficulties: z
    .string()
    .describe(
      'A summary of the key difficulties students are facing in the lesson.'
    ),
  suggestedImprovements: z
    .string()
    .describe(
      'Suggestions for the instructor to improve the lesson or teaching approach.'
    ),
});
export type StudentDifficultyInsightsOutput = z.infer<
  typeof StudentDifficultyInsightsOutputSchema
>;

export async function provideStudentDifficultyInsights(
  input: StudentDifficultyInsightsInput
): Promise<StudentDifficultyInsightsOutput> {
  return provideStudentDifficultyInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studentDifficultyInsightsPrompt',
  input: {schema: StudentDifficultyInsightsInputSchema},
  output: {schema: StudentDifficultyInsightsOutputSchema},
  prompt: `You are an AI assistant designed to provide instructors with insights into student difficulties in specific lessons.

  Analyze the student quiz results and lesson content summary to identify areas where students are struggling.

  Based on your analysis, provide a summary of the key difficulties students are facing and suggest improvements for the instructor to enhance the lesson or teaching approach.

  Lesson Name: {{{lessonName}}}
  Lesson Content Summary: {{{lessonContentSummary}}}
  Student Quiz Results: {{#each studentQuizResults}}{{{studentId}}}: {{{score}}}, {{/each}}
  `,
});

const provideStudentDifficultyInsightsFlow = ai.defineFlow(
  {
    name: 'provideStudentDifficultyInsightsFlow',
    inputSchema: StudentDifficultyInsightsInputSchema,
    outputSchema: StudentDifficultyInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
