import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { FrequentlyUsedItemService } from "src/app/IMS.Services/admin/frequently-used-item.service";
import { ItemWiseDataService } from "src/app/IMS.Services/admin/item-wise-data.service";
import { ShelfWiseDataService } from "src/app/IMS.Services/admin/shelf-wise-data.service";
import { FrequentlyUsedItemModel } from "src/app/IMS.Models/Admin/FrequentlyUsedItemModel";
import { ShelfWiseOrderCountResponse } from "src/app/IMS.Models/Shelf/ShelfWiseOrderCountResponse";
import { ItemWiseAnalysisResponse } from "src/app/IMS.Models/Item/ItemWiseAnalysisResponse";

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
