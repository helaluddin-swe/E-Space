import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Space | A Ecommerce platform for selling products",
  description: "E-space a eommerce platform where sell multilple products which are most popular and premiup type products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {/* Use min-h-screen and flex-col to keep footer at the bottom properly */}
          <div className="flex flex-col min-h-screen  mx-auto max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-7xl">
            <Navbar />
            
            {/* grow ensures the content area takes up remaining space */}
            <main className="grow ">
              {children}
            </main>
            
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}