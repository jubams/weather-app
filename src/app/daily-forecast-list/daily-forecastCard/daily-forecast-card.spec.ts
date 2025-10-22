import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForecastCard } from './daily-forecast-card';

describe('DailyForecastCard', () => {
  let component: DailyForecastCard;
  let fixture: ComponentFixture<DailyForecastCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyForecastCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyForecastCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when selected', () => {
    const spy = jasmine.createSpy('selected');
    component.selectedDay.subscribe(spy);

    component.onSelectedDay();

    expect(spy).toHaveBeenCalled();
  });
});

