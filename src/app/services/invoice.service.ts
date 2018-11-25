import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  public calculateTextSize(text, fontSize){
    var test = document.getElementById("Test");

    test.innerHTML = text  
    test.style.fontSize = fontSize
    test.style.position = 'absolute'
    test.style.fontFamily = 'Arial'
    test.style.visibility = 'hidden'
    test.style.height = 'auto'
    test.style.width = 'auto'
    test.style.whiteSpace = 'nowrap'

    var height = test.clientHeight + 1;
    var width = test.clientWidth + 1;

    return {
      width: height,
      height: width
    }
  }

  public generatePdf(formValues){

  }

}
