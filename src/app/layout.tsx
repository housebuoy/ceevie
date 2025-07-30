import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Merriweather, Roboto, Montserrat, Lato, Open_Sans } from "next/font/google";
import "./globals.css";
import ToasterClient from '@/app/components/ui/ToasterClient';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", weight: ["400", "700"],});
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["400", "700"], });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

export const metadata: Metadata = {
  title: "Ceevie",
  description: "Resume builder dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} 
                    ${geistMono.variable}
                    ${inter.variable}
                    ${merriweather.variable}
                    ${roboto.variable}
                    ${montserrat.variable}
                    ${lato.variable}
                    ${openSans.variable} 
                    antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToasterClient />
      </body>
    </html>
  );
}
