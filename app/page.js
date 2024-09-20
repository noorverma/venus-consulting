"use client";
import { auth } from "./Lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";
/* Page.js doesn't contain any code because when you open the website,
it redirects to the page in sign-in folder. */
export default function Page() {
  return (
    <div>
      {/* <div className="bg-[url('/login-background.jpeg')] bg-cover bg-center min-h-screen flex items-center justify-center"> */}
        <div>
          <img
            src="/logo.png"
            alt="Logo"
            className="h-14 absolute top-5 left-5"
          />
          <img
            src="/name.png"
            alt="Electrical Consulting"
            className="h-8 absolute top-9 left-20"
          />
            {/* <Link
              className="absolute top-4 right-20 font-bold p-3 bg-gray-900 rounded-xl text-center transition-all duration-150 text-orange-500 hover:bg-slate-700"
              href={"/sign-in"}
            >
              Sign-In
            </Link> */}
        </div>
        <div className="relative m-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Your Vision
              <strong className="block font-extrabold text-gray-900">
                Wired to Perfection
              </strong>
            </h1>
 
            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Delivering Advanced Electrical Engineering Solutions to Power your Success.
            </p>
 
            <div className="mt-8 ml-16 flex flex-wrap gap-4 text-center">
              <Link
                href="/SignIn"
                className="block w-full rounded bg-gray-900 px-12 py-3 text-lg font-medium text-orange-500 shadow-lg hover:bg-orange-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </Link>
 
              <Link
                href="/learnmore"
                className="block w-full rounded bg-white px-12 py-3 text-lg font-medium text-orange-500 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}