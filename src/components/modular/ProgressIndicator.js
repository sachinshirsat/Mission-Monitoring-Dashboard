import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProgressIndicator = ({ 
  label, 
  value, 
  unit = "", 
  variant = "primary",
  showValue = true,
  className = "mb-3"
}) => {
  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <small className="text-light">{label}</small>
        {showValue && (
          <small className="text-light">
            {typeof value === 'number' ? value.toFixed(1) : value}{unit}
          </small>
        )}
      </div>
      <ProgressBar 
        variant={variant}
        now={value} 
        className="mb-2"
      />
    </div>
  );
};

export default ProgressIndicator; 