import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuggestionState } from './suggestion.state';
import { suggestionAdapter } from './suggestion.reducer';

// Feature selector
export const selectSuggestionState = createFeatureSelector<SuggestionState>('suggestions');

// Entity selectors
const { selectIds, selectEntities, selectAll, selectTotal } = suggestionAdapter.getSelectors();

// Base selectors
export const selectAllSuggestions = createSelector(selectSuggestionState, selectAll);
export const selectSuggestionEntities = createSelector(selectSuggestionState, selectEntities);
export const selectSuggestionIds = createSelector(selectSuggestionState, selectIds);
export const selectSuggestionsTotal = createSelector(selectSuggestionState, selectTotal);

// Loading and error selectors
export const selectSuggestionsLoading = createSelector(
  selectSuggestionState,
  (state) => state.loading
);

export const selectSuggestionsError = createSelector(
  selectSuggestionState,
  (state) => state.error
);

// Filter selectors
export const selectTypeFilter = createSelector(
  selectSuggestionState,
  (state) => state.typeFilter
);

// Selected suggestion selectors
export const selectSelectedSuggestionId = createSelector(
  selectSuggestionState,
  (state) => state.selectedSuggestionId
);

export const selectSelectedSuggestion = createSelector(
  selectSuggestionEntities,
  selectSelectedSuggestionId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

// Filtered suggestions selector
export const selectFilteredSuggestions = createSelector(
  selectAllSuggestions,
  selectTypeFilter,
  (suggestions, typeFilter) => {
    if (!typeFilter) {
      return suggestions;
    }
    return suggestions.filter(suggestion => suggestion.type === typeFilter);
  }
);

// Unique types selector
export const selectUniqueTypes = createSelector(
  selectAllSuggestions,
  (suggestions) => {
    const types = suggestions.map(s => s.type);
    return [...new Set(types)].sort();
  }
);

// Suggestion by ID selector
export const selectSuggestionById = (id: string) => createSelector(
  selectSuggestionEntities,
  (entities) => entities[id]
);
