import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsBackofficeComponent } from './methods-backoffice.component';

describe('MethodsBackofficeComponent', () => {
  let component: MethodsBackofficeComponent;
  let fixture: ComponentFixture<MethodsBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodsBackofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodsBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
