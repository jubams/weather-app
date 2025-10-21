import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';

import { DailyForecastCard } from './daily-forecastCard/daily-forecast-card';
import { Day } from '../home/types';

@Component({
  selector: 'app-daily-forecast-list',
  imports: [DailyForecastCard, NgFor],
  templateUrl: './daily-forecast-list.html',
  styleUrl: './daily-forecast-list.css',
})
export class DailyForecastList implements OnChanges {
  @Input() daily: Day[] | undefined;
  @Output() selectedDay = new EventEmitter<Day>();
  skeletonArray = Array(7).fill(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['daily'] && changes['daily'].currentValue) {
    }
  }
  onSelectedDay(day: Day) {
    this.selectedDay.emit(day);
  }
}
