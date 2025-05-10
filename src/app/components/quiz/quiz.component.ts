import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.models';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobofferService } from '../../services/joboffer.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  quizzes: Quiz[] = [];
  isLoading = false;
  errorMessage = '';
  expandedQuizzes: { [key: number]: boolean } = {};

  selectedQuizId: number | null = null;
  jobOffers: any[] = [];
selectedJobOfferIdForFilter: number | null = null;

  constructor(private quizService: QuizService, private jobOfferService: JobofferService) {}

  ngOnInit(): void {
    this.fetchAllQuizzes();
      this.fetchJobOffers(); 

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

  // ✅ NEW: delete selected quiz by radio selection
  deleteSelectedQuiz() {
    if (this.selectedQuizId === null) {
      alert('Veuillez sélectionner un quiz à supprimer.');
      return;
    }

    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?');
    if (!confirmDelete) return;

    this.quizService.deleteQuiz(this.selectedQuizId).subscribe({
      next: () => {
        this.fetchAllQuizzes();
        this.selectedQuizId = null;
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du quiz', err);
        this.errorMessage = 'Erreur lors de la suppression du quiz.';
      }
    });
  }

  toggleExpand(quizId: number): void {
    this.expandedQuizzes[quizId] = !this.expandedQuizzes[quizId];
  }

  isExpanded(quizId: number): boolean {
    return !!this.expandedQuizzes[quizId];
  }
  fetchJobOffers() {
  this.jobOfferService.getJobOffer().subscribe({
    next: (data) => this.jobOffers = data,
    error: (err) => console.error('Erreur lors du chargement des offres', err)
  });
}

onJobOfferFilterChange() {
  if (this.selectedJobOfferIdForFilter) {
    this.quizService.getQuizzesByJobOfferId(this.selectedJobOfferIdForFilter).subscribe({
      next: (quizzes) => {
        console.log('Quizzes filtrés:', quizzes);  // 👈 Ajoute ceci
        this.quizzes = quizzes;
      },
      error: (err) => console.error('Erreur lors du filtrage des quiz', err)
    });
  } else {
    this.fetchAllQuizzes();
  }
}

}
