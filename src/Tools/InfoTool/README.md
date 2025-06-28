# InfoTool Features Documentation

## Overview
The InfoTool is a comprehensive system information dashboard that provides real-time data about your device, browser, environment, and various APIs. It's designed to match the UI style of other tools in the system.

## Features Implemented

### 1. Time & Date Section 🕐
- **Local Time**: Real-time display using `new Date().toLocaleTimeString()`
- **UTC Time**: UTC time display using `new Date().toUTCString().split(' ')[4]`
- **Current Date**: Local date using `new Date().toLocaleDateString()`
- **Epoch/UNIX Timestamp**: Current timestamp using `Math.floor(Date.now() / 1000)`
- Updates every second automatically

### 2. Browser & Device Context 💻
- **Browser Info**: Name and version parsed from `navigator.userAgent`
- **Operating System**: Detected from `navigator.platform` and `navigator.userAgent`
- **Language/Locale**: From `navigator.language`
- **Screen Resolution**: Display screen dimensions using `window.screen.width×height`
- **Viewport Resolution**: Current window dimensions using `window.innerWidth×innerHeight`
- **Device Pixel Ratio**: High-DPI display ratio using `window.devicePixelRatio`
- **Online Status**: Network connectivity using `navigator.onLine`
- **CPU Cores**: Logical processor count using `navigator.hardwareConcurrency`
- **Device Memory**: Available RAM using `navigator.deviceMemory` (when supported)
- **Connection Info**: Network type and speed using `navigator.connection` (when available)

### 3. Sensors & Permissions 🔋
- **Battery Status**: 
  - Battery level and charging status via `navigator.getBattery()`
  - Visual progress bar with color coding (green >50%, yellow >20%, red ≤20%)
  - Charging indicator with appropriate emoji
- **Geolocation**: 
  - Latitude/longitude via `navigator.geolocation.getCurrentPosition()`
  - Graceful error handling for denied permissions
- **Notification Permissions**: Status using `Notification.permission`

### 4. Network & IP 🌐
- **Public IP Address**: Retrieved via CORS-enabled service `https://api.ipify.org?format=json`
- **Network Latency**: Simple ping test to measure round-trip time
- **Connection Quality**: Basic speed assessment (Good/Poor/Timeout)
- **Connection Type**: Mobile/WiFi connection details (when available)

### 5. "Today in..." Data via Public APIs 📅
- **Weather**: 
  - Current temperature (Celsius and Fahrenheit)
  - Weather conditions, humidity, wind speed
  - Location-based weather when geolocation is available
  - Uses `wttr.in` API for weather data
- **On This Day in History**: 
  - Historical events from Wikipedia's REST API
  - Format: `/feed/onthisday/events/{month}/{day}`
- **Quote of the Day**: Random inspirational quotes from `quotable.io` API
- **Moon Phase**: 
  - Client-side calculation of current lunar phase
  - Visual emoji representation of moon phases

### 6. Custom & Fun Extras 🎯
- **Visitor Counter**: 
  - Persistent count using localStorage
  - Increments each time the tool is loaded
- **Session Information**: Current session start time
- **Year Progress**: 
  - Days passed in current year
  - Total days in year
  - Percentage progress with visual progress bar
- **Refresh Functionality**: 
  - Manual refresh button for API data
  - Refreshes IP, quote, and network speed
  - Loading state indication

## Technical Implementation

### Real-time Updates
- Clock updates every second using `setInterval`
- Battery status updates when available
- Network status monitoring

### Error Handling
- Graceful fallbacks for unavailable APIs
- User-friendly error messages
- CORS-aware API requests

### UI/UX Features
- **Responsive Grid Layout**: Auto-adjusting cards based on screen size
- **Dark/Light Mode Support**: Inherits theme from parent application
- **Progress Bars**: Visual indicators for battery and year progress
- **Hover Effects**: Interactive cards with smooth transitions
- **Loading States**: Clear indication when data is being fetched
- **Consistent Styling**: Matches the design system of other tools

### API Integration
- **External APIs Used**:
  - `api.ipify.org` - Public IP detection
  - `wttr.in` - Weather data
  - `en.wikipedia.org/api/rest_v1` - Historical events
  - `api.quotable.io` - Daily quotes
- **Fallback Strategies**: Multiple fallback options for weather and other data
- **Rate Limiting Aware**: Reasonable refresh intervals to avoid API limits

### Browser Compatibility
- Uses feature detection for modern browser APIs
- Graceful degradation for unsupported features
- Cross-browser tested functionality

## Usage
1. Navigate to the Tools tab
2. Select "Info Tool" from the left navigation
3. View real-time system information
4. Use the refresh button to update API-dependent data
5. All data updates automatically where possible

## Privacy & Security
- No personal data is stored or transmitted
- Only uses public APIs with CORS support
- Geolocation requires explicit user permission
- All data processing happens client-side
