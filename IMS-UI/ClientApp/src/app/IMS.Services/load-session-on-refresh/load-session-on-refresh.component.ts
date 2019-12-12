import { Component, OnInit } from '@angular/core';
import { SessionResponse } from 'src/app/IMS.Models/SessionResponse';
import { CentralizedDataService } from '../centralized-data.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-load-session-on-refresh',
  templateUrl: './load-session-on-refresh.component.html',
  styleUrls: ['./load-session-on-refresh.component.css']
})
export class LoadSessionOnRefreshComponent implements OnInit {
  constructor(private CentralizedRepo : CentralizedDataService, private sessionService : SessionService) { }

  ngOnInit() {
  }

 async loadDataEmployeePageRefresh(){
    let sessionResponse : SessionResponse = <SessionResponse> await this.sessionService.isAuthenticated();
      await this.CentralizedRepo.setShelfByShelfCode(sessionResponse.shelfCode);
  }

  async loadDataOnUserPageRefresh(){
    let sessionResponse : SessionResponse = <SessionResponse> await this.sessionService.isAuthenticated();
    this.CentralizedRepo.setUser(sessionResponse.user);
  }
}
