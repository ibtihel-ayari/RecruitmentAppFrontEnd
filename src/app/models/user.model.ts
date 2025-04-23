export interface User {
      id: number; 
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: string; // 'user'
      photo?: File | undefined;  // Base64-encoded string for image storage
      photoPath?:string; // Path to the image on the server
    }