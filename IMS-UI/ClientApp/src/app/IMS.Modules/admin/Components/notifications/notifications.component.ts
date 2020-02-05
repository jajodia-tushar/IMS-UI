import { Component, OnInit } from '@angular/core';
import {MatDialog } from "@angular/material";
import { PagingInfo } from 'src/app/IMS.Models/Shared/PagingInfo';
import { NotificationService } from 'src/app/IMS.Services/notification/notification.service';
import { Notification } from 'src/app/IMS.Models/Notification/Notification';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notificationsDetail: Notification[];

  columns;

  pageInfo:PagingInfo;
  constructor(private notificationService: NotificationService, private dialog: MatDialog) { }
  row;
  selectedTab : number = 0;
  isClickedOn;
  
  ngOnInit() {
    this.initializePagination();
    this.getAllNotifications();
    this.columns = this.notificationService.getColumnFordataTable();
  }

  Tabledata(data) {
    this.row = data;
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications(this.pageInfo.pageNumber.toString(), this.pageInfo.pageSize.toString()).subscribe(data => {
      this.notificationsDetail = data.notifications;
      this.pageInfo = data.pagingInfo;
    });
  }

  getClickedStatus(value){
    this.isClickedOn = value;
    if (this.isClickedOn === 1) {
      this.changeTab();
    } else {
      this.selectedTab -= 1;
    }
  } 

  initializePagination(){
    this.pageInfo = new PagingInfo();
    this.pageInfo.pageNumber = 1;
    this.pageInfo.pageSize = 10;
    this.pageInfo.totalResults = 0;
  }

   
  getpageInfo(event){
    this.pageInfo.pageNumber = event.pageIndex + 1;
    this.pageInfo.pageSize = event.pageSize;
    this.getAllNotifications();
  }

  changeTab() {
    this.selectedTab += 1;
    if (this.selectedTab >= 2) this.selectedTab = 0;
  }

}