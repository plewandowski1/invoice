import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-standard-button',
  templateUrl: './standard-button.component.html',
  styleUrls: ['./standard-button.component.scss']
})
export class StandardButtonComponent implements OnInit {

  @Input() name: String;
  @Input() class: String;
  @Input() clickCallback: Function;

  constructor() {
  }

  ngOnInit() {
  }

}
