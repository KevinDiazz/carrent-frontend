import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarModelForm } from './car-model-form';

describe('CarModelForm', () => {
  let component: CarModelForm;
  let fixture: ComponentFixture<CarModelForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModelForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CarModelForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
