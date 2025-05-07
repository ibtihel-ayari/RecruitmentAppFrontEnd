import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  quizzes: Quiz[] = [];
  isLoading = false;
  errorMessage = '';
  expandedQuizzes: { [key: number]: boolean } = {};


  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.fetchAllQuizzes();
  }

  fetchAllQuizzes() {
    this.isLoading = true;
    this.quizService.getQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        console.log('Liste des quizzes', this.quizzes);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des quiz.';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  deleteQuiz(quizId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      this.quizService.deleteQuiz(quizId).subscribe(() => {
        this.fetchAllQuizzes();
      });
    }
  }

toggleExpand(quizId: number): void {
  this.expandedQuizzes[quizId] = !this.expandedQuizzes[quizId];
}

isExpanded(quizId: number): boolean {
  return !!this.expandedQuizzes[quizId];
}

}
