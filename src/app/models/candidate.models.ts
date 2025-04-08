
export interface Candidate {
      id: number; 
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: string; // 'candidate'
      birthDate: Date;
      Applications: any;    }