import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/IMS.Models/User/User';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';
import { Users } from 'src/app/IMS.Models/User/Users';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserManageDialogComponent } from '../user-manage-dialog/user-manage-dialog.component';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { MatSnackBar } from '@angular/material';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'email', 'role.name', 'actions'];
  ELEMENT_DATA: User[];
  isSuperAdmin: boolean;
  dataSource

  @Input() event: User;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userManagementService: UserManagementService,
    public dialog: MatDialog,
    private centralizedRepo: CentralizedDataService,
    private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.setUsers();
    if (this.centralizedRepo.getUser().role.id == 4)
      this.isSuperAdmin = true;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    let roles = await this.userManagementService.getAllRolesFromService(true);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
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
    dialogConfig.panelClass = 'dialog-user-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(UserManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == false) {
        showMessage(this.snackBar, 2, "User Creation Failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
      }
      else if ('username' in result) {
        if (this.isSuperAdmin) {
          this.ELEMENT_DATA.push(<User>result);
          this.dataSource.data = this.ELEMENT_DATA;
          showMessage(this.snackBar, 2, "User Was Created Successfully", 'success');
        }
        else {
          showMessage(this.snackBar, 2, "User was Created and is up for Review By SuperAdmin", 'success');
        }
      }
    });
  }

  editUserDetails(user: User) {

    this.openUserEditDialog(user);
  }

  openUserEditDialog(data: User) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.panelClass = 'dialog-user-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(UserManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        showMessage(this.snackBar, 2, "User Updation Failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
      }
      else if ('username' in result) {
        this.editUserInTable(result);
      }

    });
  }

  deactivateUser(user) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    dialogConfig.panelClass = 'dialog-user-manage'
    const dialogRef = this.dialog.open(DeactivateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.removeUserFromTableById(user.id);
        showMessage(this.snackBar, 2, "User Account was Deleted Successfully", 'success');
      }
      else if (result == false) {
        showMessage(this.snackBar, 2, "Deleting User failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
      }
    });

  }

  removeUserFromTableById(id) {
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index].id === id) {
        this.ELEMENT_DATA.splice(index, 1);
        break;
      }
    }
    this.dataSource.data = this.ELEMENT_DATA;
  }

  editUserInTable(user) {
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index].id === user.id) {
        this.ELEMENT_DATA[index] = user;
        break;
      }
    }
    this.dataSource.data = this.ELEMENT_DATA;
    showMessage(this.snackBar, 2, "User Details Updated Successfully", 'success');
  }

  async setUsers() {
    let users: User[] = (<Users>await this.userManagementService.getAllUsers()).users;
    this.ELEMENT_DATA = users;
  }


}