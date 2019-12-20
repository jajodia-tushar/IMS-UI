import { Vendor } from "./Vendor";

export class VendorResponse extends Error {
  vendors: Vendor[];
  status: string;
}
