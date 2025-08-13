# 🚁 Drone Mission Monitoring Dashboard

A comprehensive React-based dashboard for monitoring up to 3 active drones in real-time. Built with modern web technologies and designed for optimal operator awareness and quick decision-making.

## ✨ Features

### 🎯 Core Functionality
- **Live Telemetry Monitoring**: Real-time battery, altitude, GPS coordinates, and signal strength
- **Interactive Map**: Leaflet-based map showing drone locations with custom markers
- **Live Video Feed**: Simulated camera feed with playback controls
- **Mission Alerts**: Real-time alerts for battery low, GPS lost, docking status, etc.
- **Multi-Drone Support**: Switch between individual drones or monitor all simultaneously

### 🎨 User Interface
- **Dark Theme**: Optimized for control room environments
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live data simulation with 2-second intervals
- **Visual Indicators**: Color-coded status indicators and progress bars
- **Accessibility**: Keyboard navigation and screen reader support

### 📊 Dashboard Components

#### 1. Drone Selector
- Toggle between individual drones or view all drones
- Real-time drone count display
- Visual status indicators

#### 2. Live Map
- Interactive Leaflet map with OpenStreetMap tiles
- Custom drone markers with color coding
- Popup information for each drone
- Automatic map fitting for multiple drones

#### 3. Telemetry Panel
- Battery level with color-coded progress bars
- Altitude display in meters
- GPS coordinates in decimal format
- Signal strength indicators
- Speed monitoring (simulated)

#### 4. Video Feed
- Simulated live camera feed
- Play/pause controls
- Fullscreen toggle
- Recording indicator
- Video quality information

#### 5. Alert Panel
- Critical alerts (battery < 20%)
- Warning alerts (battery < 40%, weak signal)
- Information alerts (docking status)
- Mission status summary
- Timestamp for all alerts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drone-monitoring-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Bootstrap** - Component library for consistent UI
- **Leaflet** - Interactive maps
- **Emotion** - CSS-in-JS styling

### Key Dependencies
- `@mui/material` - Material Design components
- `@mui/icons-material` - Material Design icons
- `leaflet` - Interactive maps
- `react-leaflet` - React wrapper for Leaflet
- `recharts` - Data visualization (ready for future charts)

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop**: Full dashboard with all panels visible
- **Tablet**: Stacked layout with scrollable sections
- **Mobile**: Single-column layout with touch-friendly controls

## 🎨 Customization

### Theme Colors
The dashboard uses a dark theme optimized for control rooms:
- Primary: `#00ff88` (Green)
- Secondary: `#ff6b35` (Orange)
- Background: `#0a0a0a` (Dark)
- Paper: `#1a1a1a` (Medium Dark)

### Adding New Drones
To add more drones, modify the `drones` state in `App.js`:

```javascript
const [drones, setDrones] = useState([
  {
    id: 'drone-4',
    name: 'Delta-4',
    battery: 90,
    altitude: 150,
    latitude: 40.7130,
    longitude: -74.0070,
    signalStrength: 95,
    status: 'active',
    alerts: []
  }
  // ... add more drones
]);
```

## 🔧 Configuration

### Map Settings
- Default center: IIT Bombay, Powai, Mumbai (19.1334, 72.9133)
- Default zoom: 13
- Tile provider: OpenStreetMap

### Alert Thresholds
- Critical battery: < 20%
- Low battery: < 40%
- Weak signal: < 60%

### Update Intervals
- Telemetry updates: Every 2 seconds
- Map markers: Real-time position updates
- Alerts: Generated based on current drone status

## 🚨 Alert System

The dashboard automatically generates alerts based on:

### Critical Alerts (Red)
- Battery level below 20%
- GPS signal lost
- Communication failure

### Warning Alerts (Orange)
- Battery level below 40%
- Signal strength below 60%
- Approaching geofence boundaries

### Information Alerts (Blue)
- Docking procedures
- Mission status changes
- System notifications

## 🔮 Future Enhancements

### Planned Features
- **Real-time Charts**: Battery trends, altitude graphs
- **Flight Path History**: Track previous routes
- **Weather Integration**: Wind, temperature, visibility
- **Mission Planning**: Pre-flight route planning
- **Emergency Controls**: Manual override capabilities
- **Data Export**: CSV/JSON export of mission data

### Technical Improvements
- **WebSocket Integration**: Real-time data streaming
- **PWA Support**: Offline capabilities
- **Advanced Analytics**: Machine learning for predictive maintenance
- **Multi-language Support**: Internationalization
- **Advanced Permissions**: Role-based access control

---

