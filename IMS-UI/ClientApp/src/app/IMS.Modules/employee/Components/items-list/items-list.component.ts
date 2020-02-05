import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Item } from 'src/app/IMS.Models/Item/Item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() shelfItems : Item[];

  @Output()
  onItemAdd: EventEmitter<Item> = new EventEmitter<Item>();

  onItemClicked(event) {
    this.onItemAdd.emit(event);
  }

  constructor() { }

  ngOnInit() {
  }

}