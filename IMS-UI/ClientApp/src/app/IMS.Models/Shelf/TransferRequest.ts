export class TransferRequest {
    shelvesItemsQuantityList: ShelvesItemsQuantityList[];
}

export class ShelvesItemsQuantityList {
    shelf: ShelfID;
    itemQuantityMapping: CartItemID[];
}

export class ShelfID {
    id: number;
}

export class CartItemID {
    item: ItemID;
    quantity: number;
}

export class ItemID {
    id: number;
}
