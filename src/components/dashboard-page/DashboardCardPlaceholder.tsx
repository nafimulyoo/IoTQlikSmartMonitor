import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineRefresh } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QueryDataCard from "@/query/QueryDataCard";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const DashboardCardPlaceholder = ({
  dashboardCards,
  cardNumber,
  openModal,
  session,
  deleteDashboardCard,
  setActiveTab
}: any) => {
  const cardEntry = dashboardCards.find((card: any) => card.card_id === cardNumber);
  const [queryData, setQueryData] = useState({});

  const fetchCardData = async () => {
    console.log("fetching card data..");
    const data = await fetch("/api/query", {
      method: "POST",
      next: {
        revalidate: 3600
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "saved",
        session,
        query_input: {
          type: "structured_query",
          query_input: cardEntry.structured_query
        }
      })
    }).then(res => res.json());
    setQueryData(data);
  };

  useEffect(() => {
    if (cardEntry) {
      if (Object.keys(queryData).length === 0) {
        fetchCardData();
      }
      else if (queryData.query_name !== cardEntry.query_name) {
        setQueryData({})
      }
    }
  }, [dashboardCards, queryData]);



  const handleViewCard = async (queryData: any) => {
    openModal({
      data: queryData,
      structured_query: cardEntry.structured_query
    });
    const modalElement = (document.getElementById("modal") as HTMLDialogElement);
    modalElement?.showModal();
  };

  if (cardEntry) {
    return <>
        <Card className="h-full shadow-2xl overflow-hidden">
          <CardHeader>
            <CardTitle>{cardEntry.query_name}</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent>
          {
            Object.keys(queryData).length === 0
              ? <div className="flex justify-center items-center h-48">
                  <span className="loading loading-dots loading-md"></span>
                </div>
              : <QueryDataCard data={queryData} className="w-full" />

          }
          <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="absolute top-4 right-4 bg-white text-black hover:text-black rounded-full hover:bg-gray-200" onClick={() => deleteDashboardCard(cardEntry.card_id)}>
              <X size={16} />
              </Button>
              </TooltipTrigger>
        <TooltipContent>
          <p>Delete card</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>

            <Button variant="outline" onClick={() => setQueryData({})} className="absolute bottom-16 mb-2 right-4 w-12 h-12 p-0">
              <MdOutlineRefresh size={16} />
            </Button>
            </TooltipTrigger>
        <TooltipContent>
          <p>Refresh</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            <Button onClick={() => handleViewCard(queryData)} className="absolute bottom-4 right-4 w-12 h-12 p-0">
              <IoMdEye size={16} />
            </Button>
            </TooltipTrigger>
        <TooltipContent>
          <p>View data</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

          </CardContent>
        </Card>
      </>;
  } else {
    return <>
        <div className="dropdown border-gray-700 border-2 border-dotted w-full h-full grid card rounded-box place-items-center border-opacity-50">
          <Button>
            <span className="text-xl font-bold mb-0.5">+</span> Add Data
          </Button>
          <div tabIndex={0} className="dropdown-content z-[2] card card-compact w-64 p-2 bg-base-100 shadow-md">
            <div className="card-body">
              <Button onClick={() => setActiveTab("query")}>New Query</Button>
              <Button onClick={() => setActiveTab("history")}>
                Query History
              </Button>
            </div>
          </div>
        </div>
      </>;
  }
};

export default DashboardCardPlaceholder;