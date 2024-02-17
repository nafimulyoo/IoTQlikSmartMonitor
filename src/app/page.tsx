"use client";

import React, { createContext, useState, useEffect } from "react";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import { getSession } from "@/lib/auth";

export const SessionContext = createContext(null);

export default function Page() {
  const [session, setSession] = useState(null);

  const logout = async () => {
    setSession("unauthorized");
  }

  useEffect(() => {
      const sessionData = getSession();
      setSession(sessionData);
  }, []);


return (
  session === "unauthorized" ? 
    <LoginPage /> :
    session ? (
      <SessionContext.Provider value={session}>
        <HomePage logout={logout} />
      </SessionContext.Provider>
    ) : (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
);
}
