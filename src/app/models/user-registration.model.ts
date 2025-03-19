export interface UserRegistration {
  Id?: number; 
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    Role: string; // 'candidate'
    BirthDate: Date;
  }