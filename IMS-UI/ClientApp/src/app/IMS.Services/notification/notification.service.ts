import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { COLUMN_DATA } from "src/app/IMS.Models/Notification/NotificationHeader";

import { NotificationResponse } from "src/app/IMS.Models/Notification/NotificationResponse";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private client: HttpClient) { }

    getAllNotifications() {
        return this.client.get<NotificationResponse>("api/notification");
    }

    getColumnFordataTable() {
        return COLUMN_DATA;
    }
}