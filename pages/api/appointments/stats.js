export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      // Replace this with your actual database query
      const appointments = await prisma.appointment.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
          }
        }
      });
  
      // Process the data for charts
      const monthlyData = processMonthlyData(appointments);
      const dailyData = processDailyData(appointments);
  
      res.status(200).json({
        monthly: monthlyData,
        daily: dailyData,
        totalAppointments: appointments.length,
        thisMonthAppointments: appointments.filter(app => 
          app.createdAt.getMonth() === new Date().getMonth()
        ).length,
        averagePerDay: Math.round(appointments.length / 30)
      });
    } catch (error) {
      console.error('Error fetching appointment stats:', error);
      res.status(500).json({ message: 'Error fetching appointment statistics' });
    }
  }
  
  function processMonthlyData(appointments) {
    // Group appointments by month
    const monthlyGroups = appointments.reduce((acc, app) => {
      const month = app.createdAt.toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
  
    return Object.entries(monthlyGroups).map(([month, count]) => ({
      month,
      appointments: count
    }));
  }
  
  function processDailyData(appointments) {
    // Group appointments by day
    const dailyGroups = appointments.reduce((acc, app) => {
      const day = app.createdAt.toLocaleDateString();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
  
    return Object.entries(dailyGroups).map(([day, count]) => ({
      day: new Date(day).toLocaleDateString('default', { weekday: 'short' }),
      appointments: count
    }));
  }