import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-add-dialog',
  templateUrl: './item-add-dialog.component.html',
  styleUrls: ['./item-add-dialog.component.css']
})
export class ItemAddDialogComponent implements OnInit {
  options: FormGroup;
  constructor() { }

  ngOnInit() {
  }
}
