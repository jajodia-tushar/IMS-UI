import { Injectable } from '@angular/core';
import { Employee } from '../../IMS.Models/Employee/Employee';
import { User } from '../../IMS.Models/User/User';
import { Shelf } from '../../IMS.Models/Shelf/Shelf';
import { ShelfResponse } from '../../IMS.Models/Shelf/ShelfResponse';
import { UserResponse } from '../../IMS.Models/User/UserResponse';
import { ShelfService } from '../Shelf/shelf.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CentralizedDataService {
  employee : Employee ;
  shelf : Shelf;
  user: User;
  siblingData: any;

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

  setSiblingData(data: any) {
    this.siblingData = data;
  }

  getSiblingData(): any{
    return this.siblingData;
  }
}
