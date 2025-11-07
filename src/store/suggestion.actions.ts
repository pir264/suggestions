import { createAction, props } from '@ngrx/store';
import { Suggestion, CreateSuggestionRequest } from '../models/suggestion.model';

// Load all suggestions
export const loadSuggestions = createAction('[Suggestion] Load Suggestions');

export const loadSuggestionsSuccess = createAction(
  '[Suggestion] Load Suggestions Success',
  props<{ suggestions: Suggestion[] }>()
);

export const loadSuggestionsFailure = createAction(
  '[Suggestion] Load Suggestions Failure',
  props<{ error: string }>()
);

// Load single suggestion by ID
export const loadSuggestionById = createAction(
  '[Suggestion] Load Suggestion By ID',
  props<{ id: string }>()
);

export const loadSuggestionByIdSuccess = createAction(
  '[Suggestion] Load Suggestion By ID Success',
  props<{ suggestion: Suggestion }>()
);

export const loadSuggestionByIdFailure = createAction(
  '[Suggestion] Load Suggestion By ID Failure',
  props<{ error: string }>()
);

// Add suggestion
export const addSuggestion = createAction(
  '[Suggestion] Add Suggestion',
  props<{ suggestion: CreateSuggestionRequest }>()
);

export const addSuggestionSuccess = createAction(
  '[Suggestion] Add Suggestion Success',
  props<{ suggestion: Suggestion }>()
);

export const addSuggestionFailure = createAction(
  '[Suggestion] Add Suggestion Failure',
  props<{ error: string }>()
);

// Update suggestion
export const updateSuggestion = createAction(
  '[Suggestion] Update Suggestion',
  props<{ suggestion: Suggestion }>()
);

export const updateSuggestionSuccess = createAction(
  '[Suggestion] Update Suggestion Success',
  props<{ suggestion: Suggestion }>()
);

export const updateSuggestionFailure = createAction(
  '[Suggestion] Update Suggestion Failure',
  props<{ error: string }>()
);

// Delete suggestion
export const deleteSuggestion = createAction(
  '[Suggestion] Delete Suggestion',
  props<{ id: string }>()
);

export const deleteSuggestionSuccess = createAction(
  '[Suggestion] Delete Suggestion Success',
  props<{ id: string }>()
);

export const deleteSuggestionFailure = createAction(
  '[Suggestion] Delete Suggestion Failure',
  props<{ error: string }>()
);

// Filter actions
export const setTypeFilter = createAction(
  '[Suggestion] Set Type Filter',
  props<{ typeFilter: string }>()
);

export const clearFilters = createAction('[Suggestion] Clear Filters');
