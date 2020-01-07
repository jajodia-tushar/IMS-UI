//export const itemquantityprice:any={
//    data: [
//        {
//            "item": {
//                "id": 1,
//                "name": "Black Marker",
//                "maxLimit": 5,
//                "isActive": true,
//                "imageUrl": "abcdef",
//                "rate": 0.0
//            },
//            "quantity": 2,
//            "totalPrice": 5.0
//        },
//        {
//            "item": {
//                "id": 2,
//                "name": "Fevikvik",
//                "maxLimit": 4,
//                "isActive": true,
//                "imageUrl": "ssdsdsddsdsd",
//                "rate": 0.0
//            },
//            "quantity": 2,
//            "totalPrice": 3.0
//        }
//    ]

//}

export const COLUMN_DATA = [
    { columnDef: 'itemName', header: 'Item Name', cell: (element: any) => `${element.item.name}` },
    { columnDef: 'Quantity', header: 'quantity', cell: (element: any) => `${element.quantity}` },
    { columnDef: 'Price', header: 'Price', cell: (element: any) => `${element.totalPrice}` },

   { columnDef: 'actions', header: 'Actions' },
  ];

  export const COLUMN_DATA2 = [
    { columnDef: 'orderId', header: 'OrderId', cell: (element: any) => `${element.vendorOrderDetails.orderId}` },
    { columnDef: 'InvoiceNo', header: 'InvoiceNumber', cell: (element: any) => `${element.vendorOrderDetails.invoiceNumber}` },
    { columnDef: 'VendorName', header: 'VendorName', cell: (element: any) => `${element.vendor.name}` },
    { columnDef: 'amount', header: 'OrderAmount', cell: (element: any) => `${element.vendorOrderDetails.finalAmount}` },
    { columnDef: 'date', header: 'OrderDate', cell: (element: any) => `${element.vendorOrderDetails.date}` },
 
  ];
