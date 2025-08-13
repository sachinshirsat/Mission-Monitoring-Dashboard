import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const AlertToast = ({ alert, onDismiss, dismissible = false }) => {
  const getAlertIcon = (level) => {
    switch (level) {
      case 'danger': return '🚨';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  const getAlertLevelText = (level) => {
    switch (level) {
      case 'danger': return 'Critical';
      case 'warning': return 'Warning';
      case 'success': return 'Info';
      default: return 'Info';
    }
  };

  return (
    <ListGroup.Item 
      className="bg-dark border-secondary d-flex justify-content-between align-items-start p-3"
    >
      <div className="d-flex align-items-start gap-2 flex-grow-1">
        <div className="fs-5">{getAlertIcon(alert.level)}</div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <strong className="text-light">{alert.drone}</strong>
            <small className="text-muted">{alert.timestamp}</small>
          </div>
          <div className="text-light">{alert.message}</div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Badge bg={alert.level}>
          {getAlertLevelText(alert.level)}
        </Badge>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => onDismiss(alert.id)}
            aria-label="Close"
          />
        )}
      </div>
    </ListGroup.Item>
  );
};

export default AlertToast; 