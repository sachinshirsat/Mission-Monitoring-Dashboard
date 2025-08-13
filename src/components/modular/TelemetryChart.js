import React from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TelemetryChart = ({ 
  data, 
  title = "Telemetry Data", 
  height = 200,
  lines = [],
  showGrid = true 
}) => {
  const defaultLines = [
    { dataKey: 'altitude', stroke: '#00ff88', name: 'Altitude' },
    { dataKey: 'speed', stroke: '#ff6b35', name: 'Speed' },
    { dataKey: 'battery', stroke: '#ffd700', name: 'Battery' }
  ];

  const chartLines = lines.length > 0 ? lines : defaultLines;

  return (
    <Card className="bg-dark border-secondary">
      <Card.Header className="bg-dark border-secondary">
        <h6 className="text-success mb-0">{title}</h6>
      </Card.Header>
      <Card.Body className="p-3">
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#444" />}
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #444',
                color: '#fff'
              }}
            />
            {chartLines.map((line, index) => (
              <Line 
                key={index}
                type="monotone" 
                dataKey={line.dataKey} 
                stroke={line.stroke} 
                strokeWidth={2}
                name={line.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default TelemetryChart; 