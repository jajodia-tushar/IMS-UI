import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { EmployeeService } from 'src/app/IMS.Services/employee/employee.service';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'isActive', 'mobileNumber' ,'tCardNo', 'actions'];
  ELEMENT_DATA: Employee[];

  dataSource

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private employeeService:EmployeeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.setEmployees();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    // this.dataSource.sortingDataAccessor = this.pathDataAccessor;
    console.log(this.ELEMENT_DATA)
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  // pathDataAccessor(item: any, path: string): any {
  //   return path.split('.')
  //     .reduce((accumulator: any, key: string) => {
  //       return accumulator ? accumulator[key] : undefined;
  //     }, item);
  // }
  // editEmployeeDetails(user){
  //   console.log(user);
  //   // open same dialog box used for creating user
  //   this.openDialog(user);
  // }



  deactivateEmployee(employee){
    console.log(employee);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = employee;
    // dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DeactivateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 

  async setEmployees(){
    // let employeess : Employees[] =  await this.employeeService.getAllEmployees();
    let employees : Employee[] = [
      {id:'1',  firstname:'Aniket', lastname:'Singla',email:'1singlaaniket@gmail.com',mobileNumber:87956944353, tCardNo:89786969798, isActive:true},
      {id:'2',  firstname:'tushar', lastname:'Jajodio',email:'jajodia@gmail.com',mobileNumber:87956944353, tCardNo:89786969798, isActive:true},
      {id:'3',  firstname:'chaman', lastname:'chaudhwary',email:'chaman@gmail.com',mobileNumber:87956944353, tCardNo:89786969798, isActive:true},
      {id:'4',  firstname:'jaideb', lastname:'mandal',email:'jai@gmail.com',mobileNumber:87956944353, tCardNo:89786969798, isActive:true},
      {id:'5',  firstname:'rochit', lastname:'aggarwal',email:'rochit@gmail.com',mobileNumber:87956944353, tCardNo:89786969798, isActive:true},
      {id:'6',  firstname:'ebran', lastname:'Khan',email:'ebran@gmail.com',mobileNumber:87956944353, tCardNo:89786969798, isActive:true},
    ];
    console.log('set Employees')
    this.ELEMENT_DATA = employees;
  }

}
