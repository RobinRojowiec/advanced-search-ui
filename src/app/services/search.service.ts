import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { SearchResult } from '../model/search-result';
import { BehaviorSubject } from 'rxjs';
import { SearchResults } from '../model/search-results';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url: String = environment.url;
  private isMockResponse: boolean = true;
  private mockResponse = new BehaviorSubject<SearchResults>({
    "answers":[{"text":"test answer","confidence":0.9}, {"text":"test answer 2","confidence":0.9}],
    "results":[{"title":"title","highlights":["first <b>high</b>light"],"text":"text","score":0.6}],
    "total": 10
  });
  constructor(private http: HttpClient) { }

  public search(text: string){
    if (this.isMockResponse)
      return this.mockResponse.asObservable();
    return this.http.get<SearchResults>(this.url+"?query="+encodeURIComponent(text));
  }
}
