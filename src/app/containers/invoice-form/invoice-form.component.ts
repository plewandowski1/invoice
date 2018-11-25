import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import jsPDF from 'jspdf';
import { Base64 } from 'js-base64';

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

  unitsOfMeasure = [
    { key: "service", value: "usł." }
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
        unitOfMeasure: [this.unitsOfMeasure[0]],
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

    var buffer = `
    %PDF-1.3
%şßŹŕ
3 0 obj
<</Type /Page
/Parent 1 0 R
/Resources 2 0 R
/MediaBox [0 0 595.28 841.89]
/Contents 4 0 R
>>
endobj


4 0 obj
<</Length 163>>
stream
0.57 w
0 G
BT
/F1 12 Tf
99.21 771.02 Td
(mały teścik) Tj
ET
0.39 0.39 0.94 rg
0.39 0.39 0.00 RG
2.83 w
141.732 133.229 m 
283.465 133.229 l
S
endstream
endobj
1 0 obj
<</Type /Pages
/Kids [3 0 R ]
/Count 1
>>
endobj
5 0 obj
<<
/Type /Font
/BaseFont /Helvetica
/Subtype /Type1
/Encoding /WinAnsiEncoding
/FirstChar 0
/LastChar 255
>>
endobj


2 0 obj
<<
/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]
/Font <<
/F1 5 0 R
/F2 6 0 R
/F3 7 0 R
/F4 8 0 R
/F5 9 0 R
/F6 10 0 R
/F7 11 0 R
/F8 12 0 R
/F9 13 0 R
/F10 14 0 R
/F11 15 0 R
/F12 16 0 R
/F13 17 0 R
/F14 18 0 R
>>
/XObject <<
>>
>>
endobj

20 0 obj
<<
/Type /Catalog
/Pages 1 0 R
/OpenAction [3 0 R /FitH null]
/PageLayout /OneColumn
>>
endobj
xref
0 21
0000000000 65535 f 
0000000336 00000 n 
0000002153 00000 n 
0000000015 00000 n 
0000000124 00000 n 
0000000393 00000 n 
0000000518 00000 n 
0000000648 00000 n 
0000000781 00000 n 
0000000918 00000 n 
0000001041 00000 n 
0000001170 00000 n 
0000001302 00000 n 
0000001438 00000 n 
0000001566 00000 n 
0000001693 00000 n 
0000001822 00000 n 
0000001955 00000 n 
0000002057 00000 n 
0000002401 00000 n 
0000002487 00000 n 
trailer
<<
/Size 21
/Root 20 0 R
/Info 19 0 R
/ID [ <40EEBBFD1915085334B91FD55106D8D5> <40EEBBFD1915085334B91FD55106D8D5> ]
>>
startxref
2591
%%EOF
    `

    // window.open('data:application/pdf;base64,' + Base64.encode(buffer));

    
    // position: absolute;
    // font-family: Helvetica,Helvetica,Arial,sans-serif;
    // visibility: hidden;
    // height: auto;
    // width: auto;
    // white-space: nowrap; /* Thanks to Herb Caudill comment */


var test = document.getElementById("Test");

test.innerHTML = 'hello world'  
test.style.fontSize = '12px';
test.style.position = 'absolute';
test.style.fontFamily = 'Arial';
test.style.visibility = 'hidden';
test.style.height = 'auto';
test.style.width = 'auto';
test.style.whiteSpace = 'nowrap';

var height = (test.clientHeight + 1) + "px";
var width = (test.clientWidth + 1) + "px"

console.log(height, width);

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
