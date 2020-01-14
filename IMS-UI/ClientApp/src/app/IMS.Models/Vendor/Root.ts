import { ListOfVendorOrder } from "./ListOfVendorOrder";
import { PagingInfo } from "../Shared/PagingInfo";

export class Root {
  listOfVendorOrders: ListOfVendorOrder[];
  status: string;
  error?: any;
  pagingInfo: PagingInfo;
}
