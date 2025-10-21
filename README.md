# Weather Application# WeatherApp

A production-grade weather forecasting application built with Angular 20, providing real-time meteorological data with an intuitive interface for monitoring current conditions, hourly forecasts, and extended daily predictions.This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

## Overview## Development server

This application integrates with the Open-Meteo API to deliver comprehensive weather information including temperature, precipitation, humidity, wind speed, and cloud coverage metrics. The architecture leverages modern Angular features including standalone components, reactive programming patterns, and responsive design principles.To start a local development server, run:

## Technical Stack```bash

ng serve

### Core Framework```

- **Angular**: v20.3.0

- **TypeScript**: v5.9.2Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

- **RxJS**: v7.8.0

## Code scaffolding

### Styling & UI

- **Tailwind CSS**: v4.1.14Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

- **PostCSS**: v8.5.6

- **Custom Fonts**: Bricolage Grotesque, DM Sans```bash

ng generate component component-name

### Build & Development```

- **Angular CLI**: v20.3.3

- **Vite**: Custom configuration for optimized buildsFor a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

### Testing```bash

- **Jasmine**: v5.9.0ng generate --help

- **Karma**: v6.4.0```

## Architecture## Building

### Component StructureTo build the project run:

````bash

src/app/ng build

├── home/                    # Main container component```

│   ├── weather.service.ts   # Weather data orchestration

│   └── types.ts            # Type definitions and interfacesThis will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

├── search/                  # Location search functionality

│   └── search.service.ts   # Search logic and city data management## Running unit tests

├── today-info/             # Current weather display

├── hourly-forecast-list/   # Hourly weather projectionsTo execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

├── daily-forecast-list/    # Multi-day forecast overview

└── shared/                 # Reusable components and utilities```bash

    └── header/             # Application header with unit controlsng test

````

### Key Features## Running end-to-end tests

- **Real-time Weather Data**: Integration with Open-Meteo API for accurate meteorological informationFor end-to-end (e2e) testing, run:

- **Location Search**: Geocoding-based location lookup with autocomplete suggestions

- **Multi-unit Support**: Toggle between metric and imperial measurement systems```bash

- **Responsive Design**: Mobile-first approach with adaptive layoutsng e2e

- **Hourly Forecasts**: Detailed hour-by-hour weather projections```

- **Extended Forecasts**: 7-day weather outlook with temperature ranges

- **Type-safe Implementation**: Comprehensive TypeScript interfaces and type guardsAngular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Prerequisites## Additional Resources

- Node.js (LTS version recommended)For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

- npm or yarn package manager
- Modern web browser with ES6+ support

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd weather-app

# Install dependencies
npm install
```

## Development

### Local Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200/`. Hot module replacement is enabled for immediate feedback during development.

### Build Process

#### Development Build

```bash
npm run watch
```

#### Production Build

```bash
npm run build
```

Build artifacts are generated in the `dist/` directory with production optimizations including:

- Ahead-of-Time (AOT) compilation
- Tree-shaking for reduced bundle size
- Minification and obfuscation
- Source map generation

## Testing

### Unit Tests

```bash
npm test
```

Executes the test suite using Karma test runner with Jasmine framework. Tests run in Chrome with coverage reporting enabled.

### Code Coverage

Coverage reports are generated automatically during test execution and output to the `coverage/` directory.

## Configuration

### Environment Configuration

The application uses Angular's environment configuration system. Configuration files can be extended for different deployment environments.

### API Integration

Weather data is sourced from Open-Meteo API:

- Base URL: `https://api.open-meteo.com/v1/forecast`
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`

No API key required for Open-Meteo service.

## Code Quality

### Formatting Standards

Prettier configuration is defined in `package.json`:

- Print width: 100 characters
- Single quotes enabled
- Custom Angular parser for HTML templates

### Linting

The project follows Angular style guide conventions and TypeScript strict mode compilation.

## Project Structure

```
weather-app/
├── public/                 # Static assets
│   ├── cities.json        # City database for search
│   ├── fonts/             # Custom font files
│   └── images/            # Image assets
├── src/
│   ├── app/               # Application modules and components
│   ├── styles.css         # Global styles
│   ├── main.ts            # Application entry point
│   └── index.html         # HTML template
├── angular.json           # Angular workspace configuration
├── tsconfig.json          # TypeScript compiler options
├── vite.config.ts         # Vite build configuration
└── package.json           # Project dependencies and scripts
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Lazy loading implementation for route-based code splitting
- RxJS operators for efficient data stream management
- OnPush change detection strategy where applicable
- Optimized bundle sizes through tree-shaking

## Contributing

When contributing to this project:

1. Follow the established code style and conventions
2. Write unit tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting pull requests

## License

This project is private and proprietary.

## Technical Support

For technical inquiries or issues, please refer to the project's issue tracking system.
