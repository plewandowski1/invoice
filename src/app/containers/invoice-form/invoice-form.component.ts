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
    {key: "invoiceVat", value: "Faktura VAT"},
  ]

  paymentMethods = [
    {key: "cash", value: "Gotówka"},
    {key: "transfer", value: "Przelew"},
  ]

  paymentStatus = [
    {key: "paid", value: "Zapłacone"},
    {key: "notPaid", value: "Niezapłacone"}
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
    aliases: this.fb.array([
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
    status: [this.paymentStatus[1]],
    paymentMethod: [this.paymentMethods[1]],
    paymentDeadline: [''],
    bankAccount: [''],
    comments: [''],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get aliases() {
    return this.invoiceForm.get('aliases') as FormArray;
  }

  addAlias(){
    this.aliases.push(this.fb.group({
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

  onServiceAdd(): void{
    this.addAlias();
  }

  onServiceRemove(index): void{ 
    this.aliases.removeAt(index);
  }
}
