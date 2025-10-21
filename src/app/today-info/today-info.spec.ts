import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayInfo } from './today-info';

describe('TodayInfo', () => {
  let component: TodayInfo;
  let fixture: ComponentFixture<TodayInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
