import { SearchResult } from './search-result';
import { Answer } from './answer';

export class SearchResults {
    answers: Answer[];
    results: SearchResult[];
    total: number;
}
