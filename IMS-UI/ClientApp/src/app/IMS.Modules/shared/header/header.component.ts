import { Component, OnInit, Input } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
    if(this.isUser){
      this.name = this.centralizedRepo.getUser().firstname + 
      this.centralizedRepo.getUser().lastname;
      this.email = this.centralizedRepo.getUser().email;    
    }
  }

  updatePassword()  {
    this.router.navigateByUrl('changePassword');
  }
}
