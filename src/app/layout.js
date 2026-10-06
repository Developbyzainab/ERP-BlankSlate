import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "../components/layout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ERP Dost",
  description: "ERP Dost Business Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}