import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

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
    status: [this.paymentStatus[1]],
    paymentMethod: [this.paymentMethods[1]],
    paymentDeadline: [''],
    bankAccount: [''],
    comments: [''],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(): void {  
    console.log(this.invoiceForm.value);
  }

  onServiceAdd(): void{
    console.log("service add");
    
  }

  onServiceRemove(): void{ 
    console.log("remove service");
    
  }
}
