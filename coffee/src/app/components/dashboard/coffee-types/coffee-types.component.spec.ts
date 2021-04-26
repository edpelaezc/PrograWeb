import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeTypesComponent } from './coffee-types.component';

describe('CoffeeTypesComponent', () => {
  let component: CoffeeTypesComponent;
  let fixture: ComponentFixture<CoffeeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
