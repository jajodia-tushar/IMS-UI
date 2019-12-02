import { Component, OnInit } from '@angular/core';
import { LoginService } from '../IMS.Services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
  }

  clicked() {
    this._loginService.getData().subscribe(
      data => {
        console.log(data);
      }

    )
  }

}
