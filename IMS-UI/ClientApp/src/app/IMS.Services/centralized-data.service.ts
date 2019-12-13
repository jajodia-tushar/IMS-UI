import { Injectable } from '@angular/core';
import { Employee } from '../IMS.Models/Employee';
import { ShelfService } from './shelf.service';
import { User } from '../IMS.Models/User';
import { Shelf } from '../IMS.Models/Shelf';
import { ShelfListResponse } from '../IMS.Models/ShelfListResponse';
import { ShelfResponse } from '../IMS.Models/ShelfResponse';
import { LoginService } from './login.service';
import { UserResponse } from '../IMS.Models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class CentralizedDataService {
  employee : Employee ;
  shelf : Shelf;
  user : User;

  constructor(private shelfService : ShelfService,private loginService : LoginService){}

  getShelf(){
      return this.shelf;
  }

  async loadSelectedShelf(){
    let shelfResponse : ShelfResponse = <ShelfResponse> await this.shelfService.getShelf();
    this.setShelf(shelfResponse.shelf);
  }

  async getLoggedInUser(){
    let userResponse : UserResponse = <UserResponse> await this.loginService.getUser();
    this.setUser(userResponse.user);
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
