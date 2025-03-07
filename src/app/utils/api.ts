const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAvailableTickets = async (pageNumber: number = 1, pageSize: number = 10) => {
  try {
      const response = await fetch(
          `${API_BASE_URL}/get-available-ticket?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      if (!response.ok) {
          throw new Error("Failed to fetch tickets");
      }
      return await response.json();
  } catch (error) {
      console.error("Error fetching tickets:", error);
      return { tickets: [], totalTickets: 0 };
  }
};

export const bookTicket = async (ticketId: string, quantity: number) => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/v1/book-ticket", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ticketId, quantity }),
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to book ticket");
  }

  return await response.json();
};


export const getBookedTickets = async (bookedTicketId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-booked-ticket/${bookedTicketId}`);
    if (!response.ok) throw new Error("Failed to fetch booked tickets");
    return await response.json();
  } catch (error) {
    console.error("Error fetching booked tickets:", error);
    return [];
  }
};

export const revokeTicket = async (bookedTicketId: number, kodeTicket: string, qty: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/revoke-ticket/${bookedTicketId}/${kodeTicket}/${qty}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to revoke ticket");
    return await response.json();
  } catch (error) {
    console.error("Error revoking ticket:", error);
    return { message: "Failed to revoke ticket" };
  }
};

export const editBookedTicket = async (bookedTicketId: number, updatedData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/edit-booked-ticket/${bookedTicketId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update ticket");
    return await response.json();
  } catch (error) {
    console.error("Error updating ticket:", error);
    return { message: "Failed to update ticket" };
  }
};