import { Injectable } from '@angular/core';

import { InvoiceModel } from '../model/invoice-model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoiceModel = {
    document: "hello",
    number: "number2",
    creationDate: "b",
    creationPlace: "String",
    sellingDate: "String"
  }

  constructor() { }

  testMethod(): void {
    console.log("helloi" + this.invoiceModel.document);
  }

  getNumber(): String{
    return this.invoiceModel.number;
  }

}
