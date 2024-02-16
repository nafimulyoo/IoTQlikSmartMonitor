"use client"

import React, { createContext, useState, useEffect } from 'react';
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import { getSession } from "@/lib/auth";

export const SessionContext = createContext(null);

export default function Page() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Attempt to fetch the session on component mount
    const sessionData = getSession();
    setSession(sessionData);
  }, []);

  if (session) {
    return (
      <SessionContext.Provider value={session}>
        <HomePage />
      </SessionContext.Provider>
    );
  } else {
    return <LoginPage />;
  }
}
