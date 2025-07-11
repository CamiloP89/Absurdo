import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerService } from '../../core/services/answer.service';

interface FloatingAnswer {
  name: string;
  question: string;
  response: string;
  createdAt: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  colorClass: string;
}

const COLOR_CLASSES = [
  'border-pink-500 text-pink-300',
  'border-yellow-500 text-yellow-300',
  'border-blue-500 text-blue-300',
  'border-green-500 text-green-300',
  'border-red-500 text-red-300',
  'border-purple-500 text-purple-300'
];


@Component({
  selector: 'app-answers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answers-list.component.html',
})
export class AnswersListComponent implements OnInit, OnDestroy {
  answers: FloatingAnswer[] = [];
  isLoading = true;
  animationFrameId: number | undefined;

  constructor(private answerService: AnswerService) {}

    ngOnInit(): void {
    this.answerService.getAnswers().subscribe({
      next: (data) => {
        this.answers = data.map((a: any) => ({
          ...a,
          x: this.randomX(),
          y: this.randomY(),
          dx: this.randomSpeed(),
          dy: this.randomSpeed(),
          colorClass: this.getRandomColor(),
        }));
        this.isLoading = false;
        this.animate();
        this.colorCycle(); // comienza el ciclo de colores
      },
      error: (err) => {
        console.error('Error al obtener respuestas:', err);
        this.isLoading = false;
      },
    });
  }

  getRandomColor(): string {
  return COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)];
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId!);
  }

  randomX(): number {
    return Math.random() * (window.innerWidth - 300);
  }

  randomY(): number {
    return Math.random() * (window.innerHeight - 200);
  }

  randomSpeed(): number {
    return (Math.random() - 0.5) * 0.8; // velocidad suave
  }

  animate(): void {
    this.answers.forEach((a) => {
      a.x += a.dx;
      a.y += a.dy;

      // Rebote contra bordes
      if (a.x <= 0 || a.x >= window.innerWidth - 300) a.dx *= -1;
      if (a.y <= 0 || a.y >= window.innerHeight - 200) a.dy *= -1;
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

    // Alterna colores cada 3 segundos
  colorCycle(): void {
    setInterval(() => {
      this.answers.forEach((a) => {
        a.colorClass = this.getRandomColor();
      });
    }, 3000);
  }
}
