import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForecastList } from './daily-forecast-list';
import { Day } from '../home/types';

describe('DailyForecastList', () => {
  let component: DailyForecastList;
  let fixture: ComponentFixture<DailyForecastList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyForecastList],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyForecastList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected day', () => {
    const sample: Day = { iso: '2025-01-01', min: 1, max: 10 };
    const spy = jasmine.createSpy('selected');
    component.selectedDay.subscribe(spy);

    component.onSelectedDay(sample);

    expect(spy).toHaveBeenCalledOnceWith(sample);
  });
});

