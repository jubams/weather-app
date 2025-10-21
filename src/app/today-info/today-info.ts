import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';

// Define Hour type locally to avoid import issues
type Hour = {
  time: string;
  temp: number;
  feels?: number;
  humidity?: number;
  wind?: number;
  precip?: number;
  cloud?: number;
  code?: number;
};

@Component({
  selector: 'app-today-info',
  imports: [DatePipe, NgIf],
  templateUrl: './today-info.html',
  styleUrl: './today-info.css',
})
export class TodayInfo implements OnChanges {
  @Input() hour: Hour | undefined;
  @Input() units: any;
  @Input() place: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hour'] && changes['hour'].currentValue) {
    }
  }
}
