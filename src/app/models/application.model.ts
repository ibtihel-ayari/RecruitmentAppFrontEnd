export interface Application {
    id: number;
    cvFile: string; // Base64-encoded string for file storage
    cvFilePath: string; // Path to the file on the server

    photo: string;  // Base64-encoded string for image storage
    photoPath:string; // Path to the image on the server
    submissionDate: Date;
    status: string;
    isValidated: boolean;
    candidateId: number;
    userId: number;
    jobOfferId: number;
   // quiz?: Quiz; // Optional Quiz object
  }
  