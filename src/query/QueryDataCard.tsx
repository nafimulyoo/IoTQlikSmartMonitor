"use client";

import { useState, useEffect } from "react";

const QueryDataCard = ({ cardEntry, setModalData, session }: any) => {

  const [queryData, setQueryData] = useState({});

  const fetchCardData = async () => {
    const data =  await fetch("/api/query", {
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
          query_input: cardEntry.structured_query
        }
      }),
    }).then((res) => res.json());
    setQueryData(data);
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleViewCard = async (queryData: any) => {
    setModalData(queryData);
    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    modalElement?.showModal();
  };

  return (
    <div>
      <p>----------------------</p>
      <h1 className="font-bold">{ JSON.stringify(cardEntry.query_name) }</h1>
      <p>Structured Query:</p>
      <p>{ JSON.stringify(cardEntry.structured_query) }</p>
      <p>Results:</p>
      <p>{ JSON.stringify(queryData) }</p>
      <button onClick={() => handleViewCard(queryData)}>
        View
      </button>
      <p>----------------------</p>
    </div>
  );
};

export default QueryDataCard;
