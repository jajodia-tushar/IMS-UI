import { Employee } from "./Employee";
import { Item } from "../Item/Item";

export class BulkRequest  {
    bulkOrderId: number;
    employee: Employee;
    employeeBulkOrderDetails: EmployeeBulkOrderDetails;
}

export class EmployeeBulkOrderDetails  {
    createdOn: Date;
    requirementDate: Date;
    bulkOrderRequestStatus: string;
    reasonFoRequirement: string;
    iitemsQuantityList: BulkOrderItemQuantityMapping[];
}

export class BulkOrderItemQuantityMapping  {
    item: Item;
    quantityOrdered: number;
    quantityUsed: number;
}