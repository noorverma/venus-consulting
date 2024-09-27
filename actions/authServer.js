//I wrote the code myself but I used perlexity AI for reference

"use server";

import { loginUser, logOutUser, registerUser } from '@/app/Lib/authUtilities';

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
