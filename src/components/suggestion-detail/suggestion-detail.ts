import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestion } from '../../models/suggestion.model';
import { AppState } from '../../store/suggestion.state';
import * as SuggestionActions from '../../store/suggestion.actions';
import * as SuggestionSelectors from '../../store/suggestion.selectors';

@Component({
  selector: 'app-suggestion-detail',
  imports: [CommonModule],
  templateUrl: './suggestion-detail.html',
  styleUrl: './suggestion-detail.scss',
})
export class SuggestionDetail implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  loading = toSignal(this.store.select(SuggestionSelectors.selectSuggestionsLoading), { initialValue: false });
  error = toSignal(this.store.select(SuggestionSelectors.selectSuggestionsError), { initialValue: null });
  suggestion = toSignal(this.store.select(SuggestionSelectors.selectSelectedSuggestion), { initialValue: null });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(SuggestionActions.loadSuggestionById({ id }));
    } else {
      // Navigate back if no ID provided
      this.router.navigate(['/manage']);
    }
  }

  goBack() {
    this.router.navigate(['/manage']);
  }
}
