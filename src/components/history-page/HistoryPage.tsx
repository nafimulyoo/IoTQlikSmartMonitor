"use client";
import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";
  
const HistoryPage = ({ history, setModalData, session }: any) => {

  const handleAddToDashboard = async (history_id: any) => {
    
  }

  const handleViewHistory = async (structured_query: any, session: any) => {
    const newModalData = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        method : "saved",
        session,
        query_input:
        {
          type: "structured_query",
          query_input: structured_query
        }
      }),
    }).then((res) => res.json());

    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    setModalData(newModalData);
    modalElement?.showModal();
  };

  return (
    <div>
      <h1>History</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Query Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((history: any) => (
            <tr key={history.id}>
              <td>{history.created_at}</td>
              <td>{history.query_name}</td>
              <td>
                <button
                  onClick={() => {
                    handleViewHistory(history.structured_query, session);
                  }}
                >
                  View
                </button>
              </td>
              <td>
                <button>Add to Dashboard</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
