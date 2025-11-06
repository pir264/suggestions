import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestion } from '../../models/suggestion.model';

@Component({
  selector: 'app-suggestion-detail',
  imports: [CommonModule],
  templateUrl: './suggestion-detail.html',
  styleUrl: './suggestion-detail.scss',
})
export class SuggestionDetail implements OnInit {
  private readonly suggestionService = inject(SuggestionService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  suggestion = signal<Suggestion | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSuggestion(id);
    } else {
      this.error.set('No suggestion ID provided');
    }
  }

  loadSuggestion(id: string) {
    this.loading.set(true);
    this.error.set(null);

    this.suggestionService.getSuggestionById(id).subscribe({
      next: (suggestion) => {
        this.suggestion.set(suggestion);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load suggestion details. Please try again.');
        this.loading.set(false);
        console.error('Error loading suggestion:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/manage']);
  }
}
