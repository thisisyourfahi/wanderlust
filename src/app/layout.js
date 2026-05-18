import { Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
})

export const metadata = {
  title: "Wanderlust - Explore the World with Us",
  description:
    "Discover your next adventure with Wanderlust. Explore breathtaking destinations, book unforgettable experiences, and create memories that last a lifetime. Your journey starts here.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${merriweather.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="container mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
