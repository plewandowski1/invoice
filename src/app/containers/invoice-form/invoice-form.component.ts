import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  documentTypes = [
    { key: "invoiceVat", value: "Faktura VAT" },
  ]

  paymentMethods = [
    { key: "cash", value: "Gotówka" },
    { key: "transfer", value: "Przelew" },
  ]

  paymentStatus = [
    { key: "paid", value: "Zapłacone" },
    { key: "notPaid", value: "Niezapłacone" }
  ]

  invoiceForm = this.fb.group({
    document: [this.documentTypes[0]],
    creationPlace: ['Bydgoszcz'],
    number: [''],
    creationDate: [''],
    sellDate: [''],
    sides: this.fb.group({
      seller: this.fb.group({
        sellerName: [''],
        sellerNip: [''],
        sellerStreet: [''],
        sellerCity: [''],
        sellerPostCode: [''],
      }),
      buyer: this.fb.group({
        buyerName: [''],
        buyerNip: [''],
        buyerStreet: [''],
        buyerCity: [''],
        buyerPostCode: [''],
      }),
    }),
    paymentInfo: this.fb.array([
      this.fb.group({
        serviceName: '',
        unitOfMeasure: 'usł.',
        amount: '0',
        nettoPrice: '0',
        nettoValue: '0',
        vatRate: '23%',
        vatAmount: '0',
        grossValue: '0',
      })
    ]),
    summary: this.fb.group({
      nettoSummary: ['0'],
      vatSummary: ['0'],
      grossSummary: ['0'],
      currency: ['PLN'],
    }),
    status: [this.paymentStatus[1]],
    paymentMethod: [this.paymentMethods[1]],
    paymentDeadline: [''],
    bankAccount: [''],
    comments: [''],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get paymentInfo() {
    return this.invoiceForm.get('paymentInfo') as FormArray;
  }

  addAlias() {
    this.paymentInfo.push(this.fb.group({
      serviceName: '',
      unitOfMeasure: 'usł.',
      amount: '0',
      nettoPrice: '0',
      nettoValue: '0',
      vatRate: '0',
      vatAmount: '0',
      grossValue: '0',
    }));
  }

  onSubmit(): void {
    console.log(this.invoiceForm.value);
  }

  onServiceAdd(): void {
    this.addAlias();
  }

  onServiceRemove(index): void {
    this.paymentInfo.removeAt(index);
  }

  calculatePayment() {
    this.paymentInfo.controls.forEach(element => {
      var nettoValue = this.getNettoValue(element);
      var vatValue = this.getVatValue(element);
      var grossValue = this.getGrossValue(element);

      console.log(nettoValue);
      console.log(vatValue);
      console.log(grossValue);
    });
  }

  private getNettoValue(element) {
    var amount = element.get('amount').value;
    var nettoPrice = element.get('nettoPrice').value;

    return amount * nettoPrice;
  }

  private getVatValue(element) {
    var vatRate: String = element.get('vatRate').value;
    var nettoValue = element.get('nettoValue').value;

    var intVatRate = 100 - Number(vatRate.replace("%", ""));

    return (nettoValue * 100 / intVatRate) - nettoValue;
  }

  private getGrossValue(element) {
    var vatAmount = element.get('vatAmount').value;
    var nettoValue = element.get('nettoValue').value;

    return +vatAmount + +nettoValue;
  }
}
