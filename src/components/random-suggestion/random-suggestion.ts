import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestion } from '../../models/suggestion.model';

@Component({
  selector: 'app-random-suggestion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './random-suggestion.html',
  styleUrl: './random-suggestion.scss',
})
export class RandomSuggestionComponent implements OnInit {
  private readonly suggestionService = inject(SuggestionService);
  private readonly fb = inject(FormBuilder);

  availableTypes = signal<string[]>([]);
  currentSuggestion = signal<Suggestion | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  noSuggestionsFound = signal<boolean>(false);

  filterForm: FormGroup = this.fb.group({
    selectedType: ['']
  });

  ngOnInit() {
    this.loadAvailableTypes();
  }

  loadAvailableTypes() {
    this.loading.set(true);
    this.error.set(null);

    this.suggestionService.getUniqueTypes().subscribe({
      next: (types) => {
        this.availableTypes.set(types);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load suggestion types. Please try again.');
        this.loading.set(false);
        console.error('Error loading types:', err);
      }
    });
  }

  getRandomSuggestion() {
    this.loading.set(true);
    this.error.set(null);
    this.noSuggestionsFound.set(false);
    this.currentSuggestion.set(null);

    const selectedType = this.filterForm.get('selectedType')?.value || undefined;

    this.suggestionService.getRandomSuggestion(selectedType).subscribe({
      next: (suggestion) => {
        if (suggestion) {
          this.currentSuggestion.set(suggestion);
        } else {
          this.noSuggestionsFound.set(true);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to get random suggestion. Please try again.');
        this.loading.set(false);
        console.error('Error getting random suggestion:', err);
      }
    });
  }

  clearFilter() {
    this.filterForm.patchValue({ selectedType: '' });
    this.currentSuggestion.set(null);
    this.noSuggestionsFound.set(false);
  }

  getSelectedTypeText(): string {
    const selectedType = this.filterForm.get('selectedType')?.value;
    return selectedType ? ` of type "${selectedType}"` : '';
  }
}
