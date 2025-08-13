import React from 'react';
import { ButtonGroup, Button, Badge } from 'react-bootstrap';

const DroneSelector = ({ drones, selectedDrone, onDroneSelect }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'docking': return 'warning';
      case 'error': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="text-success mb-0">Active Drones</h5>
        <Badge bg="info" className="fs-6">
          {drones.filter(d => d.status === 'active').length} Active
        </Badge>
      </div>
      
      <ButtonGroup className="w-100">
        <Button
          variant={selectedDrone === 'all' ? 'success' : 'outline-success'}
          onClick={() => onDroneSelect('all')}
          className="flex-fill"
        >
          All Drones
          <Badge bg="light" text="dark" className="ms-2">
            {drones.length}
          </Badge>
        </Button>
        
        {drones.map((drone) => (
          <Button
            key={drone.id}
            variant={selectedDrone === drone.id ? 'success' : 'outline-success'}
            onClick={() => onDroneSelect(drone.id)}
            className="flex-fill position-relative"
          >
            {drone.name}
            <Badge 
              bg={getStatusColor(drone.status)} 
              className="ms-2"
            >
              {drone.status}
            </Badge>
            
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default DroneSelector; 