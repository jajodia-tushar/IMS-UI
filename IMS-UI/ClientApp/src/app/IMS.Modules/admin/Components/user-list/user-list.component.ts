import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/IMS.Models/User/User';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';
import { Users } from 'src/app/IMS.Models/User/Users';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserManageDialogComponent } from '../user-manage-dialog/user-manage-dialog.component';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'email', 'role', 'actions'];
  ELEMENT_DATA: User[];

  dataSource

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private userManagementService:UserManagementService, public dialog: MatDialog) { }

  async ngOnInit() {
    await this.setUsers();
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

  editUserDetails(user){
    console.log(user);

    this.openDialog(user);
  }

  openDialog(data) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    // dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(UserManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deactivateUser(user){
    console.log(user);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    // dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DeactivateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 

  async setUsers(){
    let users : User[] =  (<Users>await this.userManagementService.getAllUsers()).users;
    console.log('set users')
    console.log(users);
    this.ELEMENT_DATA = users;
  }
}