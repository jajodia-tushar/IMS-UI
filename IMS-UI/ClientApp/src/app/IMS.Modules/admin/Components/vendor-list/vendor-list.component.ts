import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Vendor } from 'src/app/IMS.Models/Vendor/vendor';
import { DataSource } from '@angular/cdk/table';
import { Observable, of } from 'rxjs';
import { VendorService } from 'src/app/IMS.Services/vendor/vendor.service';
import { Router } from '@angular/router';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { MatDialogConfig, MatDialog, MatSnackBar, MatSort, MatPaginator } from '@angular/material';
import { VendorManageDialogComponent } from '../vendor-manage-dialog/vendor-manage-dialog.component';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { PagingInfo } from 'src/app/IMS.Models/Shared/PagingInfo';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VendorListComponent implements OnInit {

  constructor(private _VendorService: VendorService, private router: Router,
    private centralizedRepo: CentralizedDataService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }
  displayedColumns = ['name', 'title', 'companyIdentificationNumber', 'contactNumber','actions'];
  dataSource: ExampleDataSource;
  isSuperAdmin: boolean;
  filterName: string="";
  nameSortAsc: boolean= false;
  titleSortAsc: boolean = false;
  cinSortAsc: boolean = false;
  displayMessage: string;
  displayErrorText: boolean;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  paginator: MatPaginator;
  pagingInfo: PagingInfo = new PagingInfo();

  openAddVendorDialog()
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {vendor:null,action:"add"};
    dialogConfig.panelClass = 'dialog-user-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(VendorManageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Vendor Creation Failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
      }
      else if (result[name]!== null) {
        vendordata.push(<Vendor>result);
        this.dataSource = new ExampleDataSource();
        showMessage(this.snackBar, 2, "Vendor Was Created Successfully", 'success');
      } 
    });

  }

  editVendorDetails(vendor: Vendor) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = { vendor: vendor, action: "edit" };
    dialogConfig.panelClass = 'dialog-user-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(VendorManageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Vendor upadation Failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
      }
      else if (result[name] !== null) {
        let index = this.indexOfVendor(result);
        vendordata[index] = result;
        this.dataSource = new ExampleDataSource();
        showMessage(this.snackBar, 2, "Vendor Was updated Successfully", 'success');
      }
    });
  }
  indexOfVendor(vendor: Vendor) {
    for (var index = 0; index < vendordata.length; index++) {
      if (vendordata[index].id === vendor.id) {
        return index;
      }
    }
  }

  deactivateVendor(vendor: Vendor) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = { vendor: vendor, action: "delete" };
    dialogConfig.panelClass = 'dialog-user-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(VendorManageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        let index = this.indexOfVendor(vendor);
        vendordata.splice(index, 1);
        this.dataSource = new ExampleDataSource();
        showMessage(this.snackBar, 2, "Vendor was Deleted Successfully", 'success');
      }
      else if (result == "false") {
        showMessage(this.snackBar, 2, "Deleting Vendor failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
      }
    });
  }

  sortByName() {
    if (!this.nameSortAsc) {
      vendordata.sort((a, b) => a.name.localeCompare(b.name));
      this.nameSortAsc = true;
    }
    else {
      vendordata.sort((a, b) => a.name.localeCompare(b.name)).reverse();
      this.nameSortAsc = false;
    }
    this.dataSource = new ExampleDataSource();
  }
  sortByTitle() {
    if (!this.titleSortAsc) {
      vendordata.sort((a, b) => a.title.localeCompare(b.title));
      this.titleSortAsc = true;
    }
    else {
      vendordata.sort((a, b) => a.title.localeCompare(b.title)).reverse();
      this.titleSortAsc = false;
    }
    this.dataSource = new ExampleDataSource();
  }
  sortByCin() {
    if (!this.cinSortAsc) {
      vendordata.sort((a, b) => a.companyIdentificationNumber.localeCompare(b.companyIdentificationNumber));
      this.cinSortAsc = true;
    }
    else {
      vendordata.sort((a, b) => a.companyIdentificationNumber.localeCompare(b.companyIdentificationNumber)).reverse();
      this.cinSortAsc = false;
    }
    this.dataSource = new ExampleDataSource();
  }

 async pageChange(event) {
   await this._VendorService.getVendorOnPagination(this.filterName, event.pageIndex + 1, event.pageSize).subscribe(
     data => {
       if (data.status === "Success") {
         this.displayErrorText = false;
         vendordata = data.vendors;
         if (vendordata.length > 0) {
           this.dataSource = new ExampleDataSource();
         }
         else
           this.displayErrorText = false;
       }
       else {
         if (data.errorCode === 401) {
            this.router.navigateByUrl("/login");
          }
        }
     }
   )
  }

  async applyFilter(name) {
    this.filterName = name;
    await this._VendorService.getVendorOnPagination(name,this.pagingInfo.pageNumber, this.pagingInfo.pageSize).subscribe(
      data => {
        if (data.status === "Success") {
          this.displayErrorText = false;
          vendordata = data.vendors;
          this.pagingInfo.totalResults = data.pagingInfo.totalResults;
          this.dataSource = new ExampleDataSource();  
        }
        else if (data.status === "Failure") {
            vendordata = data.vendors;
            this.dataSource = new ExampleDataSource();
            this.displayMessage = "No Results found with Search name " + this.filterName;
            this.displayErrorText = true;
        }
      }
    )
  }
 

  async ngOnInit() {
    this.pagingInfo = new PagingInfo();
    this.pagingInfo.pageNumber = 1;
    this.pagingInfo.pageSize = 10;
    this.pagingInfo.totalResults = 100;
    await this._VendorService.getAllVendors().subscribe(
      data => {
        if (data.status === "Success") {
          vendordata = data.vendors;
          this.pagingInfo.totalResults = data.pagingInfo.totalResults;
          if (vendordata.length > 0) {
            this.dataSource = new ExampleDataSource();
          }
          else
            this.displayErrorText = true;
        } 
        else {
          if (data.errorCode === 401) {
            this.router.navigateByUrl("/login");
          }
        }
      }
    )
    
    await this.centralizedRepo.getLoggedInUser();
    if (this.centralizedRepo.getUser().role.id == 4)
      this.isSuperAdmin = true;
  }
  

}
let vendordata: Vendor[]=[];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const rows = [];
    vendordata.forEach(element => rows.push(element, { detailRow: true, element }));
    return of(rows);
  }

  disconnect() { }
}
