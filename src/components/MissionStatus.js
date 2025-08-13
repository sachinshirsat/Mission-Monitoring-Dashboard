import React from 'react';
import { DroneStatusCard } from './modular';

const MissionStatus = ({ drones }) => {
  return (
    <div className="h-100 d-flex flex-column">
      <h5 className="text-success mb-3">📋 Mission Status Summary</h5>
      
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
      </div>
    </div>
  );
};

export default MissionStatus; 