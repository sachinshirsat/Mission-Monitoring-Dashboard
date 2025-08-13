import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import ProgressIndicator from './ProgressIndicator';
import StatusBadge from './StatusBadge';
import MetricDisplay from './MetricDisplay';

const DroneStatusCard = ({ 
  drone, 
  showAlerts = true, 
  showGPS = true, 
  showCharts = false,
  compact = false 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'docking': return 'warning';
      case 'error': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Card className="bg-dark border-secondary mb-3">
      <Card.Header className="bg-dark border-secondary">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <h6 className="text-success mb-0">{drone.name}</h6>
          </div>
          <StatusBadge 
            status={drone.status} 
            variant={getStatusColor(drone.status)}
          />
        </div>
      </Card.Header>
      <Card.Body className="p-3">
        <Row>
          {/* Battery */}
          <Col xs={12} sm={6} md={4}>
            <ProgressIndicator
              label="🔋 Battery"
              value={drone.battery}
              unit="%"
              variant={drone.battery > 60 ? 'success' : drone.battery > 30 ? 'warning' : 'danger'}
            />
          </Col>

          {/* Signal */}
          <Col xs={12} sm={6} md={4}>
            <ProgressIndicator
              label="📶 Signal"
              value={drone.signalStrength}
              unit="%"
              variant={drone.signalStrength > 80 ? 'success' : drone.signalStrength > 60 ? 'warning' : 'danger'}
            />
          </Col>

          {/* Altitude */}
          <Col xs={12} sm={6} md={4}>
            <MetricDisplay
              label="📏 Altitude"
              value={drone.altitude}
              unit="m"
              variant="info"
            />
          </Col>

          {/* GPS Coordinates */}
          {showGPS && (
            <Col xs={12} md={8}>
              <MetricDisplay
                label="📍 GPS Coordinates"
                value={`${drone.latitude.toFixed(6)}, ${drone.longitude.toFixed(6)}`}
                variant="muted"
                isMonospace
              />
            </Col>
          )}
        </Row>

        {/* Alerts Summary */}
        {showAlerts && drone.alerts.length > 0 && (
          <div className="mt-3 pt-3 border-top border-secondary">
            <small className="text-warning mb-2 d-block">Active Alerts:</small>
            <div className="d-flex flex-wrap gap-1">
              {drone.alerts.map((alert, index) => (
                <Badge 
                  key={index}
                  bg="warning" 
                  text="dark"
                  className="fs-6"
                >
                  {alert}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default DroneStatusCard; 