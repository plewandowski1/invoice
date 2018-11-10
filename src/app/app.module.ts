import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandardButtonComponent } from './basic-components/standard-button/standard-button.component';
import { HeaderComponent } from './containers/header/header.component';
import { StandardInputComponent } from './basic-components/standard-input/standard-input.component';
import { InvoiceFormComponent } from './containers/invoice-form/invoice-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StandardButtonComponent,
    HeaderComponent,
    StandardInputComponent,
    InvoiceFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
