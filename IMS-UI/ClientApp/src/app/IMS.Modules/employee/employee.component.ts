import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CentralizedDataService } from 'src/app/IMS.Services/centralized-data.service';
import { SessionService } from 'src/app/IMS.Services/session.service';
import { SessionResponse } from 'src/app/IMS.Models/SessionResponse';
import { EmployeeService } from 'src/app/IMS.Services/employee.service';
import { EmployeeResponse } from 'src/app/IMS.Models/EmployeeResponse';
import { LoadSessionOnRefreshComponent } from 'src/app/IMS.Services/load-session-on-refresh/load-session-on-refresh.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private router : Router, private centralizedRepo : CentralizedDataService,
   private loadSessionOnRefresh : LoadSessionOnRefreshComponent, private employeeService : EmployeeService){}
    
    ShelfName : string;
    employeeID: string;
    buttonName : string = "NEXT";
    errorMessage : string= "";
   
  async ngOnInit() {
    if(this.centralizedRepo.getShelf() == null){
      await this.loadSessionOnRefresh.loadDataEmployeePageRefresh();
      this.ShelfName = this.centralizedRepo.getShelf().name;
    }
    else{
      this.ShelfName = this.centralizedRepo.getShelf().name;
    }
  }

  employeeValidation() {
    this.errorMessage = "";
    if(this.employeeID == null || this.employeeID == ""){
      this.errorMessage = "Enter Employee Id";
      return;
    }
    this.employeeService.employeeIdValidation(this.employeeID).subscribe(
      employeeResponse => {
        if (employeeResponse.employee == null || employeeResponse.employee.isActive == false){
            this.errorMessage = "Invalid Employee Id"
            this.buttonName = "Try Again";
        }
        else{
          this.centralizedRepo.setEmployee(employeeResponse.employee);
          this.router.navigateByUrl('pickitem');
        }
      },
      err => {
        this.errorMessage = "Something Went Wrong";
      }
    );
  } 
}
