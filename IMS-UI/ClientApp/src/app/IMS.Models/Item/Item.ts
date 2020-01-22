export class Item {
  id: number;
  name: string;
  maxLimit: number;
  isActive: boolean;
  imageUrl: string;
  rate: number;
  shelvesRedLimit?: number;
  shelvesAmberLimit?: number;
  warehouseRedLimit?: number;
  warehouseAmberLimit?: number;
}
