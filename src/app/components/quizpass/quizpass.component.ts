import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/quiz.models';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizpass',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quizpass.component.html',
  styleUrl: './quizpass.component.css'
})
export class QuizpassComponent implements OnInit {
  quizId!: number;
  applicationId!: number; // Récupère depuis route ou stockage
  questions: Question[] = [];
  currentIndex = 0;
  selectedAnswers: string[] = [];
  timer: number = 60;
  intervalId: any;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.quizId = +this.route.snapshot.paramMap.get('quizId')!;
  this.applicationId = +this.route.snapshot.paramMap.get('applicationId')!;

  // Vérifier si l'identité a été vérifiée
  const isVerified = localStorage.getItem(`faceVerified_${this.applicationId}`) === 'true';
  
  if (!isVerified) {
    alert("Vous devez d'abord vérifier votre identité avant de passer le quiz.");
    this.router.navigate(['/faceverification', this.applicationId]);
    return;
  }
  
  this.fetchQuiz();
}


  fetchQuiz() {
    this.quizService.getQuizById(this.quizId).subscribe((res) => {
      this.questions = res.questions;
      this.selectedAnswers = new Array(this.questions.length).fill('');
      this.startTimer();
    });
  }

startTimer() {
  this.timer = this.questions.length * 60;
  this.intervalId = setInterval(() => {
    this.timer--;
    if (this.timer <= 0) {
      clearInterval(this.intervalId);
      this.submitQuiz(); // temps écoulé = soumission automatique
    }
  }, 1000);
}


  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.submitQuiz();
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  get displayTime(): string {
  const minutes = Math.floor(this.timer / 60);
  const seconds = this.timer % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}



  selectAnswer(answer: string) {
    this.selectedAnswers[this.currentIndex] = answer;
  }


submitQuiz() {
  clearInterval(this.intervalId);
  const submission = {
    quizId: this.quizId,
    applicationId: this.applicationId,
    answers: this.selectedAnswers.map(a => ({ answerText: a }))
  };
  this.quizService.submitQuiz(submission).subscribe(res => {
    this.isSubmitted = true;
    // Supprimer la vérification après soumission
    localStorage.removeItem(`faceVerified_${this.applicationId}`);
    alert(`Quiz soumis avec succès ! Score: ${res.score}%`);
    this.router.navigate(['/merci']);
  });
}

}