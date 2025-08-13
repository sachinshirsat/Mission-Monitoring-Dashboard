import React, { useEffect, useRef, useState } from 'react';
import { Badge } from 'react-bootstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom drone icon
const createDroneIcon = (color = '#00ff88', status = 'active') => {
  const statusIndicator = status === 'active' ? '🟢' : status === 'docking' ? '🟡' : '🔴';
  return L.divIcon({
    html: `
      <div style="
        width: 24px; 
        height: 24px; 
        background-color: ${color}; 
        border: 2px solid white; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: relative;
      ">
        <div style="
          width: 10px; 
          height: 10px; 
          background-color: #000; 
          border-radius: 50%;
        "></div>
        <div style="
          position: absolute;
          top: -2px;
          right: -2px;
          font-size: 8px;
          background: rgba(0,0,0,0.8);
          border-radius: 50%;
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        ">${statusIndicator}</div>
      </div>
    `,
    className: 'custom-drone-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const DroneMap = ({ drones }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const flightPathsRef = useRef({});
  const waypointsRef = useRef({});
  const controlZonesRef = useRef({});
  const legendRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map only once
    if (!mapInstanceRef.current) {
      try {
        // IIT Bombay, Powai, Mumbai coordinates
        mapInstanceRef.current = L.map(mapRef.current, {
          center: [19.1334, 72.9133], // IIT Bombay, Powai, Mumbai
          zoom: 16,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          dragging: true,
          touchZoom: true,
          tap: true
        });
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(mapInstanceRef.current);

        // Add scale control
        L.control.scale({
          imperial: true,
          metric: true,
          position: 'bottomleft'
        }).addTo(mapInstanceRef.current);

        // Add map legend only once
        legendRef.current = L.control({ position: 'topright' });
        legendRef.current.onAdd = function() {
          const div = L.DomUtil.create('div', 'info legend');
          div.style.backgroundColor = 'rgba(0,0,0,0.8)';
          div.style.color = 'white';
          div.style.padding = '10px';
          div.style.borderRadius = '5px';
          div.style.fontSize = '12px';
          div.style.fontFamily = 'Arial, sans-serif';
          div.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #00ff88;">Map Legend</h4>
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 20px; height: 20px; background: #00ff88; border-radius: 50%; margin-right: 8px;"></span>
              <span>Active Drones</span>
            </div>
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 20px; height: 20px; background: #ff6b35; border-radius: 50%; margin-right: 8px;"></span>
              <span>Docking Drones</span>
            </div>
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 20px; height: 20px; background: #4ecdc4; border-radius: 50%; margin-right: 8px;"></span>
              <span>Mission Drones</span>
            </div>
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 12px; height: 12px; background: #ff4444; border-radius: 50%; margin-right: 8px;"></span>
              <span>Restricted Zones</span>
            </div>
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 12px; height: 12px; background: #ffaa00; border-radius: 50%; margin-right: 8px;"></span>
              <span>Caution Zones</span>
            </div>
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 12px; height: 12px; background: #333; border-radius: 50%; margin-right: 8px;"></span>
              <span>Landing Pads</span>
            </div>
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 12px; height: 12px; background: #00ff88; border-radius: 50%; margin-right: 8px;"></span>
              <span>Waypoints</span>
            </div>
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 20px; height: 3px; background: #00ff88; margin-right: 8px;"></span>
              <span>Flight Paths</span>
            </div>
          `;
          return div;
        };
        legendRef.current.addTo(mapInstanceRef.current);

        // Set map as loaded
        setMapLoaded(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    // Force map refresh to ensure proper rendering
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 100);

    // Clear existing markers and overlays
    Object.values(markersRef.current).forEach(marker => {
      if (marker && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(marker);
      }
    });
    Object.values(flightPathsRef.current).forEach(path => {
      if (path && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(path);
      }
    });
    Object.values(waypointsRef.current).forEach(waypoint => {
      if (waypoint && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(waypoint);
      }
    });
    Object.values(controlZonesRef.current).forEach(zone => {
      if (zone && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(zone);
      }
    });
    markersRef.current = {};
    flightPathsRef.current = {};
    waypointsRef.current = {};
    controlZonesRef.current = {};

    // Add drone markers around IIT Bombay
    drones.forEach((drone, index) => {
      const colors = ['#00ff88', '#ff6b35', '#4ecdc4'];
      const color = colors[index % colors.length];
      
      // Position drones around IIT Bombay campus
      const dronePositions = [
        [19.1334, 72.9133], // IIT Bombay main campus
        [19.1350, 72.9150], // Near Powai Lake
        [19.1310, 72.9110]  // Near IIT gate
      ];
      
      const position = dronePositions[index] || [19.1334, 72.9133];
      
      const marker = L.marker(position, {
        icon: createDroneIcon(color, drone.status)
      }).addTo(mapInstanceRef.current);

      // Add popup with enhanced drone info
      const popupContent = `
        <div style="font-family: Arial, sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 10px 0; color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 5px;">
            ${drone.name}
          </h3>
          <div style="margin: 8px 0;">
            <p style="margin: 3px 0; font-size: 12px;"><strong>📍 Location:</strong> ${position[0].toFixed(6)}, ${position[1].toFixed(6)}</p>
            <p style="margin: 3px 0; font-size: 12px;"><strong>🔋 Battery:</strong> ${drone.battery.toFixed(1)}%</p>
            <p style="margin: 3px 0; font-size: 12px;"><strong>📡 Signal:</strong> ${drone.signalStrength.toFixed(0)}%</p>
            <p style="margin: 3px 0; font-size: 12px;"><strong>🛩️ Altitude:</strong> ${drone.altitude.toFixed(0)}m</p>
            <p style="margin: 3px 0; font-size: 12px;"><strong>⚡ Speed:</strong> ${(Math.random() * 15 + 5).toFixed(1)} m/s</p>
            <p style="margin: 3px 0; font-size: 12px;"><strong>🎯 Status:</strong> ${drone.status.toUpperCase()}</p>
            <p style="margin: 3px 0; font-size: 12px;"><strong>🕐 Last Update:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
          <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-size: 11px; color: #666;">
            <p style="margin: 2px 0;">Mission: IIT Bombay Campus Surveillance</p>
            <p style="margin: 2px 0;">Operator: Control Room 1</p>
            <p style="margin: 2px 0;">Flight Time: ${Math.floor(Math.random() * 45 + 15)} min</p>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      markersRef.current[drone.id] = marker;

      // Add flight path (dummy data) around IIT Bombay
      const flightPath = L.polyline([
        [position[0] - 0.001, position[1] - 0.001],
        [position[0] - 0.0005, position[1] - 0.0005],
        position
      ], {
        color: color,
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5'
      }).addTo(mapInstanceRef.current);
      flightPathsRef.current[drone.id] = flightPath;

      // Add waypoints (dummy data) around IIT Bombay
      const waypoint1 = L.circleMarker([position[0] - 0.0008, position[1] - 0.0008], {
        radius: 6,
        fillColor: color,
        color: 'white',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapInstanceRef.current);
      waypoint1.bindPopup(`<div style="font-family: Arial, sans-serif; font-size: 12px;"><strong>Waypoint 1</strong><br/>${drone.name} Route - IIT Bombay</div>`);
      waypointsRef.current[`${drone.id}-wp1`] = waypoint1;

      const waypoint2 = L.circleMarker([position[0] - 0.0004, position[1] - 0.0004], {
        radius: 6,
        fillColor: color,
        color: 'white',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapInstanceRef.current);
      waypoint2.bindPopup(`<div style="font-family: Arial, sans-serif; font-size: 12px;"><strong>Waypoint 2</strong><br/>${drone.name} Route - IIT Bombay</div>`);
      waypointsRef.current[`${drone.id}-wp2`] = waypoint2;
    });

    // Add control zones around IIT Bombay (dummy data)
    const controlZone1 = L.circle([19.1334, 72.9133], {
      color: '#ff4444',
      fillColor: '#ff4444',
      fillOpacity: 0.1,
      radius: 300
    }).addTo(mapInstanceRef.current);
    controlZone1.bindPopup('<div style="font-family: Arial, sans-serif; font-size: 12px;"><strong>🚫 Restricted Zone</strong><br/>IIT Bombay Main Campus - No-fly area</div>');
    controlZonesRef.current['zone1'] = controlZone1;

    const controlZone2 = L.circle([19.1350, 72.9150], {
      color: '#ffaa00',
      fillColor: '#ffaa00',
      fillOpacity: 0.1,
      radius: 200
    }).addTo(mapInstanceRef.current);
    controlZone2.bindPopup('<div style="font-family: Arial, sans-serif; font-size: 12px;"><strong>⚠️ Caution Zone</strong><br/>Powai Lake Area - Reduced speed</div>');
    controlZonesRef.current['zone2'] = controlZone2;

    // Add landing pad markers around IIT Bombay
    L.marker([19.1330, 72.9130], {
      icon: L.divIcon({
        html: '<div style="background: #333; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">🛬 LP-1</div>',
        className: 'landing-pad-marker',
        iconSize: [60, 20],
        iconAnchor: [30, 10]
      })
    }).addTo(mapInstanceRef.current);

    L.marker([19.1340, 72.9140], {
      icon: L.divIcon({
        html: '<div style="background: #333; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">🛬 LP-2</div>',
        className: 'landing-pad-marker',
        iconSize: [60, 20],
        iconAnchor: [30, 10]
      })
    }).addTo(mapInstanceRef.current);

  }, [drones]);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-success mb-0">🗺️ Live Drone Locations</h5>
        <div className="d-flex gap-2">
          <Badge bg="success" className="fs-6">
            {drones.filter(d => d.status === 'active').length} Active
          </Badge>
          <Badge bg="warning" className="fs-6">
            {drones.filter(d => d.status === 'docking').length} Docking
          </Badge>
        </div>
      </div>
      
      <div className="flex-grow-1 position-relative">
        <div 
          ref={mapRef} 
          className="w-100 h-100"
          style={{ 
            minHeight: '400px',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        />
        
        {!mapLoaded && (
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-2 text-light">Loading map...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DroneMap; 