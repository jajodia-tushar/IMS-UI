import { Error } from "../Error";
import { Vendor } from "./vendor";

export class VendorResponse extends Error{
  vendors: Vendor[];
  status: string;
}
