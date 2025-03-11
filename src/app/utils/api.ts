const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAvailableTickets = async (params: Record<string, any>) => {
  try {
    // **Hanya kirim parameter yang tidak undefined/null**
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
    );

    const queryString = new URLSearchParams(filteredParams).toString();
    console.log("Fetching URL:", `${API_BASE_URL}/get-available-ticket?${queryString}`); // Debugging

    const response = await fetch(`${API_BASE_URL}/get-available-ticket?${queryString}`);
    
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error(errorResponse.title || "Failed to fetch tickets");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return { tickets: [], totalTickets: 0 };
  }
};

export const bookTicket = async (ticketId: string | undefined, quantity: number | undefined) => {
  if (!ticketId || quantity === undefined || quantity <= 0) {
    throw new Error("Please select a valid ticket and quantity.");
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/book-ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ticketId, quantity }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error(errorResponse.detail || "Failed to book ticket");
    }

    return await response.json();
  } catch (error) {
    console.error("Error booking ticket:", error);
    throw error;
  }
};

export const getBookedTickets = async (bookedTicketId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-booked-ticket/${bookedTicketId}`);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error("Failed to fetch booked tickets");
    }

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

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error("Failed to revoke ticket");
    }

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

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error("Failed to update ticket");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating ticket:", error);
    return { message: "Failed to update ticket" };
  }
};
