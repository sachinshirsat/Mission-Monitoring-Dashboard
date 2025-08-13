import React, { useState } from 'react';
import { Card, Button, ButtonGroup, Badge, Row, Col } from 'react-bootstrap';

const VideoFeed = ({ selectedDrone }) => {
  const [activeTab, setActiveTab] = useState(0);

  const drones = [
    { id: 'drone-1', name: 'Alpha-1', status: 'active' },
    { id: 'drone-2', name: 'Beta-2', status: 'active' },
    { id: 'drone-3', name: 'Gamma-3', status: 'docking' }
  ];

  const SingleDroneFeed = ({ drone }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
      <Card className="bg-dark border-secondary h-100">
        <Card.Body className="p-0 h-100 d-flex flex-column">
          {/* Video Display Area */}
          <div 
            className="flex-grow-1 bg-black position-relative d-flex align-items-center justify-content-center rounded mb-2"
            style={{ minHeight: '70%' }}
          >
            {/* Simulated video feed */}
            <div className="text-center text-white">
              
              <div className="mb-2">Live Video: {drone.name}</div>
              <small className="opacity-75">
                {isPlaying ? 'LIVE' : 'PAUSED'} • 1080p • 30fps
              </small>
            </div>

            {/* Overlay controls */}
            <div className="position-absolute top-0 end-0 p-2 d-flex gap-1">
              <Button 
                size="sm" 
                variant="dark"
                className="bg-dark bg-opacity-50 border-0"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </Button>
              
            </div>

            {/* Recording indicator */}
            <div className="position-absolute top-0 start-0 p-2 d-flex align-items-center gap-1">
              <div 
                className="bg-danger rounded-circle"
                style={{ 
                  width: '8px', 
                  height: '8px',
                  animation: 'pulse 1s infinite'
                }} 
              />
              <small className="text-white">REC</small>
            </div>
          </div>

          {/* Video Controls */}
          <Row className="p-2 g-1">
            <Col xs={4}>
              <div className="d-flex align-items-center gap-1">
                <Button size="sm" variant="outline-success" className="p-1">
                  🎤
                </Button>
                <small>Audio</small>
              </div>
            </Col>
            <Col xs={4}>
              <div className="d-flex align-items-center gap-1">
                <Button size="sm" variant="outline-success" className="p-1">
                  ⚙️
                </Button>
                <small>Settings</small>
              </div>
            </Col>
            <Col xs={4}>
              <div className="d-flex align-items-center gap-1">
                <span className="text-success">📹</span>
                <small>HD</small>
              </div>
            </Col>
          </Row>

          {/* Video Info */}
          <div className="p-2 border-top border-secondary">
            <Row>
              <Col xs={6}>
                <small className="text-muted">Resolution: 1920x1080</small>
              </Col>
              <Col xs={6}>
                <small className="text-muted">FPS: 30</small>
              </Col>
              <Col xs={6}>
                <small className="text-muted">Codec: H.264</small>
              </Col>
              <Col xs={6}>
                <small className="text-muted">Bitrate: 5 Mbps</small>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-success mb-0">📹 Live Video</h5>
        <ButtonGroup size="sm">
          {drones.map((drone, index) => (
            <Button
              key={drone.id}
              variant={activeTab === index ? 'success' : 'outline-success'}
              onClick={() => setActiveTab(index)}
            >
              {drone.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="flex-grow-1">
        <SingleDroneFeed drone={drones[activeTab]} />
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default VideoFeed; 