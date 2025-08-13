import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Chip,
  Alert,
  AlertTitle,
  Badge
} from '@mui/material';
import { 
  Warning, 
  Error, 
  Info, 
  CheckCircle,
  BatteryAlert,
  SignalCellularConnectedNoInternet4Bar,
  FlightTakeoff,
  FlightLand
} from '@mui/icons-material';

const AlertPanel = ({ drones }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Generate alerts based on drone status
    const newAlerts = [];
    
    drones.forEach(drone => {
      // Battery alerts
      if (drone.battery < 20) {
        newAlerts.push({
          id: `${drone.id}-battery-critical`,
          type: 'error',
          title: 'Critical Battery Level',
          message: `${drone.name} battery at ${drone.battery.toFixed(1)}%`,
          drone: drone.name,
          timestamp: new Date(),
          icon: <BatteryAlert />
        });
      } else if (drone.battery < 40) {
        newAlerts.push({
          id: `${drone.id}-battery-low`,
          type: 'warning',
          title: 'Low Battery Warning',
          message: `${drone.name} battery at ${drone.battery.toFixed(1)}%`,
          drone: drone.name,
          timestamp: new Date(),
          icon: <BatteryAlert />
        });
      }

      // Signal strength alerts
      if (drone.signalStrength < 60) {
        newAlerts.push({
          id: `${drone.id}-signal-weak`,
          type: 'warning',
          title: 'Weak Signal',
          message: `${drone.name} signal strength at ${drone.signalStrength.toFixed(0)}%`,
          drone: drone.name,
          timestamp: new Date(),
          icon: <SignalCellularConnectedNoInternet4Bar />
        });
      }

      // Status alerts
      if (drone.status === 'docking') {
        newAlerts.push({
          id: `${drone.id}-docking`,
          type: 'info',
          title: 'Docking Underway',
          message: `${drone.name} is currently docking`,
          drone: drone.name,
          timestamp: new Date(),
          icon: <FlightLand />
        });
      }

      // Custom alerts from drone data
      drone.alerts.forEach(alert => {
        newAlerts.push({
          id: `${drone.id}-${alert.toLowerCase().replace(' ', '-')}`,
          type: 'warning',
          title: alert,
          message: `${drone.name}: ${alert}`,
          drone: drone.name,
          timestamp: new Date(),
          icon: <Warning />
        });
      });
    });

    setAlerts(newAlerts);
  }, [drones]);



  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const criticalAlerts = alerts.filter(alert => alert.type === 'error');
  const warningAlerts = alerts.filter(alert => alert.type === 'warning');
  const infoAlerts = alerts.filter(alert => alert.type === 'info');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          🚨 Mission Alerts
        </Typography>
        <Badge badgeContent={alerts.length} color="error">
          <Chip label="Active Alerts" color="primary" size="small" />
        </Badge>
      </Box>

      <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Critical Alerts ({criticalAlerts.length})</AlertTitle>
            {criticalAlerts.map((alert) => (
              <Box key={alert.id} sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {alert.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {alert.message} • {formatTime(alert.timestamp)}
                </Typography>
              </Box>
            ))}
          </Alert>
        )}

        {/* Warning Alerts */}
        {warningAlerts.length > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>Warnings ({warningAlerts.length})</AlertTitle>
            {warningAlerts.map((alert) => (
              <Box key={alert.id} sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {alert.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {alert.message} • {formatTime(alert.timestamp)}
                </Typography>
              </Box>
            ))}
          </Alert>
        )}

        {/* Info Alerts */}
        {infoAlerts.length > 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>Information ({infoAlerts.length})</AlertTitle>
            {infoAlerts.map((alert) => (
              <Box key={alert.id} sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {alert.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {alert.message} • {formatTime(alert.timestamp)}
                </Typography>
              </Box>
            ))}
          </Alert>
        )}

        {/* Mission Status Summary */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 2 }}>
            📋 Mission Status Summary
          </Typography>
          
          <List dense>
            {drones.map((drone) => (
              <ListItem key={drone.id} sx={{ 
                bgcolor: 'background.paper', 
                mb: 1, 
                borderRadius: 1,
                border: 1,
                borderColor: 'divider'
              }}>
                <ListItemIcon>
                  <FlightTakeoff color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={drone.name}
                  secondary={
                    <Box>
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        Status: {drone.status} • Battery: {drone.battery.toFixed(1)}% • Signal: {drone.signalStrength.toFixed(0)}%
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                        Altitude: {drone.altitude.toFixed(0)}m • GPS: {drone.latitude.toFixed(4)}, {drone.longitude.toFixed(4)}
                      </Typography>
                    </Box>
                  }
                />
                <Chip 
                  label={drone.status} 
                  color={drone.status === 'active' ? 'success' : drone.status === 'docking' ? 'warning' : 'default'}
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* No Alerts Message */}
        {alerts.length === 0 && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <AlertTitle>All Systems Normal</AlertTitle>
            No active alerts. All drones are operating within normal parameters.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default AlertPanel; 