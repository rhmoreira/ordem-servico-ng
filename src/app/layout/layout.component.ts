import { Component, OnInit } from '@angular/core';
import { slideToBottom } from '../route-transitions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [slideToBottom()]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
