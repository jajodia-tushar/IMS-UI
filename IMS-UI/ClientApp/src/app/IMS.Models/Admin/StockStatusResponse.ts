import { Item } from "../Item/Item";
import { Error } from "../Error";

export class StockStatusResponse {
  stockStatusList: ItemStockStatus[];
  status: string;
  error: Error;
}

export class ItemStockStatus  {
  item: Item;
  storeStatus: StockStatus[];
}

export class StockStatus {
  quantity: number;
  storeName: string;
  color: string;
}

export class StoreResponse {
  'Item Name': string;
  [key: string]: any;
}
