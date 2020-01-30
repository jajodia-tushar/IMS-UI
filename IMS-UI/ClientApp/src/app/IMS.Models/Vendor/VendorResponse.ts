import { Error } from "../Error";
import { Vendor } from "./vendor";
import { PagingInfo } from "../Shared/PagingInfo";

export class VendorResponse extends Error{
  vendors: Vendor[];
  status: string;
  pagingInfo: PagingInfo;
}
