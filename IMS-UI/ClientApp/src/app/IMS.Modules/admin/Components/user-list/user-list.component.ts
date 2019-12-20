import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/IMS.Models/User/User';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';
import { Users } from 'src/app/IMS.Models/User/Users';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserManageDialogComponent } from '../user-manage-dialog/user-manage-dialog.component';

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

  ngOnInit() {
    this.setUsers();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
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
    // open same dialog box used for creating user
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
  } 

  async setUsers(){
    // let users : User[] =  await this.userManagementService.getAllUsers();
    let users : User[] = [
      {id:'1', username: 'aniket', role:{id:1,name:"Admin"}, firstname:'Aniket', lastname:'Singla',email:'1singlaaniket@gmail.com'},
      {id:'2', username: 'tushar', role:{id:2,name:"Clerk"}, firstname:'tushar', lastname:'Jajodio',email:'jajodia@gmail.com'},
      {id:'3', username: 'chaman', role:{id:3,name:"Shelf"}, firstname:'chaman', lastname:'chaudhwary',email:'chaman@gmail.com'},
      {id:'4', username: 'jaideb', role:{id:4,name:"SuperAdmin"}, firstname:'jaideb', lastname:'mandal',email:'jai@gmail.com'},
      {id:'5', username: 'rochit', role:{id:1,name:"Admin"}, firstname:'rochit', lastname:'aggarwal',email:'rochit@gmail.com'},
      {id:'6', username: 'ebran', role:{id:2,name:"Clerk"}, firstname:'ebran', lastname:'Khan',email:'ebran@gmail.com'},
    ];
    console.log('set users')
    this.ELEMENT_DATA = users;
  }
}