import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "Innobotix – AI Robotics Studio",
  description: "The AI robotics studio for students. BOM, circuit, code, and simulation — from a single prompt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex min-h-screen flex-col bg-app-bg text-text-primary antialiased`}>
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
