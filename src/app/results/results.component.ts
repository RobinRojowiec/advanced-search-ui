import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../model/search-result';
import { SearchContextService } from '../services/search-context.service';
import { SearchResults } from '../model/search-results';

@Component({
  selector: 'search-ui-results',
  templateUrl: './results.component.html',
  styleUrls: ['result.component.scss']
})
export class ResultsComponent implements OnInit {

  private results: SearchResults;
  private loading: boolean;

  constructor(private searchContextService: SearchContextService) {
    this.results = null;
    this.loading = false;

   }

  ngOnInit() {
    this.searchContextService.getIsLoading().subscribe(loading => this.loading = loading)
    this.searchContextService.getSearchResults().subscribe(results => this.results = results)
  }

}
