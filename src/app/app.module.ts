import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandardButtonComponent } from './basic-components/standard-button/standard-button.component';
import { HeaderComponent } from './containers/header/header.component';
import { StandardInputComponent } from './basic-components/standard-input/standard-input.component';
import { InvoiceHeaderComponent } from './containers/invoice-header/invoice-header.component';
import { InvoiceSideComponent } from './containers/invoice-side/invoice-side.component';
import { InvoiceSidesComponent } from './containers/invoice-sides/invoice-sides.component';
import { PaymentInfoComponent } from './containers/payment-info/payment-info.component';
import { InvoiceSummaryComponent } from './containers/invoice-summary/invoice-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    StandardButtonComponent,
    HeaderComponent,
    StandardInputComponent,
    InvoiceHeaderComponent,
    InvoiceSideComponent,
    InvoiceSidesComponent,
    PaymentInfoComponent,
    InvoiceSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
