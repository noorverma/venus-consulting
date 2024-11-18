'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch appointment data
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/appointments/stats');
        const data = await response.json();
        setAppointmentData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Appointment Analytics</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Appointments Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Monthly Appointments</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ fill: '#f97316' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Daily Appointments Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Daily Appointments</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData.daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-500">Total Appointments</h3>
              <p className="text-3xl font-bold text-orange-500">
                {appointmentData.totalAppointments}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-500">This Month</h3>
              <p className="text-3xl font-bold text-orange-500">
                {appointmentData.thisMonthAppointments}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-500">Average per Day</h3>
              <p className="text-3xl font-bold text-orange-500">
                {appointmentData.averagePerDay}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Analytics;