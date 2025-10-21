import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private static readonly limit = 15;

  private normalize(text: string): string {
    return (text ?? '').toLowerCase().trim();
  }

  private alphabetical(a: string, b: string): number {
    return a.localeCompare(b);
  }

  searchCityName(userInput: string): Observable<string[]> {
    const term = this.normalize(userInput);
    if (!term) return of([]);

    return this.http.get<ReadonlyArray<{ name: string }>>('/cities.json').pipe(
      map((cities) =>
        cities
          .filter((c) => this.normalize(c.name).startsWith(term))
          .map((c) => c.name)
          .sort(this.alphabetical)
          .slice(0, Math.max(0, SearchService.limit))
      ),
      catchError(() => of([]))
    );
  }
}
