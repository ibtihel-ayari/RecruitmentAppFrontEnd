export interface QuizSubmission {
  quizId: number;
  applicationId: number;
  answers: { answerText: string }[];
}