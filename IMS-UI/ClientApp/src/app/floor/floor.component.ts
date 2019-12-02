import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FloorComponent>, private router: Router) { }
  public selected='';
  ngOnInit() {
  }
  //this.display = true;  
  onSubmit() {
    this.dialogRef.close();
    this.router.navigateByUrl('/' + sessionStorage.getItem("role"));
  }
}
