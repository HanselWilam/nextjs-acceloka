"use client";

import { useEffect, useState } from "react";
import { getAvailableTickets } from "@/app/utils/api";
import Navbar from "@/app/components/Navbar";

export default function AvailableTickets() {
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  // **State untuk input sementara (belum dikirim ke API)**
  const [searchFilters, setSearchFilters] = useState({
    categoryName: "",
    ticketCode: "",
    ticketName: "",
    maxPrice: "",
    startDate: "",
    endDate: "",
    orderBy: "event_date",
    orderState: "asc",
  });

  // **State untuk query API (digunakan untuk request API)**
  const [queryFilters, setQueryFilters] = useState(searchFilters);

  useEffect(() => {
    fetchTickets();
  }, [currentPage, queryFilters]); // API hanya dipanggil jika currentPage atau queryFilters berubah

  const fetchTickets = async () => {
    try {
      const queryParams = {
        pageNumber: currentPage,
        pageSize: ticketsPerPage,
        categoryName: queryFilters.categoryName?.trim() || undefined,
        ticketCode: queryFilters.ticketCode?.trim() || undefined,
        ticketName: queryFilters.ticketName?.trim() || undefined,
        maxPrice: queryFilters.maxPrice ? Number(queryFilters.maxPrice) : undefined,
        startDate: queryFilters.startDate || undefined,
        endDate: queryFilters.endDate || undefined,
        orderBy: queryFilters.orderBy || "event_date",
        orderState: queryFilters.orderState || "asc",
      };

      console.log("Query Params:", queryParams); // ✅ Debugging
      const response = await getAvailableTickets(queryParams);
      console.log("API Response:", response);

      if (response && response.items) {
        setTickets(response.items);
        setTotalTickets(response.totalCount);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  // **🛠 Update Input Filter (Hanya di UI)**
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  // **🔍 Tombol Search: Update `queryFilters` baru untuk memicu API**
  const handleSearch = () => {
    setQueryFilters(searchFilters); // Sekarang API akan dipanggil karena queryFilters berubah
    setCurrentPage(1); // Reset ke halaman pertama setiap kali filter berubah
  };

  const totalPages = Math.ceil(totalTickets / ticketsPerPage);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Available Tickets</h1>
        <p className="mb-4">Total Tickets: {totalTickets}</p>

        {/* 🔎 Filter Input */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="ticketCode"
            placeholder="Search by Ticket Code"
            value={searchFilters.ticketCode}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="ticketName"
            placeholder="Search by Ticket Name"
            value={searchFilters.ticketName}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="categoryName"
            placeholder="Search by Category"
            value={searchFilters.categoryName}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={searchFilters.maxPrice}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <select
            name="orderBy"
            value={searchFilters.orderBy}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="event_date">Event Date</option>
            <option value="ticket_code">Ticket Code</option>
            <option value="ticket_name">Ticket Name</option>
            <option value="category_name">Category</option>
            <option value="price">Price</option>
            <option value="quota">Quota</option>
          </select>
          <select
            name="orderState"
            value={searchFilters.orderState}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* 🔍 Tombol Search */}
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Search
        </button>

        {/* 🎟️ Ticket List */}
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

        {/* 🔄 Pagination */}
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
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}