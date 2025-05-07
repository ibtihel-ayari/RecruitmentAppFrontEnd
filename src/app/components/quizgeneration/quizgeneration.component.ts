import { Component } from '@angular/core';
import { Quiz } from '../../models/quiz.models';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quizgeneration',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './quizgeneration.component.html',
  styleUrl: './quizgeneration.component.css'
})
export class QuizgenerationComponent {
  jobOfferId: number | null = null;
  generatedQuiz: Quiz[] = [];
  applicationId: number | null = null;

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private quizService: QuizService) {}

  generateQuiz() {
    if (!this.jobOfferId) {
      this.errorMessage = 'Veuillez saisir un ID d\'offre.';
      return;
    }

    this.isLoading = true;
    this.quizService.generateQuiz({ jobOfferId: this.jobOfferId }).subscribe({
      next: (quiz) => {
        this.generatedQuiz = quiz;
        this.successMessage = '';
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la génération du quiz.';
        this.isLoading = false;
      }
    });
  }
  saveQuiz() {
    if (!this.generatedQuiz.length || !this.applicationId) return;
  
    const quizToSave: Quiz[] = this.generatedQuiz.map(quiz => ({
      id: 0,
      applicationId: this.applicationId!,
      questions: quiz.questions.map(q => ({
        id: 0,
        text: q.text,
        correctAnswer: q.correctAnswer,
        moduleName: typeof q.module === 'string' ? q.module : q.module?.name || '',
        options: q.options.map(opt => ({
          id: 0,
          optionText: typeof opt === 'string' ? opt : opt.optionText
        }))
      }))
    }));
  
    this.quizService.saveGeneratedQuiz(quizToSave).subscribe({
      next: () => {
        this.successMessage = 'Quiz enregistré avec succès.';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'enregistrement du quiz.';
      }
    });
  }
  
}