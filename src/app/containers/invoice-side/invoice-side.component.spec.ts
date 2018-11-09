import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSideComponent } from './invoice-side.component';

describe('InvoiceSideComponent', () => {
  let component: InvoiceSideComponent;
  let fixture: ComponentFixture<InvoiceSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
