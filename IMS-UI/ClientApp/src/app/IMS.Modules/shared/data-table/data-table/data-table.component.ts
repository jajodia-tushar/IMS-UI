import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Root } from 'src/app/IMS.Models/Vendor/Root';
import { ListOfVendorOrder } from 'src/app/IMS.Models/Vendor/ListOfVendorOrder';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  displayedColumns;
  public datasource = new MatTableDataSource<ListOfVendorOrder>();
  constructor() { }
  @Input() set griddata(data) {
    this.datasource = new MatTableDataSource(data);
    console.log(this.datasource.data);
  }
  @Input() columnHeader;

  ngOnInit() {
    this.displayedColumns = this.columnHeader.map(c => c.columnDef)
  }
  ngAfterViewInit() {
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);

  }
}
