import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { 
  DroneStatusCard, 
  AlertToast, 
  TelemetryChart, 
  ProgressIndicator, 
  StatusBadge, 
  MetricDisplay 
} from './index';

// Example data
const exampleDrone = {
  id: "example-drone",
  name: "Example Drone",
  battery: 75,
  altitude: 150,
  latitude: 19.1334,
  longitude: 72.9133,
  signalStrength: 85,
  status: "active",
  alerts: ["Battery Low", "Signal Interference"],
};

const exampleAlert = {
  id: "example-alert",
  drone: "Example Drone",
  message: "Battery level below 20%",
  timestamp: new Date().toLocaleTimeString(),
  level: "warning"
};

const exampleChartData = [
  { time: 0, altitude: 100, speed: 10, battery: 80 },
  { time: 1, altitude: 120, speed: 12, battery: 78 },
  { time: 2, altitude: 110, speed: 11, battery: 76 },
  { time: 3, altitude: 130, speed: 13, battery: 74 },
];

const ExampleUsage = () => {
  return (
    <div className="p-4">
      <h2 className="text-success mb-4">Modular Components Example Usage</h2>
      
      <Row className="g-4">
        {/* DroneStatusCard Example */}
        <Col xs={12} lg={6}>
          <Card className="bg-dark border-secondary">
            <Card.Header>
              <h5 className="text-success">DroneStatusCard Example</h5>
            </Card.Header>
            <Card.Body>
              <DroneStatusCard 
                drone={exampleDrone}
                showAlerts={true}
                showGPS={true}
                compact={false}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* AlertToast Example */}
        <Col xs={12} lg={6}>
          <Card className="bg-dark border-secondary">
            <Card.Header>
              <h5 className="text-success">AlertToast Example</h5>
            </Card.Header>
            <Card.Body>
              <AlertToast 
                alert={exampleAlert}
                dismissible={true}
                onDismiss={(id) => console.log('Dismissed:', id)}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* TelemetryChart Example */}
        <Col xs={12}>
          <Card className="bg-dark border-secondary">
            <Card.Header>
              <h5 className="text-success">TelemetryChart Example</h5>
            </Card.Header>
            <Card.Body>
              <TelemetryChart 
                data={exampleChartData}
                title="Example Telemetry Data"
                height={200}
                lines={[
                  { dataKey: 'altitude', stroke: '#00ff88', name: 'Altitude' },
                  { dataKey: 'speed', stroke: '#ff6b35', name: 'Speed' },
                  { dataKey: 'battery', stroke: '#ffd700', name: 'Battery' }
                ]}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Utility Components Examples */}
        <Col xs={12} lg={4}>
          <Card className="bg-dark border-secondary">
            <Card.Header>
              <h5 className="text-success">ProgressIndicator Examples</h5>
            </Card.Header>
            <Card.Body>
              <ProgressIndicator
                label="🔋 Battery"
                value={75}
                unit="%"
                variant="success"
              />
              <ProgressIndicator
                label="📶 Signal"
                value={45}
                unit="%"
                variant="warning"
              />
              <ProgressIndicator
                label="🛰️ GPS"
                value={95}
                unit="%"
                variant="info"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="bg-dark border-secondary">
            <Card.Header>
              <h5 className="text-success">StatusBadge Examples</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <StatusBadge status="Active" variant="success" />
                <StatusBadge status="Docking" variant="warning" />
                <StatusBadge status="Error" variant="danger" />
                <StatusBadge status="Offline" variant="secondary" />
              </div>
              <div className="d-flex flex-wrap gap-2">
                <StatusBadge status="Small" variant="info" size="small" />
                <StatusBadge status="Large" variant="primary" size="large" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="bg-dark border-secondary">
            <Card.Header>
              <h5 className="text-success">MetricDisplay Examples</h5>
            </Card.Header>
            <Card.Body>
              <MetricDisplay
                label="📏 Altitude"
                value={150}
                unit="m"
                variant="info"
              />
              <MetricDisplay
                label="📍 GPS Coordinates"
                value="19.1334, 72.9133"
                variant="muted"
                isMonospace
              />
              <MetricDisplay
                label="⚡ Speed"
                value={12.5}
                unit=" m/s"
                variant="success"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExampleUsage; 