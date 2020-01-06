import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/IMS.Models/User/User';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';
import { Users } from 'src/app/IMS.Models/User/Users';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserManageDialogComponent } from '../user-manage-dialog/user-manage-dialog.component';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'email', 'role.name', 'actions'];
  ELEMENT_DATA: User[];
  isSuperAdmin : boolean;
  dataSource

  @Input() event:User;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private userManagementService:UserManagementService,
    public dialog: MatDialog,
    private centralizedRepo: CentralizedDataService,
    private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.setUsers();
    if(this.centralizedRepo.getUser().role.id==4)
      this.isSuperAdmin = true;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  openAddUserDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = null;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(UserManageDialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if(result==false){
        this.showErrorMessage("Create Failed or Cancelled",34)
      }
      else{
        if(this.isSuperAdmin){
          this.ELEMENT_DATA.push(<User>result);
          this.dataSource.data = this.ELEMENT_DATA;
          this.showSuccessMessage("User Was Created Successfully",12);
        }
        else{
          this.showSuccessMessage("User was Created and is up for Review By SuperAdmin",21)
        }
      }        
    });
  }

  editUserDetails(user:User){

    this.openUserEditDialog(user);
  }

  openUserEditDialog(data:User) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(UserManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result==false){
        this.showErrorMessage("User Update Cancelled or Failed",12);
      }
      else{
        this.editUserInTable(result);
      }
    });
  }

  deactivateUser(user){
    console.log(user);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    // dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DeactivateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.removeUserFromTableById(user.id);
        this.showSuccessMessage("User Account Was Deactivated Successfully",12)
      }
      else {
        this.showErrorMessage("Error in Deacting User",10)
      }
    });

  } 

  removeUserFromTableById(id){
    for( var index = 0; index < this.ELEMENT_DATA.length; index++){ 
      if ( this.ELEMENT_DATA[index].id === id) {
        this.ELEMENT_DATA.splice(index, 1); 
      }
   }
    this.dataSource.data = this.ELEMENT_DATA;  
  }

  editUserInTable(user){
    for( var index = 0; index < this.ELEMENT_DATA.length; index++){ 
      if ( this.ELEMENT_DATA[index].id === user.id) {
        this.ELEMENT_DATA[index] = user;
        break;
      }
   }
    this.dataSource.data = this.ELEMENT_DATA;
    this.showSuccessMessage("User Was Updated Successfully",12)
  }

  showErrorMessage(message: string, timeInSeconds){
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * timeInSeconds , data : { message : message }
    });
  }

  showSuccessMessage(message: string, timeInSeconds){
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * timeInSeconds , data : { message : message }
    });
  }

  async setUsers(){
    let users : User[] =  (<Users>await this.userManagementService.getAllUsers()).users;
    this.ELEMENT_DATA = users;
  }

  
}