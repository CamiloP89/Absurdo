import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AnswerService } from '../../core/services/answer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('openAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  templateUrl: './question-form.component.html',
})
export class QuestionFormComponent implements OnChanges {
  @Input() autoOpen = false;// Controla si el formulario está abierto o cerrado
  isOpen = false; // Estado interno para animación
  showToast = false; // Controla la visibilidad del toast

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['autoOpen'] && changes['autoOpen'].currentValue) {
      this.isOpen = true; // Abre el formulario si autoOpen es true
    }
  }

  


  questions = [
    '¿Qué te motiva a diario?',
    '¿Cuál es tu meta para este año?',
    '¿Qué te hace feliz?',
  ];

  form = {
    name: '',
    question: this.questions[0],
    response: '',
  };

  constructor(private answerService: AnswerService, private router: Router) {}

  toggleBox() {
    this.isOpen = !this.isOpen;
  }

  submitForm() {
  console.log('Formulario enviado:', this.form);
  this.answerService.createAnswer(this.form).subscribe({
    next: () => {
      this.showToast = true; // Muestra el toast de éxito
      
      // Reiniciar el formulario
      this.form = {
        name: '',
        question: this.questions[0],
        response: '',
      };

      setTimeout(() => { this.showToast = false; }, 3000); // Oculta el toast después de 3 segundos
    },
    error: (err) => {
      console.error('Error al enviar respuesta:', err);
    },
  });

  
}

}
