import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  @Input() scrollTargetId = ''; // Para scroll suave
  @Output() onOpenCofre = new EventEmitter<void>();

      scrollToForm() {
      if (this.scrollTargetId) {
        const element = document.getElementById(this.scrollTargetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
}
