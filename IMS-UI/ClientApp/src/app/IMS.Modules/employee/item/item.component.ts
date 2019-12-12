import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/IMS.Models/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;

  @Output()
  onItemClick: EventEmitter<Item> = new EventEmitter<Item>();

  itemClicked() {
    this.onItemClick.emit(this.item);
  }
  constructor() { }

  ngOnInit() {
  }
}
