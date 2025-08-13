# Modular Component Architecture

This directory contains reusable, modular components designed to improve code organization, maintainability, and reusability across the Mission Monitoring Dashboard.

## Component Overview

### Core Components

#### 1. **DroneStatusCard** (`DroneStatusCard.js`)
A comprehensive card component for displaying drone information with configurable sections.

**Props:**
- `drone` (object): Drone data object
- `showAlerts` (boolean): Whether to display alerts section (default: true)
- `showGPS` (boolean): Whether to display GPS coordinates (default: true)
- `showCharts` (boolean): Whether to display charts (default: false)
- `compact` (boolean): Whether to use compact layout (default: false)

**Usage:**
```jsx
<DroneStatusCard 
  drone={droneData}
  showAlerts={true}
  showGPS={true}
  compact={false}
/>
```

#### 2. **AlertToast** (`AlertToast.js`)
Individual alert notification component with consistent styling and optional dismiss functionality.

**Props:**
- `alert` (object): Alert data object with id, drone, message, timestamp, level
- `onDismiss` (function): Callback for dismiss action
- `dismissible` (boolean): Whether alert can be dismissed (default: false)

**Usage:**
```jsx
<AlertToast 
  alert={alertData}
  onDismiss={handleDismiss}
  dismissible={true}
/>
```

#### 3. **TelemetryChart** (`TelemetryChart.js`)
Reusable chart component for displaying telemetry data with configurable lines and styling.

**Props:**
- `data` (array): Chart data array
- `title` (string): Chart title (default: "Telemetry Data")
- `height` (number): Chart height in pixels (default: 200)
- `lines` (array): Array of line configurations (default: predefined lines)
- `showGrid` (boolean): Whether to show grid (default: true)

**Usage:**
```jsx
<TelemetryChart 
  data={telemetryData}
  title="Altitude Over Time"
  height={250}
  lines={[
    { dataKey: 'altitude', stroke: '#00ff88', name: 'Altitude' },
    { dataKey: 'speed', stroke: '#ff6b35', name: 'Speed' }
  ]}
/>
```

### Utility Components

#### 4. **ProgressIndicator** (`ProgressIndicator.js`)
Reusable progress bar component with label and value display.

**Props:**
- `label` (string): Progress bar label
- `value` (number): Current value
- `unit` (string): Unit of measurement (default: "")
- `variant` (string): Bootstrap variant (default: "primary")
- `showValue` (boolean): Whether to show value (default: true)
- `className` (string): Additional CSS classes (default: "mb-3")

**Usage:**
```jsx
<ProgressIndicator
  label="🔋 Battery"
  value={85.5}
  unit="%"
  variant="success"
/>
```

#### 5. **StatusBadge** (`StatusBadge.js`)
Reusable status badge component with consistent styling.

**Props:**
- `status` (string): Status text
- `variant` (string): Bootstrap variant (default: "secondary")
- `size` (string): Badge size - "small", "normal", "large" (default: "normal")
- `className` (string): Additional CSS classes (default: "")

**Usage:**
```jsx
<StatusBadge 
  status="Active"
  variant="success"
  size="normal"
/>
```

#### 6. **MetricDisplay** (`MetricDisplay.js`)
Reusable metric display component for showing values with labels.

**Props:**
- `label` (string): Metric label
- `value` (string|number): Metric value
- `unit` (string): Unit of measurement (default: "")
- `variant` (string): Text color variant (default: "light")
- `isMonospace` (boolean): Whether to use monospace font (default: false)
- `className` (string): Additional CSS classes (default: "mb-3")

**Usage:**
```jsx
<MetricDisplay
  label="📏 Altitude"
  value={120}
  unit="m"
  variant="info"
/>
```

## Benefits of Modular Architecture

### 1. **Reusability**
- Components can be used across different parts of the application
- Consistent UI/UX patterns throughout the dashboard
- Reduced code duplication

### 2. **Maintainability**
- Centralized styling and logic
- Easier to update and modify components
- Better separation of concerns

### 3. **Flexibility**
- Configurable props for different use cases
- Easy to extend with new features
- Consistent API across components

### 4. **Testing**
- Smaller, focused components are easier to test
- Isolated functionality for unit testing
- Better test coverage

## Migration Guide

### Before (Monolithic Components)
```jsx
// Old TelemetryPanel with inline components
<Card className="bg-dark border-secondary mb-3">
  <Card.Header>
    <h6>{drone.name}</h6>
    <Badge bg="success">{drone.status}</Badge>
  </Card.Header>
  <Card.Body>
    <ProgressBar variant="success" now={drone.battery} />
    {/* More inline components... */}
  </Card.Body>
</Card>
```

### After (Modular Components)
```jsx
// New TelemetryPanel using modular components
<DroneStatusCard 
  drone={drone}
  showAlerts={true}
  showGPS={true}
/>
```

## Best Practices

1. **Import from index**: Use the index file for clean imports
   ```jsx
   import { DroneStatusCard, AlertToast } from './modular';
   ```

2. **Consistent props**: Follow the established prop patterns for consistency

3. **Default values**: Always provide sensible default values for optional props

4. **Documentation**: Update this README when adding new components

5. **Testing**: Write tests for each modular component

## Future Enhancements

- Add TypeScript definitions for better type safety
- Create storybook stories for component documentation
- Add animation support for interactive components
- Implement theme support for different color schemes 