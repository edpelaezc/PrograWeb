import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeModalComponent } from './coffee-modal.component';

describe('CoffeeModalComponent', () => {
  let component: CoffeeModalComponent;
  let fixture: ComponentFixture<CoffeeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
