import { Item } from "../Item/Item";
import { Error } from "../Error";

export class StockStatusResponse {
  stockStatusList: ItemStockStatus[];
  pagingInfo: PagingInformation;
  status: string;
  error: Error;
}

export class PagingInformation  {
  pageNumber: number;
  pageSize: number;
  totalResults: number;
}

export class ItemStockStatus  {
  item: Item;
  storeStatus: StockStatus[];
}

export class StockStatus {
  quantity: number;
  location: string;
  color: string;
}

export class StoreResponse {
  'Item Name': string;
  [key: string]: any;
}
