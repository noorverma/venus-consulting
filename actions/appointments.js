'use server'

import prisma from "@/app/Lib/prisma"

export async function createAppointment(data) {
  try {
    const { name, email, phone, reason, date, time, userId } = data;

    if (!name || !email || !phone || !reason || !date || !time) {
      throw new Error('All fields are required');
    }

    // First, check if a user with this email exists
    let user = await prisma.user.findUnique({
      where: { email: email }
    });

    // If no user exists, create one
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
        }
      });
    }

    // Now create the appointment with the user's ID
    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        reason,
        date: new Date(date),
        time,
        userId: user.id  // Link the appointment to the user
      },
    });

    return { success: true, appointment };
  } catch (error) {
    console.error('Failed to create appointment:', error);
    return { success: false, error: error.message };
  }
}
