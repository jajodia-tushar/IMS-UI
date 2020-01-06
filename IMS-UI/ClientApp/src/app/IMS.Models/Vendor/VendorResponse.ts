import { Vendor } from "./Vendor";
import { Error } from "../Error";

export class VendorResponse extends Error{
  vendors: Vendor[];
  status: string;
}
