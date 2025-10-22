import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForcastCard } from './hourly-forcast-card';

describe('HourlyForcastCard', () => {
  let component: HourlyForcastCard;
  let fixture: ComponentFixture<HourlyForcastCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyForcastCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HourlyForcastCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when selected', () => {
    const spy = jasmine.createSpy('selected');
    component.selectedHour.subscribe(spy);

    component.onSelectedHour();

    expect(spy).toHaveBeenCalled();
  });
});

