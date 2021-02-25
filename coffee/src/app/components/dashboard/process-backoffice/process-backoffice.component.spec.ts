import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBackofficeComponent } from './process-backoffice.component';

describe('ProcessBackofficeComponent', () => {
  let component: ProcessBackofficeComponent;
  let fixture: ComponentFixture<ProcessBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessBackofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
