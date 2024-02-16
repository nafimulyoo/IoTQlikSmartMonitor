import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover"

const QueryDataCard = ({
  dashboardCards,
  cardNumber,
  openModal,
  session,
  deleteDashboardCard,
  setActiveTab
}: any) => {

  const cardEntry = dashboardCards.find((card: any) => card.card_id === cardNumber)  

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
    openModal(queryData);
    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    modalElement?.showModal();
  };

  if (cardEntry) {
    return (
      <>
        <Card className="h-full shadow-2xl overflow-hidden">
          <CardHeader>
            <CardTitle>{JSON.stringify(cardEntry.query_name)}</CardTitle>
            <Button variant="outline" onClick={() => deleteDashboardCard(cardEntry.card_id)}>X</Button>
            <CardDescription>
              {JSON.stringify(cardEntry.structured_query)}
            </CardDescription>
          </CardHeader>
          <CardContent>

            <p>{JSON.stringify(queryData)}</p>
            <Button variant="outline" onClick={() => setQueryData({})}>Refresh</Button>
            <Button onClick={() => handleViewCard(queryData)}>View</Button>
          </CardContent>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card className="h-full shadow-2xl">
          <CardHeader>
            <CardTitle>Add Query Data</CardTitle>
            <CardDescription>
              Add a query to this card to view the data
            </CardDescription>
          </CardHeader>
          <CardContent>
          <Popover>
              <PopoverTrigger>
                <Button  className="btn btn-primary bg-gray-700 border-0 hover:bg-gray-800 h-full">Add Query</Button>
              </PopoverTrigger>
              <PopoverContent >
                <PopoverClose >
                  <Button onClick={() => setActiveTab("query")}>New Query</Button>
                  <Button onClick={() => setActiveTab("history")}>Query History</Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>
    
          </CardContent>
        </Card>
      </>
    );
  }
};

export default QueryDataCard;
