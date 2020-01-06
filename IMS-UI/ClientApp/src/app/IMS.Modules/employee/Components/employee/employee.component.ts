import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { EmployeeService } from 'src/app/IMS.Services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private router : Router, private centralizedRepo : CentralizedDataService,private employeeService : EmployeeService){}
    
    ShelfName : string;
    employeeID: string;
    buttonName : string = "NEXT";
    errorMessage : string= "";
   
  async ngOnInit() {
    if(this.centralizedRepo.getShelf() == null){
      await this.centralizedRepo.loadSelectedShelf();
      this.ShelfName = this.centralizedRepo.getShelf().name;
    }
    else{
      this.ShelfName = this.centralizedRepo.getShelf().name;
    }
  }

  employeeValidation() {
    this.errorMessage = "";
    this.buttonName = "";
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
          this.router.navigateByUrl('employee/pickItem');
        }
      },
      err => {
        this.errorMessage = "Something Went Wrong";
      }
    );
  } 
}
