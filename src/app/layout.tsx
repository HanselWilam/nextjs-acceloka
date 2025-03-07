import "@/app/styles/globals.css";

export const metadata = {
  title: "Acceloka",
  description: "Ticket Booking System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          © 2025 Acceloka
        </footer>
      </body>
    </html>
  );
}