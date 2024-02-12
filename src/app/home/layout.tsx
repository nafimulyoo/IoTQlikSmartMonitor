import { Toaster } from "@/components/ui/toaster"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <>
          {children}
          <Toaster/>        
      </>
  );
}
