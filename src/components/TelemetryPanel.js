import React from 'react';
import { DroneStatusCard, TelemetryChart } from './modular';

const TelemetryPanel = ({ drones }) => {
  // Generate sample telemetry data for charts
  const generateTelemetryData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        time: i,
        altitude: Math.random() * 200 + 50,
        speed: Math.random() * 15 + 5,
        battery: Math.random() * 30 + 70
      });
    }
    return data;
  };

  const telemetryData = generateTelemetryData();

  return (
    <div className="h-100 d-flex flex-column">
      <h5 className="text-success mb-3">📊 Live Telemetry Data</h5>
      
      <div className="flex-grow-1 overflow-auto">
        {drones.map((drone) => (
          <DroneStatusCard 
            key={drone.id}
            drone={drone}
            showAlerts={true}
            showGPS={true}
            compact={false}
          />
        ))}
        
        {/* Telemetry Charts */}
        <TelemetryChart 
          data={telemetryData}
          title="Real-time Charts"
          height={200}
          lines={[
            { dataKey: 'altitude', stroke: '#00ff88', name: 'Altitude' },
            { dataKey: 'speed', stroke: '#ff6b35', name: 'Speed' }
          ]}
        />
      </div>
    </div>
  );
};

export default TelemetryPanel; 