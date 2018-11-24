import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { FormBuilder, FormArray, AbstractControl } from '@angular/forms';

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

  currencies = [
    { key: "pln", value: "PLN" },
    { key: "usd", value: "USD" },
  ]

  invoiceForm = this.fb.group({
    document: [this.documentTypes[0]],
    creationPlace: ['Bydgoszcz'],
    number: [this.generateNumber()],
    creationDate: [this.generateDate()],
    sellDate: [this.generateDate()],
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
        serviceName: [''],
        unitOfMeasure: ['usł.'],
        amount: [0],
        nettoPrice: [0],
        nettoValue: [{ value: 0, disabled: true }],
        vatRate: ['23%'],
        vatAmount: [{ value: 0, disabled: true }],
        grossValue: [{ value: 0, disabled: true }],
      })
    ]),
    summary: this.fb.group({
      nettoSummary: [{ value: 0, disabled: true }],
      vatSummary: [{ value: 0, disabled: true }],
      grossSummary: [{ value: 0, disabled: true }],
      currency: [this.currencies[0]],
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
      serviceName: [''],
      unitOfMeasure: ['usł.'],
      amount: [0],
      nettoPrice: [0],
      nettoValue: [{ value: 0, disabled: true }],
      vatRate: ['23%'],
      vatAmount: [{ value: 0, disabled: true }],
      grossValue: [{ value: 0, disabled: true }],
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
    var summary = {
      netto: 0,
      gross: 0,
      vatAmount: 0,
    }

    this.paymentInfo.controls.forEach(element => {
      var nettoValue = this.calculateNettoValue(element);
      var vatValue = this.calculateVatValue(element);
      var grossValue = this.calculateGrossValue(element);

      summary.netto += nettoValue;
      summary.gross += grossValue;
      summary.vatAmount += vatValue;
    });
    this.updateSummary(summary);
  }

  private calculateNettoValue(element: AbstractControl) {
    var amount = element.get('amount').value;
    var nettoPrice = element.get('nettoPrice').value;

    var nettoValue = amount * nettoPrice;

    element.patchValue({
      nettoValue: nettoValue.toFixed(2),
    })

    return nettoValue;
  }

  private calculateVatValue(element: AbstractControl) {
    var vatRate: String = element.get('vatRate').value;
    var nettoValue = element.get('nettoValue').value;

    var intVatRate = 100 + Number(vatRate.replace("%", ""));
    var vatAmount = (nettoValue * intVatRate / 100) - nettoValue;

    element.patchValue({
      vatAmount: vatAmount.toFixed(2)
    })

    return vatAmount;
  }

  private calculateGrossValue(element: AbstractControl) {
    var vatAmount = element.get('vatAmount').value;
    var nettoValue = element.get('nettoValue').value;

    var grossValue = +vatAmount + +nettoValue;

    element.patchValue({
      grossValue: grossValue.toFixed(2)
    })

    return grossValue;
  }

  private updateSummary(summary) {
    this.invoiceForm.controls['summary'].patchValue({
      nettoSummary: [summary.netto.toFixed(2)],
      vatSummary: [summary.vatAmount.toFixed(2)],
      grossSummary: [summary.gross.toFixed(2)],
      currency: ['PLN'],
    })
  }

  private generateNumber() {
    return new Date()
      .toLocaleDateString()
      .replace('.', "/")
      .replace('.', '/')
      .replace(new RegExp('[0-9]+'), "01");
  }

  private generateDate() {
    var date = new Date();

    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    return year + '-' + month + '-' + day;
  }
}
