import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecentEntriesResponse } from '../IMS.Models/RecentEntriesResponse';

@Injectable({
  providedIn: 'root'
})
export class RecentEntriesService {
  getRecentEntries() {
    return this._http.get<RecentEntriesResponse>("recentEntry");
  }

  constructor(private _http: HttpClient) { }
}
