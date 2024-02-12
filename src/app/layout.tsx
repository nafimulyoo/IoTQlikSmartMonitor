import Background from "@/components/Background";
import Footer from "@/components/Footer";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased -z-10",
          fontSans.variable
        )}
      >
        <div className="-z-10">
        <Background />
        </div>
        <div className="z-10">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
