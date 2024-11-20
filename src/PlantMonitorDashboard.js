import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { 
  Droplet, 
  Thermometer, 
  Sun, 
  Battery, 
  AlertTriangle, 
  Zap
} from 'lucide-react';

const PlantMonitorDashboard = () => {
  const [sensorData, setSensorData] = useState({
    moisture: 45,
    temperature: 22,
    light: 450,
    waterLevel: 30,
    lastWatered: new Date().toLocaleString()
  });

  const [historicalData] = useState([
    { time: '9am', moisture: 40, temperature: 20, light: 300 },
    { time: '10am', moisture: 45, temperature: 22, light: 450 },
    { time: '11am', moisture: 50, temperature: 23, light: 600 },
    { time: '12pm', moisture: 48, temperature: 24, light: 550 }
  ]);

  const waterPlant = () => {
    setSensorData(prev => ({
      ...prev,
      moisture: Math.min(prev.moisture + 20, 100),
      lastWatered: new Date().toLocaleString()
    }));
  };

  return (
    <div className="bg-gradient-to-br from-green-500 to-green-700 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12">
        {/* Header */}
        <div className="bg-green-800 text-white p-6 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold">Inventify Team Project</h1>
          <div className="flex items-center space-x-3">
            <Zap className="w-7 h-7 md:w-8 md:h-8" />
            <span className="text-lg md:text-xl font-medium">Connected</span>
          </div>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8">
          {[
            { 
              icon: Droplet, 
              label: 'Moisture', 
              value: `${sensorData.moisture}%`, 
              color: sensorData.moisture < 40 ? 'text-red-500' : 'text-green-500' 
            },
            { 
              icon: Thermometer, 
              label: 'Temperature', 
              value: `${sensorData.temperature}°C`, 
              color: sensorData.temperature < 20 || sensorData.temperature > 30 ? 'text-yellow-500' : 'text-green-500' 
            },
            { 
              icon: Sun, 
              label: 'Light', 
              value: `${sensorData.light} lux`, 
              color: sensorData.light < 300 ? 'text-blue-500' : 'text-green-500' 
            },
            { 
              icon: Battery, 
              label: 'Water Level', 
              value: `${sensorData.waterLevel}%`, 
              color: sensorData.waterLevel < 20 ? 'text-red-500' : 'text-green-500' 
            }
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white border-2 border-green-500 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between">
                <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${color}`} />
                <div className="text-right">
                  <p className="text-lg sm:text-xl text-gray-600">{label}</p>
                  <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="p-6 md:p-8 bg-gray-100 flex justify-between items-center">
          <div>
            <p className="text-lg text-gray-600">Last Watered: {sensorData.lastWatered}</p>
            {sensorData.moisture < 40 && (
              <div className="text-red-600 flex items-center mt-2">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Low Moisture - Plant Needs Attention
              </div>
            )}
          </div>
          <button 
            onClick={waterPlant}
            className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-colors flex items-center shadow-lg"
          >
            <Droplet className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Water Plant
          </button>
        </div>

        {/* Historical Chart */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-6 text-gray-800">Sensor History</h2>
          <div className="bg-white border-2 border-green-500 rounded-xl shadow-lg p-5 sm:p-6">
            <LineChart width={800} height={400} data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="time" stroke="#888" >
                <Label value="Time" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis stroke="#888">
                <Label value="Sensor Readings" angle="-90" position="insideLeft" />
              </YAxis>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="moisture" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="temperature" stroke="#F43F5E" strokeWidth={3} />
              <Line type="monotone" dataKey="light" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantMonitorDashboard;