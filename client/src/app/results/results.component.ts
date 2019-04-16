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
  private answer: {};
  private loading: boolean;
  private loading_answer: boolean;

  constructor(private searchContextService: SearchContextService) {
    this.results = null;
    this.answer = null;
    this.loading = false;
    this.loading_answer = false;
   }

  ngOnInit() {
    this.searchContextService.getIsLoadingAnswer().subscribe(loading => this.loading_answer = loading)
    this.searchContextService.getIsLoading().subscribe(loading => this.loading = loading)
    this.searchContextService.getSearchResults().subscribe(results => this.results = results)
    this.searchContextService.getAnswerResults().subscribe(answer => this.answer = answer)
  }

}
