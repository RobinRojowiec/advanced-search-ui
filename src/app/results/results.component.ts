import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../model/search-result';
import { SearchContextService } from '../services/search-context.service';

@Component({
  selector: 'search-ui-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  private results: SearchResult[];
  private loading: boolean;

  constructor(private searchContextService: SearchContextService) {
    this.results = [];
    this.loading = false;

   }

  ngOnInit() {
    this.searchContextService.getIsLoading().subscribe(loading => this.loading = loading)
  }

}
