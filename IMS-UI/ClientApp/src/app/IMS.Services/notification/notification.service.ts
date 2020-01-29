import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { COLUMN_DATA } from "src/app/IMS.Models/Notification/NotificationHeader";

import { NotificationResponse } from "src/app/IMS.Models/Notification/NotificationResponse";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private client: HttpClient) { }

    getAllNotifications(pageNumber: string, pageSize: string) {
        let params = new HttpParams();

        params = params.append("pageNumber", pageNumber);
        params = params.append("pageSize", pageSize);

        return this.client.get<NotificationResponse>("api/notification", { params: params });
    }

    getColumnFordataTable() {
        return COLUMN_DATA;
    }
}