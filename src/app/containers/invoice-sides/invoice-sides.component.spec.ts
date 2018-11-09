import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSidesComponent } from './invoice-sides.component';

describe('InvoiceSidesComponent', () => {
  let component: InvoiceSidesComponent;
  let fixture: ComponentFixture<InvoiceSidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
