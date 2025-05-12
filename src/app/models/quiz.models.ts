import { Application } from "./application.model";

export interface Quiz {
    id: number;
    applicationId: number;
    jobOfferId: number;
    application?: Application;
    questions: Question[];
    responses?: Response[];
  }
  
  export interface Question {
    id: number;
    text: string;
    correctAnswer: string;
    moduleId?: number;
    module?: Module | string;
    quizId?: number;
    quiz?: Quiz;
    options: Option[];
  }
  
  export interface Option {
    id: number;
    optionText: string;
    questionId?: number;
    question?: Question;
  }
  
  export interface Module {
    id: number;
    name: string;
    description: string;
    questions?: Question[];
  }
  
  export interface Response {
    id: number;
    answers: Answer[];
    quizId: number;
    quiz?: Quiz;
    score: number;
  }
  
  export interface Answer {
    id: number;
    answerText: string;
    responseId: number;
    response?: Response;
  }
  