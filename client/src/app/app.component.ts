import { Component } from '@angular/core';
import { config } from './config/ui.config';

@Component({
  selector: 'search-ui-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = config.title;
}
