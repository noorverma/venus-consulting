//I wrote the code myself but I used perlexity AI for reference

"use server";

import { loginUser, logOutUser, registerUser, sendPasswordResetEmail } from '@/app/Lib/authUtilities'; // Make sure to import the new function

export async function Login({ email, password }) {
    try {
        if (!email || !password) {
            return { error: "Email and password are required." };
        }

        const { user, role } = await loginUser(email, password);

        return { success: true, role };
    } catch (error) {
        console.error("Login Error:", error.message);
        return { error: error.message || "Login failed. Wrong email or password" };
    }
}

export async function Register({ username, email, password, isAdmin = false }) {
    try {
        if (!username || !email || !password) {
            return { error: "Username, email, and password are required." };
        }

        await registerUser(username, email, password, isAdmin);

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


export async function RequestPasswordReset({ email }) {
    try {
        if (!email) {
            return { error: "Email is required." };
        }

        await sendPasswordResetEmail(email); 
        return { success: true };
    } catch (error) {
        console.error("Password Reset Error:", error.message);
        return { error: error.message || "Failed to send password reset email." };
    }
}
