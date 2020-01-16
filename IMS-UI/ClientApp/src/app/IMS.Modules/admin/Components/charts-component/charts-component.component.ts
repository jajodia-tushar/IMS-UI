import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { ShelfWiseDataService } from "src/app/IMS.Services/admin/shelf-wise-data.service";
import { ShelfWiseOrderCountResponse } from "src/app/IMS.Models/Shelf/ShelfWiseOrderCountResponse";

@Component({
  selector: "app-charts-component",
  templateUrl: "./charts-component.component.html",
  styleUrls: ["./charts-component.component.css"]
})
export class ChartsComponentComponent implements OnInit {

  constructor(
    private shelfWiseDataService: ShelfWiseDataService
  ) {
    Chart.defaults.global.defaultFontColor = "#fff";
  }
  totalFloorWisedItem: ShelfWiseOrderCountResponse;

  ngOnInit() { }
}
