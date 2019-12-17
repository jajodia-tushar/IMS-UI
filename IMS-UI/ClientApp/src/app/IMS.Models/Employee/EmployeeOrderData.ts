import { CartItem } from "../CartItem";
import { Shelf } from "../Shelf/Shelf";

export class EmployeeOrderData{
      employee : {
        id : string;
      };
      employeeOrderDetails : {
        shelf : Shelf;
        employeeItemsQuantityList : CartItem[];
      }
}