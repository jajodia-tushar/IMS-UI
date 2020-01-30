import { Employee } from "./Employee";
import { Item } from "../Item/Item";
import { Response } from "../Response";


export class BulkRequest  {
    bulkOrderId: number;
    employee: Employee;
    employeeBulkOrderDetails: EmployeeBulkOrderDetails;
}

export class EmployeeBulkOrderDetails  {
    createdOn: Date;
    requirementDate: Date;
    bulkOrderRequestStatus: string;
    reasonForRequirement: string;
    itemsQuantityList: BulkOrderItemQuantityMapping[];
}

export class BulkOrderItemQuantityMapping  {
    item: Item;
    quantityOrdered: number;
    quantityUsed: number;
}

export class EmployeeBulkOrderResponse extends Response {
    employeeBulkOrders: BulkRequest[];
    pagingInfo?: any;
   
}

export class ApproveEmployeeBulkOrder {
    itemLocationQuantityMappings: ItemLocationQuantityMapping[];
    bulkOrderId: number;
    employee: Employee;
    employeeBulkOrderDetails: EmployeeBulkOrderDetails;
}

export class ItemLocationQuantityMapping {
    item: Item;
    locationQuantityMappings: LocationQuantityMapping[];
}

export class LocationQuantityMapping {
    location: string;
    quantity: number;
}

export class BlukOrderApproveResponse extends Response {
    approveEmployeeBulkOrder: ApproveEmployeeBulkOrder;   
}

export class BlukOrderApprove {
    itemLocationQuantityMappings: ItemLocationQuantityMapping[];
    bulkOrderId: number;
    employee: Employee;
    employeeBulkOrderDetails: EmployeeBulkOrderDetails;
}