import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../IMS.Services/employee.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { PickItemComponent } from '../pick-item/pick-item.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public Emp_ID = "";
  public error = false;
  constructor(private _employeeService: EmployeeService, private router: Router) { }

  Validation() {
    this._employeeService.validate(this.Emp_ID).subscribe(
      res => {
        if (res.employee == null || res.employee.isActive == false)
          this.error=true;
        else
          this.router.navigateByUrl('/'+'pickitem'); 
      },
      err => {
        this.error=true;
      }
    );
    
  }
  

  ngOnInit() {
  }

}
