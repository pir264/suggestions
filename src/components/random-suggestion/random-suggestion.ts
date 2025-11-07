import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestion } from '../../models/suggestion.model';
import { AppState } from '../../store/suggestion.state';
import * as SuggestionActions from '../../store/suggestion.actions';
import * as SuggestionSelectors from '../../store/suggestion.selectors';

@Component({
  selector: 'app-random-suggestion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './random-suggestion.html',
  styleUrl: './random-suggestion.scss',
})
export class RandomSuggestionComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly suggestionService = inject(SuggestionService);
  private readonly fb = inject(FormBuilder);

  // Use store for available types
  availableTypes = toSignal(this.store.select(SuggestionSelectors.selectUniqueTypes), { initialValue: [] });

  currentSuggestion = signal<Suggestion | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  noSuggestionsFound = signal<boolean>(false);

  filterForm: FormGroup = this.fb.group({
    selectedType: ['']
  });

  ngOnInit() {
    // Load suggestions to populate types in store
    this.store.dispatch(SuggestionActions.loadSuggestions());
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
