import { Injectable } from '@angular/core';
import { Employee } from '../IMS.Models/Employee';
import { Shelf } from '../IMS.Models/ShelfResponse';

@Injectable({
  providedIn: 'root'
})
export class CentralizedDataService {
  employee : Employee ;
  shelf : Shelf;

  getShelf(){
      return this.shelf;
  }

  setShelf(shelf : Shelf){
    this.shelf = shelf;
    console.log(this.shelf);
  }

  getEmployee(){
      return this.employee;
  }

  setEmployee(employee : Employee){
    this.employee  = JSON.parse(JSON.stringify(employee));
  }

  constructor() { }
}
