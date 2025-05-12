import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.models';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobOffer } from '../../models/job-offer.model';
import { JobofferService } from '../../services/joboffer.service';

@Component({
  selector: 'app-quizgeneration',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './quizgeneration.component.html',
  styleUrl: './quizgeneration.component.css'
})
export class QuizgenerationComponent implements OnInit {
  jobOfferId: number | null = null;
  jobOffers: JobOffer[] = [];

  generatedQuiz: Quiz[] = [];
  applicationId: number | null = null;

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private quizService: QuizService,private jobofferService: JobofferService, private router:Router) {}

  moduleInputs: { [key: string]: number } = {
    'Technique': 0,
    'Comportementale': 0,
    "Culture d'entreprise": 0
  };

  ngOnInit() {
  this.jobofferService.getJobOffer().subscribe({
    next: (offers) => {
      this.jobOffers = offers;
    },
    error: (err) => {
      console.error("Erreur lors du chargement des offres :", err);
    }
  });
}

  
  generateQuiz() {
    if (!this.jobOfferId) {
      this.errorMessage = 'Veuillez saisir un ID d\'offre.';
      return;
    }
  
    const moduleDistributions: { [key: string]: number } = {};
    let hasValidModule = false;
  
    for (const key in this.moduleInputs) {
      const value = this.moduleInputs[key];
      if (value && value > 0) {
        moduleDistributions[key] = value;
        hasValidModule = true;
      }
    }
  
    if (!hasValidModule) {
      this.errorMessage = 'Veuillez saisir au moins une valeur pour les modules.';
      return;
    }
  
    const payload = {
      jobOfferId: this.jobOfferId,
      moduleDistributions: moduleDistributions
    };
  
    this.isLoading = true;
    this.quizService.generateQuiz(payload).subscribe({
      next: (response) => {
        // Vérification et transformation des données
        if (Array.isArray(response)) {
          this.generatedQuiz = response.map((quizItem: any) => ({
            id: quizItem.id || 0,
            applicationId: quizItem.applicationId || 0,
            jobOfferId: this.jobOfferId!,
            questions: Array.isArray(quizItem.questions) 
              ? quizItem.questions.map((question: any) => ({
                  id: question.id || 0,
                  text: question.text || '',
                  correctAnswer: question.correctAnswer || '',
                  module: question.module || question.moduleName || '',
                  options: Array.isArray(question.options)
                    ? question.options.map((opt: any) => ({
                        id: opt.id || 0,
                        optionText: typeof opt === 'string' ? opt : (opt.optionText || '')
                      }))
                    : []
                }))
              : []
          }));
        } else {
          // Si la réponse n'est pas un tableau
          this.generatedQuiz = [{
            id: response.id || 0,
            jobOfferId: this.jobOfferId!,
            applicationId: response.applicationId || 0,
            questions: Array.isArray(response.questions)
              ? response.questions.map((question: any) => ({
                  // même transformation que ci-dessus
                }))
              : []
          }];
        }
  
        this.successMessage = 'Quiz généré avec succès.';
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la génération du quiz.';
        this.isLoading = false;
        console.error('Erreur détaillée:', err);
      }
    });
  }
  
  saveQuiz() {
    // Réinitialisez les messages
    this.successMessage = '';
    this.errorMessage = '';
  
    if (!this.generatedQuiz.length) {
      this.errorMessage = 'Aucun quiz à enregistrer';
      return;
    }
  
  
    try {
      const quizToSave = this.generatedQuiz.map(quiz => ({
        id: quiz.id || 0,
        applicationId: this.applicationId!,
        jobOfferId: this.jobOfferId!,
        questions: quiz.questions.map(q => ({
          id: q.id || 0,
          text: q.text,
          correctAnswer: q.correctAnswer,
          moduleName: q.module, 
          options: Array.isArray(q.options)
            ? q.options.map(opt => ({
                id: opt.id || 0,
                optionText: typeof opt === 'string' ? opt : opt.optionText
              }))
            : []
        }))
      }));
  
      this.quizService.saveGeneratedQuiz(quizToSave).subscribe({
        next: () => {
          this.successMessage = 'Quiz enregistré avec succès.';
          this.errorMessage = '';
          console.log('Quiz enregistré avec succès.', quizToSave);

          // Réinitialisez le quiz si nécessaire
          // this.generatedQuiz = [];
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage = 'Erreur lors de l\'enregistrement du quiz.';
          console.error('Erreur détaillée:', err);
        }
      });
    } catch (error) {
      this.successMessage = '';
      this.errorMessage = 'Erreur de format des données du quiz';
      console.error('Erreur de transformation:', error);
    }
  }
  goBack(): void {
    this.router.navigate(['/quiz']);}
}