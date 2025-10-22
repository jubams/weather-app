import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Day } from '../../home/types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-forecast-card',
  imports: [DatePipe],
  templateUrl: './daily-forecast-card.html',
  styleUrl: './daily-forecast-card.css',
})
export class DailyForecastCard implements OnChanges {
  @Input() day: Day | undefined;
  @Output() selectedDay = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['day'] && changes['day'].currentValue) {
    }
  }

  onSelectedDay(): void {
    this.selectedDay.emit();
  }
}
