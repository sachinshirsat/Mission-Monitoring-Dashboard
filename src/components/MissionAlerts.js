import React from 'react';
import { Card, ListGroup, Badge, Alert } from 'react-bootstrap';
import { AlertToast } from './modular';

const MissionAlerts = ({ drones }) => {
  const getAlertLevel = (alert) => {
    if (alert.toLowerCase().includes('critical') || alert.toLowerCase().includes('error')) {
      return 'danger';
    }
    if (alert.toLowerCase().includes('warning') || alert.toLowerCase().includes('low')) {
      return 'warning';
    }
    return 'info';
  };

  // Generate sample alerts for demonstration
  const generateAlerts = () => {
    const alerts = [];
    drones.forEach(drone => {
      if (drone.alerts.length > 0) {
        drone.alerts.forEach(alert => {
          alerts.push({
            id: `${drone.id}-${alert}`,
            drone: drone.name,
            message: alert,
            timestamp: new Date().toLocaleTimeString(),
            level: getAlertLevel(alert)
          });
        });
      }
    });

    // Add some system alerts
    alerts.push(
      {
        id: 'system-1',
        drone: 'System',
        message: 'Weather conditions favorable for flight',
        timestamp: new Date().toLocaleTimeString(),
        level: 'success'
      },
      {
        id: 'system-2',
        drone: 'System',
        message: 'GPS signal strength optimal',
        timestamp: new Date().toLocaleTimeString(),
        level: 'info'
      }
    );

    return alerts;
  };

  const alerts = generateAlerts();

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-success mb-0">🚨 Mission Alerts</h5>
        <Badge bg="danger" className="fs-6">
          {alerts.filter(alert => alert.level === 'danger').length} Critical
        </Badge>
      </div>
      
      <div className="flex-grow-1 overflow-auto">
        {alerts.length === 0 ? (
          <Alert variant="success" className="text-center">
            <div className="h4 mb-2">✅</div>
            <div>All systems operational</div>
            <small className="text-muted">No active alerts</small>
          </Alert>
        ) : (
          <ListGroup className="list-group-flush">
            {alerts.map((alert) => (
              <AlertToast 
                key={alert.id}
                alert={alert}
                dismissible={false}
              />
            ))}
          </ListGroup>
        )}
      </div>

      {/* Alert Summary */}
      <Card className="bg-dark border-secondary mt-3">
        <Card.Body className="p-3">
          <h6 className="text-success mb-2">📊 Alert Summary</h6>
          <div className="d-flex justify-content-between">
            <div className="text-center">
              <div className="h4 text-danger mb-0">
                {alerts.filter(a => a.level === 'danger').length}
              </div>
              <small className="text-muted">Critical</small>
            </div>
            <div className="text-center">
              <div className="h4 text-warning mb-0">
                {alerts.filter(a => a.level === 'warning').length}
              </div>
              <small className="text-muted">Warnings</small>
            </div>
            <div className="text-center">
              <div className="h4 text-info mb-0">
                {alerts.filter(a => a.level === 'info').length}
              </div>
              <small className="text-muted">Info</small>
            </div>
            <div className="text-center">
              <div className="h4 text-success mb-0">
                {alerts.filter(a => a.level === 'success').length}
              </div>
              <small className="text-muted">Success</small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MissionAlerts; 