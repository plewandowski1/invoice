import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private editButtonName = "Edytuj na podstawie pdf";
  private editButtonClass = "btn-outline-secondary";

  private loadTemplateButtonName = "Wczytaj szablon";
  private loadTemplateButtonClass = "btn-outline-secondary";

  constructor() { }

  ngOnInit() {
  }

  private editButtonCallback() : void{
    console.log("hello edit button");
  }

  private loadTemplateButtonCallback(): void{
    console.log("hello load button");
    
  }

}
