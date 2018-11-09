import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  editButtonModel = {
    name: "Edytuj na podstawie pdf",
    class: "btn-outline-secondary",
    callback: this.editButtonCallback,
  }

  loadTemplateButtonModel = {
    name: "Wczytaj szablon",
    class: "btn-outline-secondary",
    callback: this.loadTemplateButtonCallback,
  }

  constructor() { }

  ngOnInit() {
  }

  private editButtonCallback(): void {
    console.log("hello edit button");
  }

  private loadTemplateButtonCallback(): void {
    console.log("hello load button");
  }

}
