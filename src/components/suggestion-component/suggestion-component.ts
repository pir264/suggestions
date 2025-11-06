import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestion, CreateSuggestionRequest, UpdateSuggestionRequest } from '../../models/suggestion.model';

@Component({
  selector: 'app-suggestion-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './suggestion-component.html',
  styleUrl: './suggestion-component.scss',
})
export class SuggestionComponent implements OnInit {
  private readonly suggestionService = inject(SuggestionService);
  private readonly fb = inject(FormBuilder);

  suggestions = signal<Suggestion[]>([]);
  filteredSuggestions = signal<Suggestion[]>([]);
  availableTypes = signal<string[]>([]);
  selectedType = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  editingId = signal<string | null>(null);

  suggestionForm: FormGroup = this.fb.group({
    type: ['', [Validators.required, Validators.minLength(2)]],
    waarde: ['', [Validators.required, Validators.minLength(2)]]
  });

  ngOnInit() {
    this.loadSuggestions();
    this.loadAvailableTypes();
  }

  loadSuggestions() {
    this.loading.set(true);
    this.error.set(null);

    this.suggestionService.getAllSuggestions().subscribe({
      next: (suggestions) => {
        this.suggestions.set(suggestions);
        this.applyFilter();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load suggestions. Please try again.');
        this.loading.set(false);
        console.error('Error loading suggestions:', err);
      }
    });
  }

  loadAvailableTypes() {
    this.suggestionService.getUniqueTypes().subscribe({
      next: (types) => {
        this.availableTypes.set(types);
      },
      error: (err) => {
        console.error('Error loading types:', err);
      }
    });
  }

  onTypeFilterChange(type: string) {
    this.selectedType.set(type);
    this.applyFilter();
  }

  applyFilter() {
    const type = this.selectedType();
    const all = this.suggestions();
    if (!type) {
      this.filteredSuggestions.set(all);
    } else {
      this.filteredSuggestions.set(all.filter(s => s.type === type));
    }
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
    this.loading.set(true);
    this.error.set(null);

    this.suggestionService.createSuggestion(suggestion).subscribe({
      next: (newSuggestion) => {
        this.suggestions.update(suggestions => [...suggestions, newSuggestion]);
        this.applyFilter();
        this.loadAvailableTypes();
        this.resetForm();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to create suggestion. Please try again.');
        this.loading.set(false);
        console.error('Error creating suggestion:', err);
      }
    });
  }

  updateSuggestion(id: string, suggestion: UpdateSuggestionRequest) {
    this.loading.set(true);
    this.error.set(null);

    this.suggestionService.updateSuggestion(id, suggestion).subscribe({
      next: (updatedSuggestion) => {
        this.suggestions.update(suggestions =>
          suggestions.map(s => s.id === id ? updatedSuggestion : s)
        );
        this.applyFilter();
        this.loadAvailableTypes();
        this.resetForm();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to update suggestion. Please try again.');
        this.loading.set(false);
        console.error('Error updating suggestion:', err);
      }
    });
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

    this.loading.set(true);
    this.error.set(null);

    this.suggestionService.deleteSuggestion(id).subscribe({
      next: () => {
        this.suggestions.update(suggestions =>
          suggestions.filter(s => s.id !== id)
        );
        this.applyFilter();
        this.loadAvailableTypes();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to delete suggestion. Please try again.');
        this.loading.set(false);
        console.error('Error deleting suggestion:', err);
      }
    });
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
