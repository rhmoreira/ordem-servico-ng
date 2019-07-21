import { LoaderService } from './../loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  visible: boolean;
  value = 0.0;
  interval: any;

  barConfig = {
    maxValue: 100.0,
  };

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.getVisibility().subscribe(
      visibility => this.setVisibility(visibility)
    );
  }

  private setVisibility(newVisibility: boolean): void {
    if (!this.visible && newVisibility) {
      this.begin();
    } else if (!newVisibility) {
      this.end();
    }
  }

  private begin(): void {
    this.visible = true;
    let rate = 2.5;
    let fator = 5;

    this.interval = setInterval(() => {
      const roundValue = Math.round(this.value);

      if (roundValue > 85.0) {
        rate = 0.01;
      } else if (roundValue > 0 && roundValue % fator === 0) {
        rate = 2.5 * ((100 - fator) / 100);
        fator += 5;
      }
      this.value += rate;
    }, 100);
  }

  private end(): void {
    clearInterval(this.interval);
    this.value = 100;
    setTimeout(() => {
      this.value = 0.1;
      this.visible = false;
    }, 100);
  }

}
