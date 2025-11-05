import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuggestionComponent } from '../components/suggestion-component/suggestion-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuggestionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('suggestions');
}
