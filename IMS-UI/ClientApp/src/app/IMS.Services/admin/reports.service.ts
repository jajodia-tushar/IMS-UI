import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ItemsAvailabilityResponse } from 'src/app/IMS.Models/Admin/ItemsAvailabilityResponse';
import { Observable } from 'rxjs';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { dataFromAPI } from 'src/app/IMS.Modules/admin/Components/mainnav/mainnav.component';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient : HttpClient) { }

  getRAGReport(locationName : string, locationCode : string, colour : string): Observable<ItemsAvailabilityResponse> {
    let params = new HttpParams();
    params = params.append("locationName", locationName);
    params = params.append("locationCode", locationCode);
    params = params.append("colour", colour);
    return this.httpClient.get<ItemsAvailabilityResponse>("api/reports", {params: params});
  }

  getVendorOrderReport() : VendorOrder[] {
    let data : VendorOrder[] = [
        {
          vendor: {
            id: 0,
            name: "Amazon Pantry",
            contactNumber: "891123",
            title: "Pune",
            address: "Pune",
            pan: "02475029358",
            gst: "LSDJLVSK230852LSDKJ",
            companyIdentificationNumber: "ABCDER"
          },
          vendorOrderDetails: {
            orderId: 0,
            isApproved: true,
            recievedBy: "Mangesh",
            submittedTo: "Ekta",
            taxableAmount: 0,
            invoiceNumber: "1109",
            invoiceImageUrl: "tusharhero.jpg",
            challanNumber: "Idon'tknow",
            challanImageUrl: "hero.jpg",
            date: new Date(),
            orderItemDetails: [
              {
                item: {
                  id: 0,
                  name: "Pen",
                  maxLimit: 0,
                  isActive: true,
                  imageUrl: "Go.jpg",
                  rate: 0,
                },
                quantity: 14,
                totalPrice: 125
              },
              {
                item: {
                  id: 0,
                  name: "Pencil",
                  maxLimit: 0,
                  isActive: true,
                  imageUrl: "Go.jpg",
                  rate: 0,
                },
                quantity: 11,
                totalPrice: 125
              },
              {
                item: {
                  id: 0,
                  name: "Marker",
                  maxLimit: 0,
                  isActive: true,
                  imageUrl: "Go.jpg",
                  rate: 0,
                },
                quantity: 50,
                totalPrice: 125
              },
              {
                item: {
                  id: 0,
                  name: "Notebook",
                  maxLimit: 0,
                  isActive: true,
                  imageUrl: "Go.jpg",
                  rate: 0,
                },
                quantity: 32,
                totalPrice: 125
              },
              {
                item: {
                  id: 0,
                  name: "TT Bat",
                  maxLimit: 0,
                  isActive: true,
                  imageUrl: "Go.jpg",
                  rate: 0,
                },
                quantity: 23,
                totalPrice: 125
              },
              {
                item: {
                  id: 0,
                  name: "TT Ball",
                  maxLimit: 0,
                  isActive: true,
                  imageUrl: "Go.jpg",
                  rate: 0,
                },
                quantity: 100,
                totalPrice: 125
              }
            ],
            finalAmount: 1234
          }
      },
      {
        vendor: {
          id: 0,
          name: "SharmaJi's Shop",
          contactNumber: "891123",
          title: "Pune",
          address: "Pune",
          pan: "02475029358",
          gst: "LSDJLVSK230852LSDKJ",
          companyIdentificationNumber: "ABCDER"
        },
        vendorOrderDetails: {
          orderId: 0,
          isApproved: true,
          recievedBy: "Mangesh",
          submittedTo: "Ekta",
          taxableAmount: 0,
          invoiceNumber: "1109",
          invoiceImageUrl: "tusharhero.jpg",
          challanNumber: "Idon'tknow",
          challanImageUrl: "hero.jpg",
          date: new Date(),
          orderItemDetails: [
            {
              item: {
                id: 0,
                name: "Pen",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 14,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Pencil",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 11,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Marker",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 50,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Notebook",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 32,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "TT Bat",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 23,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "TT Ball",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 100,
              totalPrice: 125
            }
          ],
          finalAmount: 1234
        }
      },
      {
        vendor: {
          id: 0,
          name: "Bikaner Mithaiwale",
          contactNumber: "891123",
          title: "Pune",
          address: "Pune",
          pan: "02475029358",
          gst: "LSDJLVSK230852LSDKJ",
          companyIdentificationNumber: "ABCDER"
        },
        vendorOrderDetails: {
          orderId: 0,
          isApproved: true,
          recievedBy: "Mangesh",
          submittedTo: "Ekta",
          taxableAmount: 0,
          invoiceNumber: "1109",
          invoiceImageUrl: "tusharhero.jpg",
          challanNumber: "Idon'tknow",
          challanImageUrl: "hero.jpg",
          date: new Date(),
          orderItemDetails: [
            {
              item: {
                id: 0,
                name: "Pen",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 14,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Pencil",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 11,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Marker",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 50,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Notebook",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 32,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "TT Bat",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 23,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "TT Ball",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 100,
              totalPrice: 125
            }
          ],
          finalAmount: 1234
        }
      },
      {
        vendor: {
          id: 0,
          name: "Amazon Pantry",
          contactNumber: "891123",
          title: "Pune",
          address: "Pune",
          pan: "02475029358",
          gst: "LSDJLVSK230852LSDKJ",
          companyIdentificationNumber: "ABCDER"
        },
        vendorOrderDetails: {
          orderId: 0,
          isApproved: true,
          recievedBy: "Mangesh",
          submittedTo: "Ekta",
          taxableAmount: 0,
          invoiceNumber: "1109",
          invoiceImageUrl: "tusharhero.jpg",
          challanNumber: "Idon'tknow",
          challanImageUrl: "hero.jpg",
          date: new Date(),
          orderItemDetails: [
            {
              item: {
                id: 0,
                name: "Pen",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 14,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Pencil",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 11,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Marker",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 50,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "Notebook",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 32,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "TT Bat",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 23,
              totalPrice: 125
            },
            {
              item: {
                id: 0,
                name: "TT Ball",
                maxLimit: 0,
                isActive: true,
                imageUrl: "Go.jpg",
                rate: 0,
              },
              quantity: 100,
              totalPrice: 125
            }
          ],
          finalAmount: 1234
        }
      }
      ]
      return data;
    }

}
