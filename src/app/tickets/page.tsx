"use client";

import { useEffect, useState } from "react";
import { getAvailableTickets } from "@/app/utils/api";
import Navbar from "@/app/components/Navbar";

export default function AvailableTickets() {
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  useEffect(() => {
    fetchTickets();
  }, [currentPage]);

  const fetchTickets = async () => {
    try {
        const response = await getAvailableTickets(currentPage, ticketsPerPage);
        console.log("API Response:", response);

        if (response && response.tickets) {
            setTickets(response.tickets);
            setTotalTickets(response.totalTickets);
        }
    } catch (error) {
        console.error("Error fetching tickets:", error);
        if (error instanceof Error) {
            alert(`Error: ${error.message}`);
        }
    }
};

  const totalPages = Math.ceil(totalTickets / ticketsPerPage);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Available Tickets</h1>
        <p className="mb-4">Total Tickets: {totalTickets}</p>

        {tickets.length === 0 ? (
          <p>No available tickets found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {tickets.map((ticket: any) => (
              <div key={ticket.ticketCode} className="bg-white p-4 shadow rounded">
                <h2 className="text-lg font-bold">{ticket.ticketName}</h2>
                <p>Category: {ticket.categoryName}</p>
                <p>Price: Rp {new Intl.NumberFormat("id-ID").format(ticket.price)}</p>
                <p>Quota: {ticket.quota}</p>
                <p>Event Date: {new Date(ticket.eventDate).toLocaleDateString("id-ID")}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}