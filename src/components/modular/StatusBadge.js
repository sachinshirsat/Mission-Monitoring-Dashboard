import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusBadge = ({ 
  status, 
  variant = "secondary",
  size = "normal",
  className = ""
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'fs-6';
      case 'large': return 'fs-5';
      default: return '';
    }
  };

  return (
    <Badge 
      bg={variant}
      className={`${getSizeClass()} ${className}`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge; 