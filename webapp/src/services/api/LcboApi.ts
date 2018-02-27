import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LCBO_API_BASE } from '../variables';

@Injectable()
export class SearchApiService {

  private endpoint: String = LCBO_API_BASE;

  constructor(private http: HttpClient) { }

  public getSearchResults(query: String, accessToken: string) {
    const headers = new HttpHeaders().set('Authorization', accessToken);
    return this.http.get(this.endpoint.concat(encodeURI(query.toString())), {headers});
  }

}
