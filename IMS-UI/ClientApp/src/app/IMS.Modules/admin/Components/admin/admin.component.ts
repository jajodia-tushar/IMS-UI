import { Component, OnInit } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private centralizedRepo:CentralizedDataService) { }

  ngOnInit() {
    this.centralizedRepo.getLoggedInUser();
  }

}
