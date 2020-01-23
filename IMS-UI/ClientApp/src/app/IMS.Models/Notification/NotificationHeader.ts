export const COLUMN_DATA = [
    { columnDef: 'requestId', header: 'Request ID', cell: (element: any) => `${element.requestId}` },
    { columnDef: 'requestType', header: 'Request Type', cell: (element: any) => `${element.requestType}` },
    { columnDef: 'requestStatus', header: 'Request Status', cell: (element: any) => `${element.requestStatus}` },
    { columnDef: 'requestedBy', header: 'Requested By', cell: (element: any) => `${element.requestedBy}` },
    { columnDef: 'lastModified', header: 'Last Modified', cell: (element: any) => `${element.lastModified}` }
];