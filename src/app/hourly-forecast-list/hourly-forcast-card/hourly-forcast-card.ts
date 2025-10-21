import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hour } from '../../home/types';

@Component({
  selector: 'app-hourly-forcast-card',
  imports: [CommonModule],
  templateUrl: './hourly-forcast-card.html',
  styleUrl: './hourly-forecast-card.css',
})
export class HourlyForcastCard implements OnChanges {
  @Input() hour: Hour | undefined;
  @Output() selectedHour = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hour'] && changes['hour'].currentValue) {
    }
  }

  onSelectedHour(): void {
    this.selectedHour.emit();
  }
}
