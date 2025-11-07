import { EntityState } from '@ngrx/entity';
import { Suggestion } from '../models/suggestion.model';

export interface SuggestionState extends EntityState<Suggestion> {
  selectedSuggestionId: string | null;
  loading: boolean;
  error: string | null;
  typeFilter: string;
}

export interface AppState {
  suggestions: SuggestionState;
}
