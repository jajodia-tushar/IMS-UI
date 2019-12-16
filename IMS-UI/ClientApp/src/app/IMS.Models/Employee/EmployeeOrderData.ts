import { CartItem } from "../CartItem";
import { Shelf } from "../Shelf/Shelf";

export class EmployeeOrderData{
      employee : {
        id : string;
      };
      employeeOrder : {
        shelf : Shelf;
        employeeItemsQuantityList : CartItem[];
      }
}