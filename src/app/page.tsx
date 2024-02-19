"use client";

import React, { createContext, useState, useEffect } from "react";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import { getSession, logout } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

export const SessionContext = createContext(null);

export default  function Page() {
  const [session, setSession] = useState(null);
  const { toast } = useToast();

  const handleLogout = () => {
    const status = logout();
    setSession(status);
    toast({
      title: `Logout successful`,
      description: "You have successfully logged out",

    });
  }

  useEffect(() => {
      const sessionData = getSession();
      setSession(sessionData);
  }, []);


return (
  session === "unauthorized" ? 
    <LoginPage setSession={ setSession } /> :
    session ? (
      <SessionContext.Provider value={session}>
        <HomePage logout={handleLogout} />
      </SessionContext.Provider>
    ) : (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
);
}
