import { Component, OnInit } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';

@Component({
  selector: 'app-clerk',
  templateUrl: './clerk.component.html',
  styleUrls: ['./clerk.component.css']
})
export class ClerkComponent implements OnInit {
  public LoggedINClerk = "";
  constructor(private _CentralizedDataService: CentralizedDataService) { }

  async ngOnInit() {
    await this._CentralizedDataService.getLoggedInUser();
    this.LoggedINClerk = this._CentralizedDataService.getUser().firstname + " " + this._CentralizedDataService.getUser().lastname;
  }

}
