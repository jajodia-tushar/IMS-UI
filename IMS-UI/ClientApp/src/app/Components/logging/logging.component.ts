import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/IMS.Services/logging/logging.service';
import { LogsResponse } from 'src/app/IMS.Models/Logging/LogsResponse';
import { Logs } from 'src/app/IMS.Models/Logging/logs';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  
  displayedColumns: string[] = ['logId','userId', 'callType', 'request', 'response', 'severity', 'status', 'dateTime'];
  dataSource: Logs[];

  constructor(private loggingService: LoggingService) { }

  async ngOnInit() {
  this.dataSource = (<LogsResponse> await this.loggingService.getAllLogs()).logsRecords;
  }

}
