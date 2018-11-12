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

  invoiceForm = this.fb.group({
    document: [this.documentTypes[0]],
    creationPlace: ['Bydgoszcz'],
    number: [''],
    creationDate: [''],
    sellDate: [''],
    sides: this.fb.group({
      seller: this.fb.group({
        
      })
    }),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {  
    console.log(this.invoiceForm.value);
  }
}
