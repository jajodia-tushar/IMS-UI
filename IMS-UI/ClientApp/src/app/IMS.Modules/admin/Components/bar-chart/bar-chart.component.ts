import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";
import { ItemWiseAnalysisResponse } from "src/app/IMS.Models/Item/ItemWiseAnalysisResponse";


@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  constructor(private randomColorGenerator: RandomColorGeneratorService) {
    
  }

  @Input()
  totalConsumedItem: ItemWiseAnalysisResponse;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalConsumedItem.currentValue != null) {
      this.itemsConsumedPerDay();
    }
  }

  private itemsConsumedPerDay() {
    new Chart("bar-chart", {
      type: "bar",
      data: {
        labels: this.totalConsumedItem.getDateItemConsumptions.map((data, index, array) => {
          let date = new Date(data.Date);
          if (array.length > 7) return `${date.getMonth()+1}/${date.getDate()}`;
          else date.toString().split(' ')[0];
        }),
        datasets: [
          {
            data: this.totalConsumedItem.getDateItemConsumptions.map(data => data.ItemsConsumptionCount),
            backgroundColor: this.randomColorGenerator.getRandomColor(
              this.totalConsumedItem.getDateItemConsumptions.length
            )
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
