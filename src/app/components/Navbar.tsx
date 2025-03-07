"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold hover:text-gray-400">
            Acceloka
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-400">Home</Link>
            <Link href="/tickets" className="hover:text-gray-400">Tickets</Link>
            <Link href="/booking" className="hover:text-gray-400">Booking</Link>
            <Link href="/my-tickets" className="hover:text-gray-400">My Tickets</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-2xl focus:outline-none transition-all duration-300"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden bg-gray-800 text-white space-y-2 py-2 transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
          <Link href="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
          <Link href="/tickets" className="block px-4 py-2 hover:bg-gray-700">Tickets</Link>
          <Link href="/booking" className="block px-4 py-2 hover:bg-gray-700">Booking</Link>
          <Link href="/my-tickets" className="block px-4 py-2 hover:bg-gray-700">My Tickets</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;