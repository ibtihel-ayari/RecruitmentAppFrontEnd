import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faceverification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faceverification.component.html',
  styleUrl: './faceverification.component.css'
})
export class FaceverificationComponent implements OnInit {
 @ViewChild('video', { static: true }) videoRef!: ElementRef;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  resultMessage = '';
  applicationId!: number;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService
  ) {}

  async ngOnInit() {
    this.applicationId = Number(this.route.snapshot.paramMap.get('applicationId'));
    if (!this.applicationId) {
      this.resultMessage = "Application invalide.";
      return;
    }

    // Charger les modèles puis démarrer la caméra
    await this.loadModels();
    this.startCamera();
  }

  async loadModels() {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models/tiny_face_detector'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models/face_landmark_68'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models/face_recognition')
    ]);
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => this.videoRef.nativeElement.srcObject = stream)
      .catch(err => {
        console.error("Erreur caméra :", err);
        this.resultMessage = "Impossible d'accéder à la caméra.";
      });
  }

  async verifyFace() {
    const video = this.videoRef.nativeElement;

    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      this.resultMessage = "Aucun visage détecté !";
      return;
    }

    this.applicationService.getApplicationById(this.applicationId).subscribe({
      next: async (app: Application) => {
        if (!app || !app.photoPath) {
          this.resultMessage = "Photo du candidat introuvable.";
          return;
        }

        const fullPhotoUrl = this.applicationService.getPhotoUrl(app.photoPath);
        console.log("URL photo candidat :", fullPhotoUrl);

        const img = new Image();
        img.crossOrigin = "anonymous";
img.src = fullPhotoUrl + '?t=' + new Date().getTime(); // Ajout d'un timestamp pour éviter le cache

        img.onload = async () => {
          const labeledFace = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!labeledFace) {
            this.resultMessage = "Erreur lors de la détection sur la photo.";
            return;
          }

          const distance = faceapi.euclideanDistance(detection.descriptor, labeledFace.descriptor);

          this.resultMessage = distance < 0.6
            ? "✅ Identité vérifiée. Vous pouvez passer le quiz."
            : "❌ Identité non reconnue.";
        };

        img.onerror = () => {
          this.resultMessage = "Erreur lors du chargement de la photo.";
        };
      },
      error: (err) => {
        console.error("Erreur récupération application :", err);
        this.resultMessage = "Erreur lors de la récupération de la candidature.";
      }
    });
  }
}