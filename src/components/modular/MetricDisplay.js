import React from 'react';

const MetricDisplay = ({ 
  label, 
  value, 
  unit = "", 
  variant = "light",
  isMonospace = false,
  className = "mb-3"
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-danger';
      case 'info': return 'text-info';
      case 'muted': return 'text-muted';
      default: return 'text-light';
    }
  };

  const getValueSize = () => {
    if (typeof value === 'number' && value > 999) return 'h4';
    if (typeof value === 'string' && value.length > 20) return 'h6';
    return 'h5';
  };

  return (
    <div className={className}>
      <small className="text-light">{label}</small>
      <div className={`${getValueSize()} ${getVariantClass()} mb-0 ${isMonospace ? 'font-monospace' : ''}`}>
        {typeof value === 'number' ? value.toFixed(1) : value}{unit}
      </div>
    </div>
  );
};

export default MetricDisplay; 