import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import DroneMap from "./components/DroneMap";
import TelemetryPanel from "./components/TelemetryPanel";
import VideoFeed from "./components/VideoFeed";
import MissionAlerts from "./components/MissionAlerts";
import MissionStatus from "./components/MissionStatus";
import DroneSelector from "./components/DroneSelector";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [selectedDrone, setSelectedDrone] = useState("all");
  const [drones, setDrones] = useState([
    {
      id: "drone-1",
      name: "Alpha-1",
      battery: 85,
      altitude: 120,
      latitude: 19.1334,
      longitude: 72.9133,
      signalStrength: 92,
      status: "active",
      alerts: [],
    },
    {
      id: "drone-2",
      name: "Beta-2",
      battery: 45,
      altitude: 85,
      latitude: 19.135,
      longitude: 72.915,
      signalStrength: 78,
      status: "active",
      alerts: ["Battery Low"],
    },
    {
      id: "drone-3",
      name: "Gamma-3",
      battery: 95,
      altitude: 200,
      latitude: 19.131,
      longitude: 72.911,
      signalStrength: 88,
      status: "docking",
      alerts: ["Docking Underway"],
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDrones((prevDrones) =>
        prevDrones.map((drone) => ({
          ...drone,
          battery: Math.max(0, drone.battery - Math.random() * 0.5),
          altitude: drone.altitude + (Math.random() - 0.5) * 2,
          latitude: drone.latitude + (Math.random() - 0.5) * 0.0001,
          longitude: drone.longitude + (Math.random() - 0.5) * 0.0001,
          signalStrength: Math.max(
            50,
            drone.signalStrength + (Math.random() - 0.5) * 2
          ),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const selectedDrones =
    selectedDrone === "all"
      ? drones
      : drones.filter((d) => d.id === selectedDrone);

  return (
    <div className="bg-dark text-light min-vh-100">
      <Container
        fluid
        className="py-4"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <h1 className="text-success mb-4 text-center">
          Mission Monitoring Dashboard
        </h1>

        <DroneSelector
          drones={drones}
          selectedDrone={selectedDrone}
          onDroneSelect={setSelectedDrone}
        />

        <Row className="mt-3 g-3">
          {/* Map Section - Full Width */}
          <Col xs={12} lg={4}>
            <Card
              className="bg-dark border-secondary mb-3"
              style={{ height: "75vh" }}
            >
              <Card.Body className="p-3">
                <DroneMap drones={selectedDrones} />
              </Card.Body>
            </Card>
          </Col>
          {/* Live Telemetry - Left Column (50%) */}
          <Col xs={12} lg={4}>
            <Card
              className="bg-dark border-secondary mb-3"
              style={{ height: "75vh" }}
            >
              <Card.Body className="p-3" style={{ overflow: "auto" }}>
                <TelemetryPanel drones={selectedDrones} />
              </Card.Body>
            </Card>
          </Col>
          {/* Live Video Feed - Full Width (same as Map) */}
          <Col xs={12} lg={4}>
            <Card
              className="bg-dark border-secondary mb-3"
              style={{ height: "75vh" }}
            >
              <Card.Body className="p-3">
                <VideoFeed selectedDrone={selectedDrone} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3 g-3">
          {/* Live Video Feed - Full Width (same as Map) */}
          {/* <Col xs={12} lg={6}>
            <Card
              className="bg-dark border-secondary mb-3"
              style={{ height: "75vh" }}
            >
              <Card.Body className="p-3">
                <VideoFeed selectedDrone={selectedDrone} />
              </Card.Body>
            </Card>
          </Col> */}

          {/* Mission Status - Full Width */}
          <Col xs={12} lg={6}>
            <Card
              className="bg-dark border-secondary mb-3"
              style={{ height: "75vh" }}
            >
              <Card.Body className="p-3" style={{ overflow: "auto" }}>
                <MissionStatus drones={drones} />
              </Card.Body>
            </Card>
          </Col>

          {/* Mission Alerts - Right Column (50%) */}
          <Col xs={12} lg={6}>
            <Card
              className="bg-dark border-secondary mb-3"
              style={{ height: "55vh" }}
            >
              <Card.Body className="p-3" style={{ overflow: "auto" }}>
                <MissionAlerts drones={drones} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
      </Container>
    </div>
  );
}

export default App;
