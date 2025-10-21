import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HourlyForcastCard } from './hourly-forcast-card/hourly-forcast-card';
import { Hour } from '../home/types';

@Component({
  selector: 'app-hourly-forecast-list',
  imports: [CommonModule, HourlyForcastCard],
  templateUrl: './hourly-forecast-list.html',
  styleUrl: './hourly-forecast-list.css',
})
export class HourlyForecastList implements OnChanges {
  @Input() hourly: Hour[] | undefined;
  @Output() selectedHour = new EventEmitter<Hour>();
  skeletonArray = Array(24).fill(null);


  get hourlyArray(): Hour[] {
    if (!this.hourly) return [];
    return this.hourly;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hourly'] && changes['hourly'].currentValue) {
    }
  }

  onSelectedHour(hour: Hour){
    this.selectedHour.emit(hour);
  }
}
