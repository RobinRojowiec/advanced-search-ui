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
  private _answerResults: BehaviorSubject<SearchResults> = new BehaviorSubject(null);

  private isLoading: Subject<boolean> = new BehaviorSubject(false)
  private isLoadingAnswer: Subject<boolean> = new BehaviorSubject(false)

  constructor(private searchService: SearchService) { }

  public search(query: string){
    this.isLoading.next(true)
    this.isLoadingAnswer.next(true)

    return this.searchService.search(query).subscribe(result => this.updateResults(query, result) );
  }

  public abort(){
    this.isLoading.next(false);
    this.isLoadingAnswer.next(false);
  }

  public getIsLoading(): Observable<boolean>{
    return this.isLoading.asObservable();
  }

  public getIsLoadingAnswer(): Observable<boolean>{
    return this.isLoadingAnswer.asObservable();
  }

  public getSearchResults(): Observable<SearchResults>{
    return this.searchResults.asObservable()
  }

  public getAnswerResults(): Observable<SearchResults> {
    return this._answerResults.asObservable();
  }

  public updateResults(query: string, results: SearchResults){
    this.searchResults.next(results);
    this.isLoading.next(false);

    this.searchService.get_answer(query, results[0]['text']).subscribe(answer => {
      console.log(answer)
      this._answerResults.next(answer);
      this.isLoadingAnswer.next(false)
    });
  }
}
