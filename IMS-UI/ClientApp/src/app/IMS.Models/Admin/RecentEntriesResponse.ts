import { Employee } from "../Employee/Employee";
import { Shelf } from "../Shelf/Shelf";
import { Item } from "../Item/Item";
import { CartItem } from "../CartItem";
import { Error } from "../Error";

export class RecentEntriesResponse {
  employeeRecentOrders: RecentEntry[];
  status: string;
  error: Error;
}

export class RecentEntry extends Employee {
  employee: Employee;
  employeeOrder: EmployeeOrder;
}

export class EmployeeOrder extends Shelf {
  orderId: number;
  date: string;
  shelf: Shelf;
  employeeItemsQuantityList: CartItem [];
}
