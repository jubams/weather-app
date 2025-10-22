import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForecastList } from './hourly-forecast-list';
import { Hour } from '../home/types';

describe('HourlyForecastList', () => {
  let component: HourlyForecastList;
  let fixture: ComponentFixture<HourlyForecastList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyForecastList],
    }).compileComponents();

    fixture = TestBed.createComponent(HourlyForecastList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose hourlyArray safely', () => {
    component.hourly = undefined;
    expect(component.hourlyArray).toEqual([]);

    const sample: Hour[] = [
      { time: '2025-01-01T00:00', temp: 2 },
      { time: '2025-01-01T01:00', temp: 3 },
    ];
    component.hourly = sample;
    expect(component.hourlyArray).toBe(sample);
  });

  it('should emit selected hour', () => {
    const hour: Hour = { time: '2025-01-01T02:00', temp: 4 };
    const spy = jasmine.createSpy('selected');
    component.selectedHour.subscribe(spy);

    component.onSelectedHour(hour);

    expect(spy).toHaveBeenCalledOnceWith(hour);
  });
});

