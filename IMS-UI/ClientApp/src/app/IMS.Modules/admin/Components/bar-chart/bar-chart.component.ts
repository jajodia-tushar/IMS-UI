import { Component, OnInit, Input } from "@angular/core";
import { Chart } from "chart.js";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";
import { ItemWiseAnalysisModel } from "src/app/IMS.Models/Item/ItemWiseAnalysisModel";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  constructor(private randomColorGenerator: RandomColorGeneratorService) { }

  @Input()
  totalConsumedItem: ItemWiseAnalysisModel;

  ngOnInit() { }

  onRefresh() {
    let element = document.getElementById("refreshBar");
    element.classList.toggle("fa-spin");
    setTimeout(() => {
      element.classList.remove("fa-spin");
      this.itemsConsumedPerDay();

    }, 2000);

  }

  ngAfterViewInit() {
    this.itemsConsumedPerDay();
  }

  private itemsConsumedPerDay() {
    new Chart("bar-chart", {
      type: "bar",
      data: {
        labels: this.totalConsumedItem.date,
        datasets: [
          {
            data: this.totalConsumedItem.quantity,
            backgroundColor: this.randomColorGenerator.getRandomColor(
              this.totalConsumedItem.date.length
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
