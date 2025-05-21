export interface ApplicationAnalysis {
    id: number;
    similarityScore: number;
    candidateName: string;
    jobOfferTitle: string;
    isValidated: boolean;
    isAssigningQuiz?: boolean; 
 //send quiz to candidate
    candidateEmail: string; 
    quizId?: number;   
      quizSent?: boolean; 
    isSendingQuiz?: boolean; 


  }