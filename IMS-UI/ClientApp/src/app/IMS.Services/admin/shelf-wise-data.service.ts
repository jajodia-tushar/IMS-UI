import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShelfWiseOrderCountResponse } from 'src/app/IMS.Models/Shelf/ShelfWiseOrderCountResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelfWiseDataService {

  constructor(private httpClient : HttpClient) { }

  getShelfWiseData(fromDate : string, toDate : string): Observable<ShelfWiseOrderCountResponse> {

    let params = new HttpParams();
    params = params.append("FromDate", fromDate);
    params = params.append("ToDate", toDate);

    return this.httpClient.get<ShelfWiseOrderCountResponse>("api/shelfwiseordercount", {params: params});


        //     let x : ShelfWiseOrderCountResponse = {
//       DateWiseShelfOrderCount: [
//           {
//               date: "2019-12-18T16:03:57.6907219+05:30",
//               ShelfOrderCountMappings: [
//                   {
//                       shelfName: "First Floor",
//                       totalNumberOfOrder: 30
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 40
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 200
//                   }
//               ]
//           },
//           {
//               date: "2019-12-19T16:03:57.6908925+05:30",
//               ShelfOrderCountMappings: [
//                   {
//                       shelfName: "First Floor",
//                       totalNumberOfOrder: 10
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 200
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 200
//                   }
//               ]
//           },
//           {
//               date: "2019-12-20T16:03:57.6908925+05:30",
//               ShelfOrderCountMappings: [
//                   {
//                       shelfName: "First Floor",
//                       totalNumberOfOrder: 55
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 10
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 200
//                   }
//               ]
//           },
//           {
//               date: "2019-12-21T16:03:57.6908925+05:30",
//               ShelfOrderCountMappings: [
//                   {
//                       shelfName: "First Floor",
//                       totalNumberOfOrder: 90
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 180
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 210
//                   }
//               ]
//           },
//           {
//               date: "2019-12-22T16:03:57.6908925+05:30",
//               ShelfOrderCountMappings: [
//                   {
//                       shelfName: "First Floor",
//                       totalNumberOfOrder: 5
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 5
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 220
//                   }
//               ]
//           },
//           {
//               date: "2019-12-23T16:03:57.6908925+05:30",
//               ShelfOrderCountMappings: [
//                   {
//                       shelfName: "First Floor",
//                       totalNumberOfOrder: 100
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 50
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 220
//                   }
//               ]
//           },
//           {
//               date: "2019-12-24T16:03:57.6908925+05:30",
//               ShelfOrderCountMappings: [
//                   {
//                       shelfName: "First Floor",
//                       totalNumberOfOrder: 30
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 90
//                   },
//                   {
//                       shelfName: "Second Floor",
//                       totalNumberOfOrder: 220
//                   }
//               ]
//           }
//       ],
//       status : "Success",
//       error: null
//   }

//   return x;
    // return this.httpClient.get<ShelfWiseOrderCountResponse>("api/");
  }
}
