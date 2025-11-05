import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion, CreateSuggestionRequest, UpdateSuggestionRequest } from '../models/suggestion.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3002/suggesties';

  getAllSuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.apiUrl);
  }

  getSuggestionById(id: string): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.apiUrl}/${id}`);
  }

  createSuggestion(suggestion: CreateSuggestionRequest): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.apiUrl, suggestion);
  }

  updateSuggestion(id: string, suggestion: UpdateSuggestionRequest): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.apiUrl}/${id}`, suggestion);
  }

  deleteSuggestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
