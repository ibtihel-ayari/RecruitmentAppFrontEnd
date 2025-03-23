
export interface Candidate {
      id: number; 
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: string; // 'candidate'
      birthdate: Date;
      Applications: any;    }