import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSizeComponent } from './service-size.component';

describe('ServiceSizeComponent', () => {
  let component: ServiceSizeComponent;
  let fixture: ComponentFixture<ServiceSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
