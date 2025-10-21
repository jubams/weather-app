export type GeoResult = {
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
  admin1?: string;
};

export type GeocodeResponse = {
  results?: GeoResult[];
};

export type Hour = {
  time: string;
  temp: number;
  feels?: number;
  humidity?: number;
  wind?: number;
  precip?: number;
  cloud?: number;
  code?: number;
};

export type Day = {
  iso: string;
  min: number;
  max: number;
  code?: number;
};

export type NormalizedForecast = {
  place?: string;
  hourlyByDay: Record<string, Hour[]>;
  daily: Day[];
  units: {
    temp: string;
    wind?: string;
    precip?: string;
  };
};

type HourlyUnits = {
  time: 'iso8601';
  temperature_2m: '°C' | '°F';
  apparent_temperature?: '°C' | '°F';
  relative_humidity_2m?: '%';
  precipitation?: 'mm' | 'inch';
  wind_speed_10m?: 'km/h' | 'm/s' | 'mph' | 'kn';
  cloud_cover?: '%';
  weather_code?: 'wmo code';
};

type DailyUnits = {
  time: 'iso8601';
  temperature_2m_max: '°C' | '°F';
  temperature_2m_min: '°C' | '°F';
};

type CurrentWeatherUnits = {
  time: 'iso8601';
  interval: 'seconds';
  temperature: '°C' | '°F';
  windspeed: 'km/h' | 'm/s' | 'mph' | 'kn';
  winddirection: '°';
  is_day: '' | 0 | 1;
  weathercode: 'wmo code';
};

type CurrentWeather = {
  time: string; 
  interval: number; 
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: 0 | 1;
  weathercode: number;
};

type HourlyBlock = {
  time: string[];
  temperature_2m: number[];
  apparent_temperature?: number[];
  relative_humidity_2m?: number[];
  precipitation?: number[];
  wind_speed_10m?: number[];
  cloud_cover?: number[];
  weather_code?: number[];
};

type DailyBlock = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code?: number[];
};

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_weather_units?: CurrentWeatherUnits;
  current_weather?: CurrentWeather;

  hourly_units?: HourlyUnits;
  hourly?: HourlyBlock;

  daily_units?: DailyUnits;
  daily?: DailyBlock;
};
