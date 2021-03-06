import { Component, OnInit, Input } from '@angular/core';
import { StandardButtonModel } from '../../model/standard-button-model';

@Component({
  selector: 'app-standard-button',
  templateUrl: './standard-button.component.html',
  styleUrls: ['./standard-button.component.scss']
})
export class StandardButtonComponent implements OnInit {

  @Input() model: StandardButtonModel;

  constructor() {
  }

  ngOnInit() {
  }

}
