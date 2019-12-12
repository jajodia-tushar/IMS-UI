import { Injectable } from '@angular/core';
import { Employee } from '../IMS.Models/Employee';
import { Shelf, ShelfResponse } from '../IMS.Models/ShelfResponse';
import { ShelfService } from './shelf.service';
import { User } from '../IMS.Models/User';

@Injectable({
  providedIn: 'root'
})
export class CentralizedDataService {
  employee : Employee ;
  shelf : Shelf;
  user : User;

  constructor(private shelfService : ShelfService){

  }

  getShelf(){
      return this.shelf;
  }

  async setShelfByShelfCode(shelfCode : string){
    console.log(shelfCode+"Here -----------");
    let shelfResponse : ShelfResponse = <ShelfResponse> await this.shelfService.getShelfByShelfCode(shelfCode);
    this.setShelf(shelfResponse.shelves[0]);
  }

  setShelf(shelf : Shelf){
    this.shelf = shelf;
  }

  getEmployee(){
      return this.employee;
  }

  setEmployee(employee : Employee){
    this.employee  = JSON.parse(JSON.stringify(employee));
  }

  setUser(user : User){
    this.user = user;
  }

  getUser() : User{
    return this.user;
  }
}
