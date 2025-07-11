import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  private apiUrl = 'http://localhost:3000/answers';

  constructor(private http: HttpClient) {}

  createAnswer(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAnswers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
