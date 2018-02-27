import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { ViewHistory, ViewHistoryApi } from '../../services';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
  providers: [ViewHistoryApi]
})
export class SearchListComponent implements OnInit {

  items: Observable<any[]>;
  userId: String;
  constructor(
    private store: Store<State>,
    private historyApi: ViewHistoryApi
  ) { }

  ngOnInit() {
    this.items = this.store.select(state => state.search.searchResults);
    this.store.select(state => state.auth.userId).subscribe(
      id => this.userId = id);
  }

  viewProduct(item: any) {
    window.open(item.image_url);
    const viewHistory: ViewHistory = {
      userId: this.userId.toString(),
      productId: item.id,
      url: item.image_url,
      viewDate: new Date(Date.now())
    };

    this.historyApi.viewHistoryCreate(viewHistory).subscribe(
      success => this.handleSuccess(item, success),
      error => console.log(error)
    );
  }
  private handleSuccess(item: any, success: any) {
    console.log(success);
    item.hasBeenViewed = true;

  }
}
