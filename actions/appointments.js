'use server'

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
