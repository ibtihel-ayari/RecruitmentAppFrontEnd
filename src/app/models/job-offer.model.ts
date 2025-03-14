import { Application } from "./application.model";

export interface JobOffer {
    id: number;
    Title: string;
    description?: string;
    location?: string;
    requirements?: string;
    publicationDate: Date;
    applications: Application[];  
  }
  