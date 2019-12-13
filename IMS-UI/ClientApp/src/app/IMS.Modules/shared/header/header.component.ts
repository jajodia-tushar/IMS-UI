import { Component, OnInit, Input } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/centralized-data.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name : string
  email : string;
  @Input() isUser : boolean;
  constructor(private centralizedRepo : CentralizedDataService) { }

  ngOnInit() {
    if(this.isUser){
      this.name = this.centralizedRepo.getUser().firstname + 
      this.centralizedRepo.getUser().lastname;
      this.email = this.centralizedRepo.getUser().email;
    }
  }

}
