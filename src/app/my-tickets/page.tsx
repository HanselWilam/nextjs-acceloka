"use client";

import { useEffect, useState } from "react";
import { getBookedTickets, revokeTicket, editBookedTicket } from "@/app/utils/api";
import Navbar from "@/app/components/Navbar";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [revokeQuantities, setRevokeQuantities] = useState<{ [key: string]: number }>({});
  const [editQuantities, setEditQuantities] = useState<{ [key: string]: number }>({});
  const bookedTicketId = 1;

  useEffect(() => {
    fetchBookedTickets();
  }, []);

  const fetchBookedTickets = async () => {
    try {
      const data = await getBookedTickets(bookedTicketId);
      setTickets(data);

      const defaultQuantities: { [key: string]: number } = {};
      data.forEach((category: any) => {
        category.tickets.forEach((ticket: any) => {
          defaultQuantities[ticket.ticketCode] = ticket.quantity;
        });
      });
      setRevokeQuantities({});
      setEditQuantities(defaultQuantities);
    } catch (error) {
      console.error("Error fetching booked tickets:", error);
    }
  };

  const handleRevoke = async (ticketCode: string) => {
    const qty = revokeQuantities[ticketCode];
    if (!qty || qty < 1) return alert("Masukkan jumlah yang valid untuk revoke!");
    
    try {
      await revokeTicket(bookedTicketId, ticketCode, qty);
      fetchBookedTickets();
    } catch (error) {
      console.error("Error revoking ticket:", error);
    }
  };

  const handleEdit = async (ticketCode: string) => {
    const newQuantity = editQuantities[ticketCode];
    if (!newQuantity || newQuantity < 1) return alert("Masukkan jumlah yang valid untuk edit!");

    try {
      await editBookedTicket(bookedTicketId, [{ TicketCode: ticketCode, Quantity: newQuantity }]);
      fetchBookedTickets();
    } catch (error) {
      console.error("Error editing ticket:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Tickets</h1>

        {tickets.length === 0 ? (
          <p>No booked tickets found.</p>
        ) : (
          <div className="space-y-6">
            {tickets.map((category: any) => (
              <div key={category.categoryName} className="bg-gray-100 p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{category.categoryName}</h2>

                <ul className="mt-2 space-y-2">
                  {category.tickets.map((ticket: any) => (
                    <li key={ticket.ticketCode} className="bg-white p-4 shadow rounded flex justify-between">
                      <div>
                        <p><strong>{ticket.ticketName}</strong></p>
                        <p>Event Date: {new Date(ticket.eventDate).toLocaleString("id-ID", { 
                          day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
                        })}</p>
                        <p>Price: Rp {new Intl.NumberFormat("id-ID").format(ticket.price)}</p>
                        <p>Current Quantity: {ticket.quantity}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {/* Input untuk Revoke */}
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            max={ticket.quantity}
                            placeholder="Qty"
                            value={revokeQuantities[ticket.ticketCode] || ""}
                            onChange={(e) => setRevokeQuantities({ 
                              ...revokeQuantities, [ticket.ticketCode]: Number(e.target.value) 
                            })}
                            className="border p-1 rounded w-16"
                          />
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => handleRevoke(ticket.ticketCode)}
                          >
                            Revoke
                          </button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            placeholder="New Qty"
                            value={editQuantities[ticket.ticketCode] || ""}
                            onChange={(e) => setEditQuantities({ 
                              ...editQuantities, [ticket.ticketCode]: Number(e.target.value) 
                            })}
                            className="border p-1 rounded w-16"
                          />
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => handleEdit(ticket.ticketCode)}
                          >
                            Edit Quantity
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}