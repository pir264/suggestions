import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

  getUniqueTypes(): Observable<string[]> {
    return this.getAllSuggestions().pipe(
      map(suggestions => {
        const types = suggestions.map(s => s.type);
        return [...new Set(types)].sort();
      })
    );
  }

  getRandomSuggestion(type?: string): Observable<Suggestion | null> {
    return this.getAllSuggestions().pipe(
      map(suggestions => {
        let filteredSuggestions = suggestions;

        if (type) {
          filteredSuggestions = suggestions.filter(s => s.type === type);
        }

        if (filteredSuggestions.length === 0) {
          return null;
        }

        const randomIndex = Math.floor(Math.random() * filteredSuggestions.length);
        return filteredSuggestions[randomIndex];
      })
    );
  }
}
