import { Employee } from "../Employee/Employee";
import { Shelf } from "../Shelf/Shelf";
import { Item } from "../Item/Item";
import { CartItem } from "../CartItem";
import { Error } from "../Error";
import { EmployeeOrder } from "../Employee/EmployeeOrder";

export class RecentEntriesResponse {
  employeeRecentOrders: RecentEntry[];
  status: string;
  error: Error;
}

export class RecentEntry {
  employee: Employee;
  employeeOrder: EmployeeOrder;
}
