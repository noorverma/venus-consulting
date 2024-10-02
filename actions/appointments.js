//Used perplexity for reference
'use server';

import prisma from "@/app/Lib/prisma"

export async function createAppointment(data) {
  try {
    const { name, email, phone, reason, date, time, userId } = data;

    if (!name || !email || !phone || !reason || !date || !time) {
      throw new Error('All fields are required');
    }

    
    let user = await prisma.user.findUnique({
      where: { email: email }
    });


    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
        }
      });
    }


    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        reason,
        date: new Date(date),
        time,
        userId: user.id  
      },
    });

    return { success: true, appointment };
  } catch (error) {
    console.error('Failed to create appointment:', error);
    return { success: false, error: error.message };
  }
}

// Fetch all appointments from the database
export async function fetchAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true, 
      },
    });
    return { success: true, appointments };
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    return { success: false, error: error.message };
  }
}

// Update the status of an appointment
export async function updateAppointmentStatus(id, status) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: id },
      data: { status: status },
    });
    return { success: true, appointment };
  } catch (error) {
    console.error('Failed to update appointment status:', error);
    return { success: false, error: error.message };
  }
}
