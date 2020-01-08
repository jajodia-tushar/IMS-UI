import { Vendor } from "./vendor";


export class OrderDetails {
  challanNumber: string;
  vendor: Vendor;
  submitedTo: string;
  receivedBy: string;
  date: Date;
}
