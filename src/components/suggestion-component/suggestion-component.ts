import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestion, CreateSuggestionRequest, UpdateSuggestionRequest } from '../../models/suggestion.model';
import { AppState } from '../../store/suggestion.state';
import * as SuggestionActions from '../../store/suggestion.actions';
import * as SuggestionSelectors from '../../store/suggestion.selectors';

@Component({
  selector: 'app-suggestion-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './suggestion-component.html',
  styleUrl: './suggestion-component.scss',
})
export class SuggestionComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly fb = inject(FormBuilder);

  // NgRx selectors as signals using toSignal
  suggestions = toSignal(this.store.select(SuggestionSelectors.selectAllSuggestions), { initialValue: [] });
  filteredSuggestions = toSignal(this.store.select(SuggestionSelectors.selectFilteredSuggestions), { initialValue: [] });
  availableTypes = toSignal(this.store.select(SuggestionSelectors.selectUniqueTypes), { initialValue: [] });
  loading = toSignal(this.store.select(SuggestionSelectors.selectSuggestionsLoading), { initialValue: false });
  error = toSignal(this.store.select(SuggestionSelectors.selectSuggestionsError), { initialValue: null });
  selectedType = toSignal(this.store.select(SuggestionSelectors.selectTypeFilter), { initialValue: '' });

  editingId = signal<string | null>(null);

  suggestionForm: FormGroup = this.fb.group({
    type: ['', [Validators.required, Validators.minLength(2)]],
    waarde: ['', [Validators.required, Validators.minLength(2)]]
  });

  ngOnInit() {
    this.store.dispatch(SuggestionActions.loadSuggestions());
  }

  refreshSuggestions() {
    this.store.dispatch(SuggestionActions.loadSuggestions());
  }

  onTypeFilterChange(type: string) {
    this.store.dispatch(SuggestionActions.setTypeFilter({ typeFilter: type }));
  }

  onSubmit() {
    if (this.suggestionForm.invalid) {
      this.suggestionForm.markAllAsTouched();
      return;
    }

    const formValue = this.suggestionForm.value;
    const editingId = this.editingId();

    if (editingId) {
      this.updateSuggestion(editingId, formValue);
    } else {
      this.createSuggestion(formValue);
    }
  }

  createSuggestion(suggestion: CreateSuggestionRequest) {
    this.store.dispatch(SuggestionActions.addSuggestion({ suggestion }));
    this.resetForm();
  }

  updateSuggestion(id: string, updateRequest: UpdateSuggestionRequest) {
    const suggestion: Suggestion = {
      id,
      ...updateRequest
    };
    this.store.dispatch(SuggestionActions.updateSuggestion({ suggestion }));
    this.resetForm();
  }

  editSuggestion(suggestion: Suggestion) {
    this.editingId.set(suggestion.id);
    this.suggestionForm.patchValue({
      type: suggestion.type,
      waarde: suggestion.waarde
    });
  }

  deleteSuggestion(id: string) {
    if (!confirm('Are you sure you want to delete this suggestion?')) {
      return;
    }

    this.store.dispatch(SuggestionActions.deleteSuggestion({ id }));
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.suggestionForm.reset();
    this.editingId.set(null);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.suggestionForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.suggestionForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}
