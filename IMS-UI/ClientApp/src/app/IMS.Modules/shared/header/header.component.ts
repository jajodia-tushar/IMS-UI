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
      this.name = this.centralizedRepo.employee.firstname + 
        this.centralizedRepo.employee.lastname;

      this.email = this.centralizedRepo.employee.email;
  }

}
