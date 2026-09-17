import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarModels } from './car-models';

describe('CarModels', () => {
  let component: CarModels;
  let fixture: ComponentFixture<CarModels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModels],
    }).compileComponents();

    fixture = TestBed.createComponent(CarModels);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
