import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  constructor(private searchService: SearchService) {}

  @Output() search = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  citiesResults: string[] = [];
  searchSuggestionsOpen = false;
  inputValue = '';

  onSubmit(location: string) {
    this.search.emit(location);
  }

  open() {
    this.searchSuggestionsOpen = true;
  }

  close() {
    this.searchSuggestionsOpen = false;
  }

  onSearchChange(userInput: string) {
    this.open();
    this.searchService.searchCityName(userInput).subscribe((results) => {
      this.citiesResults = results;
    });
  }

  addToInput(value: string) {
    this.inputValue = value;
    this.searchInput.nativeElement.value = value;
    this.close();
  }
}
