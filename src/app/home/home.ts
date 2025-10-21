import { Component } from '@angular/core';
import { Header, units } from '../shared/header/header';
import { Search } from '../search/search';
import { WeatherService } from './weather.service';
import { TodayInfo } from '../today-info/today-info';
import { HourlyForecastList } from '../hourly-forecast-list/hourly-forecast-list';
import { DailyForecastList } from '../daily-forecast-list/daily-forecast-list';
import { Day, Hour, NormalizedForecast } from './types';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [Header, Search, TodayInfo, HourlyForecastList, DailyForecastList, NgIf ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  forecast?: NormalizedForecast;
  selectedDate: string = '';
  selectedHour?: Hour;

  searchLocation: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  units: units = {
    Temperature: 'celsius',
    WindSpeed: 'kmh',
    Precipitation: 'mm',
  };

  onUnitsChange(units: units) {
    this.units = units;
  }

  onSearch(location: string) {
    this.searchLocation = location;
    this.getWeather();
  }

  getWeather() {
    this.loading = true;
    this.error = null;

    this.weatherService.getForecastForPage(this.searchLocation, this.units).subscribe({
      next: (data) => {
        this.forecast = data;
        this.selectedDate = Object.keys(data.hourlyByDay)[0];
        this.selectedHour = data.hourlyByDay[this.selectedDate][0];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch weather data';
        this.loading = false;
      },
    });
  }

  onSelectedHour(hour: Hour): void {
    this.selectedHour = hour;
  }

  onSelectedDay(day: Day): void {
    this.selectedDate = day?.iso;
    this.selectedHour = this.forecast?.hourlyByDay[day?.iso][0];
  }
}
