import { Routes } from '@angular/router';
import { SuggestionComponent } from '../components/suggestion-component/suggestion-component';
import { RandomSuggestionComponent } from '../components/random-suggestion/random-suggestion';
import { SuggestionDetail } from '../components/suggestion-detail/suggestion-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/manage', pathMatch: 'full' },
  { path: 'manage', component: SuggestionComponent, title: 'Manage Suggestions' },
  { path: 'random', component: RandomSuggestionComponent, title: 'Random Suggestion' },
  { path: 'suggestion/:id', component: SuggestionDetail, title: 'Suggestion Details' },
  { path: '**', redirectTo: '/manage' }
];
