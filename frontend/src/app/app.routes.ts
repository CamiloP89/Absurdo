import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/question-form/question-form.component').then(
        (m) => m.QuestionFormComponent
      ),
  },
  {
    path: 'respuestas',
    loadComponent: () =>
      import('./pages/answers-list/answers-list.component').then(
        (m) => m.AnswersListComponent
      ),
  },
];
