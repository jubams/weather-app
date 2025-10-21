import { NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type units = {
  [key: string]: string;
  Temperature: 'celsius' | 'fahrenheit';
  WindSpeed: 'kmh' | 'ms' | 'mph' | 'kn';
  Precipitation: 'mm' | 'inch';
};

export type UnitsDisplay = {
  [key: string]: string;
  Temperature: 'Celsius (°C)' | 'Fahrenheit (°F)';
  WindSpeed: 'km/h' | 'mph';
  Precipitation: 'Millimeters (mm)' | 'Inches (in)';
};

interface UnitOption {
  label: string;
  displayValues: string[];
  emitValues: string[];
}

@Component({
  selector: 'app-header',
  imports: [NgIf, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input({ required: true }) units!: units;
  @Output() unitsChange = new EventEmitter<units>();

  // Mapping for display
  displayUnits: UnitsDisplay = {
    Temperature: 'Celsius (°C)',
    WindSpeed: 'km/h',
    Precipitation: 'Millimeters (mm)',
  };

  unitsOptions: UnitOption[] = [
    {
      label: 'Temperature',
      displayValues: ['Celsius (°C)', 'Fahrenheit (°F)'],
      emitValues: ['celsius', 'fahrenheit'],
    },
    {
      label: 'WindSpeed',
      displayValues: ['km/h', 'mph'],
      emitValues: ['kmh', 'mph'],
    },
    {
      label: 'Precipitation',
      displayValues: ['Millimeters (mm)', 'Inches (in)'],
      emitValues: ['mm', 'inch'],
    },
  ];

  isOpen = false;

  ngOnInit() {
    this.updateDisplayUnits();
  }

  updateDisplayUnits() {
    this.unitsOptions.forEach((option) => {
      const currentValue = this.units[option.label];
      const index = option.emitValues.indexOf(currentValue);
      if (index !== -1) {
        this.displayUnits[option.label] = option.displayValues[index] as string;
      }
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  switchUnit(option: string, displayValue: string) {
    const unitOption = this.unitsOptions.find((opt) => opt.label === option);
    if (unitOption) {
      const index = unitOption.displayValues.indexOf(displayValue);
      if (index !== -1) {
        const emitValue = unitOption.emitValues[index];
        this.units[option] = emitValue;
        this.displayUnits[option] = displayValue as any;
        this.unitsChange.emit(this.units);
      }
    }
  }
}
