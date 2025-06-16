import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';

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
  candidateId = 1; // remplace dynamiquement selon l’utilisateur

  constructor(private http: HttpClient) {}

  async ngOnInit() {
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
      .then((stream) => {
        this.videoRef.nativeElement.srcObject = stream;
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

    // ➤ récupérer la photo enregistrée du candidat
    this.http.get(`https://localhost:44353/api/applications/GetApplicationById?id=${this.candidateId}`)
      .subscribe(async (app: any) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `https://localhost:44353${app.photoPath}`;

        img.onload = async () => {
          const labeledFace = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!labeledFace) {
            this.resultMessage = "Erreur lors de la détection sur la photo stockée.";
            return;
          }

          const distance = faceapi.euclideanDistance(
            detection.descriptor,
            labeledFace.descriptor
          );

          this.resultMessage = distance < 0.6
            ? "✅ Identité vérifiée. Vous pouvez passer le quiz."
            : "❌ Identité non reconnue.";
        };
      });
  }
}