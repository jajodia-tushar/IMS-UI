import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CentralizedDataService } from 'src/app/IMS.Services/centralized-data.service';
import { SessionService } from 'src/app/IMS.Services/session.service';
import { SessionResponse } from 'src/app/IMS.Models/SessionResponse';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private router : Router, private centralizedRepo : CentralizedDataService,
    private sessionService : SessionService){}
    ShelfCode : string;

   
  async ngOnInit() {
    if(this.centralizedRepo.getShelf() == null){
      let sessionResponse : SessionResponse = <SessionResponse> await this.sessionService.isAuthenticated();
      await this.centralizedRepo.setShelfByShelfCode(sessionResponse.shelfCode);
      this.ShelfCode = this.centralizedRepo.getShelf().code;
    } 
    else{
      this.ShelfCode = this.centralizedRepo.getShelf().code;
    }
  }
}
