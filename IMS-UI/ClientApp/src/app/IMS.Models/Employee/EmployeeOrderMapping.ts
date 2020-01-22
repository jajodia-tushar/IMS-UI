import { Employee } from "./Employee";
import { Shelf } from "../Shelf/Shelf";
import { CartItem } from "../CartItem";

export class EmployeeOrderMapping{
    employee : Employee;
    employeeOrderDetails : EmployeeOrderDetails 
}

export class EmployeeOrderDetails {
  orderId: number;
  date: string;
  shelf: Shelf;
  employeeItemsQuantityList: CartItem [];
}