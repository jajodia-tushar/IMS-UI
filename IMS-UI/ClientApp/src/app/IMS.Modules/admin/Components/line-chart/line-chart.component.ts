import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { FrequentlyUsedItemModel } from "src/app/IMS.Models/Admin/FrequentlyUsedItemModel";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit {
  constructor(
    private randomColorGeneratorService: RandomColorGeneratorService
  ) {}

  @Input()
  topItemConsumed: FrequentlyUsedItemModel; /// ngOnChange() {  check if error then handle}
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.topItemConsumed.currentValue != null){
      this.mostFrequentlyConsumedItems();
    }
  }

  private mostFrequentlyConsumedItems() {
    new Chart("pie-chart", {
      type: "pie",
      data: {
        labels: this.topItemConsumed.itemQuantityMapping.map(data =>data.item.name),
        datasets: [
          {
            label: `Top ${this.topItemConsumed.itemQuantityMapping.length} items Consumed`,
            borderWidth: 0,
            borderColor: "#000",
            data: this.topItemConsumed.itemQuantityMapping.map(data => data.quantity),
            backgroundColor: this.randomColorGeneratorService.getRandomColor(
              this.topItemConsumed.itemQuantityMapping.length
            )
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  }
}
