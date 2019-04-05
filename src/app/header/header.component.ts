import { Component, OnInit } from '@angular/core';
import { config } from '../config/ui.config';

@Component({
  selector: 'search-ui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  title = config.title;
  
  constructor() { }

  ngOnInit() {
  }

}
