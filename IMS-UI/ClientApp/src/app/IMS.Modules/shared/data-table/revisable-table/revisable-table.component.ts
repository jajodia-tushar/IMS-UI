import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-revisable-table',
  templateUrl: './revisable-table.component.html',
  styleUrls: ['./revisable-table.component.css']
})
export class RevisableTableComponent implements OnInit {

  displayedColumns;
  datasource = new MatTableDataSource();
  @Input() columnHeader;
  @Input() show;
  @Input() set griddata(data){
    this.datasource= new MatTableDataSource(data);
    
  }

  
  ngOnInit() {
    this.displayedColumns= this.columnHeader.map(c => c.columnDef)
  }

  ngAfterViewInit(){  
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);

  } 


}

