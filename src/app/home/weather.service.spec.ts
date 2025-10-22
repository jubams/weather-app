import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

import { WeatherService } from './weather.service';
import { units } from '../shared/header/header';
import { ForecastResponse, GeocodeResponse } from './types';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const testUnits: units = {
    Temperature: 'celsius',
    WindSpeed: 'kmh',
    Precipitation: 'mm',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function expectUrl(url: string) {
    return (req: HttpRequest<any>) => req.url === url;
  }

  it('should fetch and normalize forecast for a location', (done) => {
    service.getForecastForPage('London', testUnits).subscribe((normalized) => {
      expect(normalized.place).toBe('London');
      expect(Object.keys(normalized.hourlyByDay).length).toBeGreaterThan(0);
      expect(normalized.daily.length).toBe(2);
      expect(normalized.units.temp).toBeDefined();
      done();
    });

    // First call: geocoding
    const geoReq = httpMock.expectOne(expectUrl('https://geocoding-api.open-meteo.com/v1/search'));
    expect(geoReq.request.method).toBe('GET');
    const geocode: GeocodeResponse = {
      results: [{ name: 'London', latitude: 51.5, longitude: -0.12 }],
    };
    geoReq.flush(geocode);

    // Second call: forecast
    const forecastReq = httpMock.expectOne(expectUrl('https://api.open-meteo.com/v1/forecast'));
    expect(forecastReq.request.method).toBe('GET');
    // Ensure some key params are present
    const params = forecastReq.request.params;
    expect(params.get('latitude')).toBe('51.5');
    expect(params.get('longitude')).toBe('-0.12');
    expect(params.get('current_weather')).toBe('true');

    const forecast: ForecastResponse = {
      latitude: 51.5,
      longitude: -0.12,
      generationtime_ms: 1,
      utc_offset_seconds: 0,
      timezone: 'UTC',
      timezone_abbreviation: 'UTC',
      elevation: 0,
      hourly_units: {
        time: 'iso8601',
        temperature_2m: '°C',
      } as any,
      hourly: {
        time: ['2025-01-01T00:00', '2025-01-01T01:00', '2025-01-02T00:00'],
        temperature_2m: [1, 2, 3],
        apparent_temperature: [1, 2, 3],
        relative_humidity_2m: [80, 81, 82],
        precipitation: [0, 0, 1],
        wind_speed_10m: [5, 6, 7],
        cloud_cover: [10, 20, 30],
        weather_code: [1, 2, 3],
      },
      daily_units: { time: 'iso8601', temperature_2m_max: '°C', temperature_2m_min: '°C' },
      daily: {
        time: ['2025-01-01', '2025-01-02'],
        temperature_2m_max: [5, 6],
        temperature_2m_min: [0, 1],
        weather_code: [1, 2],
      },
    };
    forecastReq.flush(forecast);
  });

  it('should error when location not found', (done) => {
    service.getForecastForPage('nowhere', testUnits).subscribe({
      next: () => fail('expected error'),
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      },
    });

    const geoReq = httpMock.expectOne(expectUrl('https://geocoding-api.open-meteo.com/v1/search'));
    geoReq.flush({ results: [] });
  });
});
