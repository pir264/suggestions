import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Suggestion } from '../models/suggestion.model';
import { SuggestionState } from './suggestion.state';
import * as SuggestionActions from './suggestion.actions';

export const suggestionAdapter: EntityAdapter<Suggestion> = createEntityAdapter<Suggestion>();

export const initialState: SuggestionState = suggestionAdapter.getInitialState({
  selectedSuggestionId: null,
  loading: false,
  error: null,
  typeFilter: ''
});

export const suggestionReducer = createReducer(
  initialState,

  // Load suggestions
  on(SuggestionActions.loadSuggestions, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SuggestionActions.loadSuggestionsSuccess, (state, { suggestions }) =>
    suggestionAdapter.setAll(suggestions, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SuggestionActions.loadSuggestionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load suggestion by ID
  on(SuggestionActions.loadSuggestionById, (state, { id }) => ({
    ...state,
    selectedSuggestionId: id,
    loading: true,
    error: null
  })),

  on(SuggestionActions.loadSuggestionByIdSuccess, (state, { suggestion }) =>
    suggestionAdapter.upsertOne(suggestion, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SuggestionActions.loadSuggestionByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add suggestion
  on(SuggestionActions.addSuggestion, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SuggestionActions.addSuggestionSuccess, (state, { suggestion }) =>
    suggestionAdapter.addOne(suggestion, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SuggestionActions.addSuggestionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update suggestion
  on(SuggestionActions.updateSuggestion, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SuggestionActions.updateSuggestionSuccess, (state, { suggestion }) =>
    suggestionAdapter.updateOne({ id: suggestion.id, changes: suggestion }, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SuggestionActions.updateSuggestionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete suggestion
  on(SuggestionActions.deleteSuggestion, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SuggestionActions.deleteSuggestionSuccess, (state, { id }) =>
    suggestionAdapter.removeOne(id, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SuggestionActions.deleteSuggestionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Filter actions
  on(SuggestionActions.setTypeFilter, (state, { typeFilter }) => ({
    ...state,
    typeFilter
  })),

  on(SuggestionActions.clearFilters, (state) => ({
    ...state,
    typeFilter: ''
  }))
);
