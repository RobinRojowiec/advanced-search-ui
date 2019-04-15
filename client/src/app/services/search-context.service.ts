import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../model/search-result';
import { SearchState } from '../model/search-state.enum';
import { SearchService } from './search.service';
import { SearchResults } from '../model/search-results';

@Injectable({
  providedIn: 'root'
})
export class SearchContextService {

  private searchResults : BehaviorSubject<SearchResults> = new BehaviorSubject(null)
  private isLoading: Subject<boolean> = new BehaviorSubject(false)
  private searchStatus : BehaviorSubject<SearchState> = new BehaviorSubject(SearchState.NONE)

  constructor(private searchService: SearchService) { }

  public search(query: string){
    this.isLoading.next(true)
    this.searchStatus.next(SearchState.QUERY)

    return this.searchService.search(query).subscribe(result => this.updateResults(result) );
  }

  public abort(){
    this.isLoading.next(false);
    this.searchStatus.next(SearchState.NONE)
  }

  public getSearchState(): Observable<SearchState>{
    return this.searchStatus.asObservable();
  }

  public getIsLoading(): Observable<boolean>{
    return this.isLoading.asObservable();
  }

  public getSearchResults(): Observable<SearchResults>{
    return this.searchResults.asObservable()
  }

  public updateResults(results: SearchResults){
    console.log(results);
    this.searchResults.next(results);
    this.isLoading.next(false);
  }
}
