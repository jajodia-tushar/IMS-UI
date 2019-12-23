import { Employee } from "./Employee/Employee";
import { Shelf } from "./Shelf/Shelf";

export class RecentEntriesResponse extends Error {
  employeeRecentOrders: RecentEntry[];
  status: string;
}

export class RecentEntry extends Employee {
  employee: Employee;
  employeeOrder: EmployeeOrder;
}

export class EmployeeOrder extends Shelf {
  orderId: number;
  date: string;
  shelf: Shelf;
  employeeItemsQuantityList: ItemsQuantityMapping [];
}

export class ItemsQuantityMapping {
  item: Item;
  quantity: number;
}

export class Item {
  id: number;
  name: string;
  maxLimit: number;
  isActive: boolean;
  imageUrl: string;
  rate: number;
}
