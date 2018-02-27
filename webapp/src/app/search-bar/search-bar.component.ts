import { Component, OnInit } from '@angular/core';
import { SearchApiService } from '../../services';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { NewSearch } from '../../actions/search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [SearchApiService]
})
export class SearchBarComponent implements OnInit {

  searchQuery: String;
  sessionId: String;
  constructor(
    private searchApi: SearchApiService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.store.select(state => state.auth).subscribe(auth => this.sessionId = auth.sessionId);
  }

  search() {
    this.searchApi.getSearchResults(this.searchQuery, this.sessionId.toString()).subscribe(
      success => this.handleSuccess(this.searchQuery, success),
      error => this.handleError(error)
    );
  }

  private handleSuccess(searchQuery: String, response: any) {
    console.log(response.result);
    this.store.dispatch(new NewSearch({
      query: searchQuery,
      result: response.result
    }));
  }
  private handleError(response: any) {
    console.log(response);
  }
}
