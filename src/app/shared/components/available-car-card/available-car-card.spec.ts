import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableCarCard } from './available-car-card';

describe('AvailableCarCard', () => {
  let component: AvailableCarCard;
  let fixture: ComponentFixture<AvailableCarCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableCarCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableCarCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
