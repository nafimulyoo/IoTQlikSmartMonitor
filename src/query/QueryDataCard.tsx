import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QueryDataModal from "./QueryDataModal";

const QueryDataCard = ({
  dashboardCards,
  cardNumber,
  openModal,
  session,
  deleteDashboardCard,
  setActiveTab,
}: any) => {
  const cardEntry = dashboardCards.find(
    (card: any) => card.card_id === cardNumber
  );

  const [queryData, setQueryData] = useState({});

  const fetchCardData = async () => {
    console.log("fetching card data..");
    const data = await fetch("/api/query", {
      method: "POST",
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "saved",
        session,
        query_input: {
          type: "structured_query",
          query_input: cardEntry.structured_query,
        },
      }),
    }).then((res) => res.json());
    setQueryData(data);
  };

  useEffect(() => {
    if (cardEntry) {
      if (Object.keys(queryData).length === 0) {
        fetchCardData();
      }
    }
  }, [dashboardCards, queryData]);

  const handleViewCard = async (queryData: any) => {
    openModal(
      {data: queryData,
      structured_query: cardEntry.structured_query}
    );
    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    modalElement?.showModal();
  };

  if (cardEntry) {
    return (
      <>
        <Card className="h-full shadow-2xl overflow-hidden">
          <CardHeader>
            <CardTitle>{JSON.stringify(cardEntry.query_name)}</CardTitle>
            <Button
              variant="outline"
              onClick={() => deleteDashboardCard(cardEntry.card_id)}
            >
              X
            </Button>
            <CardDescription>
              {JSON.stringify(cardEntry.structured_query)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <QueryDataModal queryData={queryData} /> */}

            <Button variant="outline" onClick={() => setQueryData({})}>
              Refresh
            </Button>
            <Button onClick={() => handleViewCard(queryData)}>View</Button>
          </CardContent>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <div class="dropdown border-gray-700 border-2 border-dotted w-full h-full grid card  rounded-box place-items-center border-opacity-50">
          <Button>
            <span className="text-xl font-bold mb-0.5">+</span> Add Data
          </Button>
          <div
            tabIndex={0}
            className="dropdown-content z-[2] card card-compact w-64 p-2 bg-base-100 shadow-md"
          >
            <div className="card-body">
              <Button onClick={() => setActiveTab("query")}>New Query</Button>
              <Button onClick={() => setActiveTab("history")}>
                Query History
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default QueryDataCard;
