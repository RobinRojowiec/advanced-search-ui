import { Component, OnInit } from '@angular/core';
import { SearchContextService } from '../services/search-context.service';

@Component({
  selector: 'search-ui-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  private searchQuery: string = "";
  private loading: boolean;

  constructor(private searchContextService: SearchContextService) { }

  ngOnInit() {
    this.searchContextService.getIsLoading().subscribe(loading => this.loading)
  }

  public doSearch(event){
    if (event.key === "Enter"){
      if (this.searchQuery.length >= 3){
        this.searchContextService.search(this.searchQuery)
      }else{
        this.searchContextService.abort();
      }
    }
  }
}
