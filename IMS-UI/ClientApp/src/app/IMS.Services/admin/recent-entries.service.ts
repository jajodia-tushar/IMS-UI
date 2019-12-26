import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecentEntriesResponse } from 'src/app/IMS.Models/Admin/RecentEntriesResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentEntriesService {
  getRecentEntries(): Observable<RecentEntriesResponse> {
    return this._http.get<RecentEntriesResponse>("recentEntry");
  }

  constructor(private _http: HttpClient) { }
}
