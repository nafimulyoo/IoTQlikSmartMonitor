import Background from "@/components/Background";
import Footer from "@/components/Footer";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Background/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
