import { Injectable } from '@angular/core';

import { InvoicePdfBuilder } from '../utils/InvoicePdfBuilder'

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  public generatePdf(formValues){
    var invoicePdfBuilder = new InvoicePdfBuilder()

    return invoicePdfBuilder
      .addNumber("Faktura VAT 01/10/2018")
      .addCreationPlace("Bydgoszcz")
      .addCreationDate("31-10-2018")
      .addSellDate("31-10-2018")
      .addSeller(["IT Paweł Lewandowski", "second line", "third line", "nip line"])
      .addBuyer(["IT kontekst wojciech oczkowski", "second line", "third line", "nip line"])
      .build();
  }

}
