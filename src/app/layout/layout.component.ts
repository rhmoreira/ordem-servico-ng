import { Component, OnInit } from '@angular/core';
import { slideToBottom, slideToLeft } from '../route-transitions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [slideToLeft()]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
