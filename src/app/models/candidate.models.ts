
export interface Candidate {
      id: number; 
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: string; // 'candidate'
      birthDate: Date;
      photo?: File | undefined;  // Base64-encoded string for image storage
      photoPath?:string; // Path to the image on the server
      Applications: any;    }