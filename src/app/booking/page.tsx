"use client";

import { useState } from "react";
import { bookTicket } from "@/app/utils/api";
import Navbar from "@/app/components/Navbar";

export default function Booking() {
  const [ticketId, setTicketId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    try {
      const response = await bookTicket(ticketId, quantity);
      setMessage(response.message || "Booking successful!");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Book a Ticket</h1>
        <input 
          type="text" 
          placeholder="Ticket Code" 
          value={ticketId} 
          onChange={(e) => setTicketId(e.target.value)} 
          className="border p-2 mr-2" 
        />
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border p-2 w-20 mr-2"
        />
        <button 
          onClick={handleBooking} 
          className="bg-blue-600 text-white p-2"
        >
          Book
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </main>
    </div>
  );
}
