import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SuggestionService } from '../services/suggestion.service';
import * as SuggestionActions from './suggestion.actions';

@Injectable()
export class SuggestionEffects {
  private readonly actions$ = inject(Actions);
  private readonly suggestionService = inject(SuggestionService);

  loadSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionActions.loadSuggestions),
      switchMap(() =>
        this.suggestionService.getAllSuggestions().pipe(
          map(suggestions => SuggestionActions.loadSuggestionsSuccess({ suggestions })),
          catchError(error => of(SuggestionActions.loadSuggestionsFailure({
            error: error.message || 'Failed to load suggestions'
          })))
        )
      )
    )
  );

  loadSuggestionById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionActions.loadSuggestionById),
      switchMap(action =>
        this.suggestionService.getSuggestionById(action.id).pipe(
          map(suggestion => SuggestionActions.loadSuggestionByIdSuccess({ suggestion })),
          catchError(error => of(SuggestionActions.loadSuggestionByIdFailure({
            error: error.message || 'Failed to load suggestion'
          })))
        )
      )
    )
  );

  addSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionActions.addSuggestion),
      switchMap(action =>
        this.suggestionService.createSuggestion(action.suggestion).pipe(
          map(suggestion => SuggestionActions.addSuggestionSuccess({ suggestion })),
          catchError(error => of(SuggestionActions.addSuggestionFailure({
            error: error.message || 'Failed to add suggestion'
          })))
        )
      )
    )
  );

  updateSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionActions.updateSuggestion),
      switchMap(action =>
        this.suggestionService.updateSuggestion(action.suggestion.id, action.suggestion).pipe(
          map(suggestion => SuggestionActions.updateSuggestionSuccess({ suggestion })),
          catchError(error => of(SuggestionActions.updateSuggestionFailure({
            error: error.message || 'Failed to update suggestion'
          })))
        )
      )
    )
  );

  deleteSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionActions.deleteSuggestion),
      switchMap(action =>
        this.suggestionService.deleteSuggestion(action.id).pipe(
          map(() => SuggestionActions.deleteSuggestionSuccess({ id: action.id })),
          catchError(error => of(SuggestionActions.deleteSuggestionFailure({
            error: error.message || 'Failed to delete suggestion'
          })))
        )
      )
    )
  );
}
