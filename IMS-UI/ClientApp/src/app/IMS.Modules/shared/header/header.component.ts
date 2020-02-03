import { Component, OnInit, Input } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/IMS.Services/login/login.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name : string
  email : string;
  @Input() isUser : boolean;
  constructor(private centralizedRepo : CentralizedDataService,
    private router: Router, private loginService: LoginService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.isUser){
      this.name = this.centralizedRepo.getUser().firstname + 
      this.centralizedRepo.getUser().lastname;
      this.email = this.centralizedRepo.getUser().email;    
    }
  }

  changePassword()  {
    this.router.navigateByUrl('changePassword');
  }

  logout()  {
    this.loginService.logOut().subscribe(
      data => {
        if (data.status == "Success") {
          this.router.navigateByUrl("/login");
        }
        else {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 1000 * 2, data: { message: "Something Went Wrong" }
          });
        }
      }
    )
  }
}
