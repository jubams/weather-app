import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Day, ForecastResponse, GeocodeResponse, Hour, NormalizedForecast } from './types';
import { units } from '../shared/header/header';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(location: string, units: units): Observable<ForecastResponse> {
    return this.getLocationCoordinates(location).pipe(
      map((data) => {
        const locationResult = data.results?.[0];
        if (!locationResult) throw new Error('Location not found');
        return { latitude: locationResult.latitude, longitude: locationResult.longitude };
      }),
      switchMap(({ latitude, longitude }) => {
        const params = new HttpParams()
          .set('latitude', String(latitude))
          .set('longitude', String(longitude))
          .set('current_weather', 'true')
          .set(
            'hourly',
            [
              'temperature_2m',
              'apparent_temperature',
              'relative_humidity_2m',
              'precipitation',
              'wind_speed_10m',
              'cloud_cover',
              'weather_code',
            ].join(',')
          )
          .set('daily', ['temperature_2m_max', 'temperature_2m_min', 'weather_code'].join(','))
          .set('forecast_days', '7')
          .set('temperature_unit', units.Temperature)
          .set('windspeed_unit', units.WindSpeed)
          .set('precipitation_unit', units.Precipitation)
          .set('timezone', 'auto');

        const url = 'https://api.open-meteo.com/v1/forecast';
        return this.http
          .get<ForecastResponse>(url, { params })
          .pipe(map((response) => ({ response, place: location })));
      }),
      catchError((err) => {
        console.error('Error fetching weather data:', err);
        return throwError(() => new Error(err.message || 'Failed to fetch weather data'));
      })
    ) as any;
  }

  getLocationCoordinates(location: string): Observable<GeocodeResponse> {
    const params = new HttpParams()
      .set('name', location)
      .set('count', '5')
      .set('language', 'en')
      .set('format', 'json');

    const url = 'https://geocoding-api.open-meteo.com/v1/search';
    return this.http.get<GeocodeResponse>(url, { params });
  }

  private normalizeForecast(resp: ForecastResponse, place?: string): NormalizedForecast {
    const hourlyByDay: Record<string, Hour[]> = {};

    const responseHours = resp.hourly;
    if (responseHours && responseHours.time?.length) {
      for (let i = 0; i < responseHours.time.length; i++) {
        const hour: Hour = {
          time: responseHours.time[i],
          temp: responseHours.temperature_2m[i],
          feels: responseHours.apparent_temperature?.[i],
          humidity: responseHours.relative_humidity_2m?.[i],
          wind: responseHours.wind_speed_10m?.[i],
          precip: responseHours.precipitation?.[i],
          cloud: responseHours.cloud_cover?.[i],
          code: responseHours.weather_code?.[i],
        };
        const iso = hour.time.split('T')[0];
        (hourlyByDay[iso] ||= []).push(hour);
      }
    }

    const responseDays = resp.daily;
    const daily: Day[] = !responseDays?.time?.length
      ? []
      : responseDays.time.map((t, i) => ({
          iso: t,
          min: responseDays.temperature_2m_min[i],
          max: responseDays.temperature_2m_max[i],
          code: responseDays.weather_code?.[i],
        }));
    return {
      place,
      hourlyByDay,
      daily,
      units: {
        temp: resp.hourly_units?.temperature_2m ?? '°C',
        wind: resp.hourly_units?.wind_speed_10m,
        precip: resp.hourly_units?.precipitation,
      },
    };
  }

  getForecastForPage(location: string, units: units): Observable<NormalizedForecast> {
    return this.getWeatherData(location, units).pipe(
      map((data: any) => this.normalizeForecast(data.response, data.place)),
      catchError((err) => {
        console.error('Error in getForecastForPage:', err);
        return throwError(() => err);
      })
    );
  }
}
