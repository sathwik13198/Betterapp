import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../lib/i18n";
import Chatbot from "../components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Better Mortgage",
  description: "Better Mortgage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          {children}
          <Chatbot />
        </I18nProvider>
      </body>
    </html>
  );
}
