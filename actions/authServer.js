"use server";

import { loginUser, logOutUser, registerUser } from '@/app/Lib/authUtilities';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function Login({ email, password }) {
    try {
        if (!email || !password) {
            return { error: "Email and password are required." };
        }

        // Attempt to login the user
        await loginUser(email, password);

        // After successful login, return a success message
        return { success: true };
    } catch (error) {
        console.error("Login Error:", error.message);
        return { error: error.message || "Login failed. Please check your credentials and try again." };
    }
}

export async function Register({ username, email, password }) {
    try {
        if (!username || !email || !password) {
            return { error: "Username, email, and password are required." };
        }

        await registerUser(username, email, password);

        // After successful registration, return a success message
        return { success: true };
    } catch (error) {
        console.error("Registration Error:", error.message);
        return { error: error.message || "Registration failed. Please try again." };
    }
}

export async function Logout() {
    try {
        await logOutUser();
        return { success: true };
    } catch (error) {
        console.error("Logout Error:", error.message);
        return { error: error.message || "Logout failed. Please try again." };
    }
}