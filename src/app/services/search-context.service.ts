import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../model/search-result';
import { SearchState } from '../model/search-state.enum';

@Injectable({
  providedIn: 'root'
})
export class SearchContextService {

  private searchResults : BehaviorSubject<SearchResult[]> = new BehaviorSubject([])
  private isLoading: Subject<boolean> = new BehaviorSubject(false)
  private searchStatus : BehaviorSubject<SearchState> = new BehaviorSubject(SearchState.NONE)

  constructor() { }

  public search(query: string){
    this.isLoading.next(true)
    this.searchStatus.next(SearchState.QUERY)
  }

  public getSearchState(): Observable<SearchState>{
    return this.searchStatus.asObservable();
  }

  public getIsLoading(): Observable<boolean>{
    return this.isLoading.asObservable();
  }

  public getSearchResults(): Observable<SearchResult[]>{
    return this.searchResults.asObservable()
  }

  public updateResults(results: SearchResult[]){
    this.searchResults.next(results);
  }
}
