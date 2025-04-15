import { Application } from "./application.model";

export interface JobOffer {
    id: number;
    title: string;
    description?: string;
    location: string;
    requirements?: string;
    technicalSkills?: string;       // Compétences techniques
    workExperience?: string;        // Expérience professionnelle
    academicBackground?: string;    // Formation académique
    languagesSpoken?: string;       // Langues maîtrisées
    type?: string;                  // Stage ou Emploi
    publicationDate: Date;
    applications: Application[];  
  }
  