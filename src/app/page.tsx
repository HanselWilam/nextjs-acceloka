"use client";

import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Acceloka</h1>
        <p className="text-lg text-gray-700 mt-4">
          Your trusted ticket booking platform.
        </p>
      </main>
    </div>
  );
}