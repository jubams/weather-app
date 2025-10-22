import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return empty list for empty input without HTTP call', (done) => {
    service.searchCityName('   ').subscribe((res) => {
      expect(res).toEqual([]);
      done();
    });
    httpMock.expectNone('/cities.json');
  });

  it('should filter, sort, and limit results', (done) => {
    const cities = [
      { name: 'London' },
      { name: 'Los Angeles' },
      { name: 'Lodz' },
      { name: 'london Bridge' },
      { name: 'Berlin' },
    ];

    service.searchCityName('lo').subscribe((res) => {
      // Should contain only matching cities
      expect(res.length).toBe(4);
      expect(res).toEqual(jasmine.arrayContaining(['London', 'Los Angeles', 'Lodz', 'london Bridge']));
      // Should be sorted alphabetically
      const sorted = [...res].sort((a, b) => a.localeCompare(b));
      expect(res).toEqual(sorted);
      done();
    });

    const req = httpMock.expectOne('/cities.json');
    expect(req.request.method).toBe('GET');
    req.flush(cities);
  });

  it('should handle HTTP error and return empty list', (done) => {
    service.searchCityName('lo').subscribe((res) => {
      expect(res).toEqual([]);
      done();
    });

    const req = httpMock.expectOne('/cities.json');
    req.flush('boom', { status: 500, statusText: 'Server Error' });
  });
});
