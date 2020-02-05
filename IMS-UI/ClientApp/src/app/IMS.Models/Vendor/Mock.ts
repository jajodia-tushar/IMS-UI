export const COLUMN_DATA = [
  { columnDef: 'itemName', header: 'Item Name', cell: (element: any) => `${element.item.name}` },
  { columnDef: 'Quantity', header: 'Quantity', cell: (element: any) => `${element.quantity}` },
  { columnDef: 'Price', header: 'Price', cell: (element: any) => `${element.totalPrice}` },
  { columnDef: 'actions', header: ' ' },
];

export const COLUMN_DATA2 = [
  { columnDef: 'orderId', header: 'Order ID', cell: (element: any) => `${element.vendorOrderDetails.orderId}` },
  { columnDef: 'ChallanNo', header: 'Challan Number', cell: (element: any) => `${element.vendorOrderDetails.challanNumber}` },
  { columnDef: 'VendorName', header: 'Vendor Name', cell: (element: any) => `${element.vendor.name}` },
  { columnDef: 'amount', header: 'Order Amount', cell: (element: any) => `${element.vendorOrderDetails.finalAmount}` },
  { columnDef: 'date', header: 'Order Date', cell: (element: any) => `${element.vendorOrderDetails.date}` },
];
