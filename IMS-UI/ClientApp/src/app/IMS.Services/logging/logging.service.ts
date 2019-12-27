import { Injectable } from '@angular/core';
import { Logs } from 'src/app/IMS.Models/Logging/logs';
import { LogsResponse } from 'src/app/IMS.Models/Logging/LogsResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  
  constructor(private http: HttpClient) { }
  getAllLogs(): Promise<LogsResponse> {
    return this.http.get<LogsResponse>("api/logs").toPromise();
  }
}
