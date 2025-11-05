import { Routes } from '@angular/router';
import { SuggestionComponent } from '../components/suggestion-component/suggestion-component';
import { RandomSuggestionComponent } from '../components/random-suggestion/random-suggestion';

export const routes: Routes = [
  { path: '', redirectTo: '/manage', pathMatch: 'full' },
  { path: 'manage', component: SuggestionComponent, title: 'Manage Suggestions' },
  { path: 'random', component: RandomSuggestionComponent, title: 'Random Suggestion' },
  { path: '**', redirectTo: '/manage' }
];
