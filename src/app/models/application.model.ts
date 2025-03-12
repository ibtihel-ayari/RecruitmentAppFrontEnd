export interface Application {
    id: number;
    cvFile: string; // Base64-encoded string for file storage
    photo: string;  // Base64-encoded string for image storage
    submissionDate: Date;
    status: string;
    isValidated: boolean;
    candidateId: number;
    userId: number;
    jobOfferId: number;
   // quiz?: Quiz; // Optional Quiz object
  }
  