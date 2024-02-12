"use client";

import DashboardPage from "@/components/dashboard-page/DashboardPage";
import HistoryPage from "@/components/history-page/HistoryPage";
import QueryPage from "@/components/query-page/QueryPage";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/initSupabase";
import QueryModalData from "@/query/QueryDataModal";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const HomePage = () => {
  var session : any;

  if (typeof window !== "undefined") {
    session = getSession();
    if (!session) {
      window.location.href = "/login";
      return
    }
  }
  

  const { toast } = useToast(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [history, setHistory]: any = useState([]);
  const [dashboardCards, setDashboardCards] = useState([]);
  const [modalData, setModalData] = useState({});
  const [isClient, setIsClient] = useState(false);

  const openModal = (modalData: any) => {
    setModalData(modalData);
    setModalVisible(true);
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (event: any) => {
    console.log("tab change", event.target);
    setActiveTab(event.target.value);
  };

  const fetchHistory = async () => {
    console.log("fetching history");
    const { data, error }: any = await supabase
      .from("Query History")
      .select("*");
    if (error) console.log("error", error);
    else setHistory(data);
  };

  const fetchDashboardCards = async () => {
    const { data, error }: any = await supabase
    // filter for
      .from("Dashboard Card")
      .select("*")
      .eq("username", session.username);

    if (error) console.log("error", error);
    else setDashboardCards(data);
  };

  const deleteDashboardCard = async (id: number) => {
    console.log("deleting card", id);
    const { error }: any = await supabase
      .from("Dashboard Card")
      .delete()
      .eq("username", session.username)
      .eq("card_id", id);
    toast({
      variant: "destructive",
      title: `Card removed to dashboard`,
    })
    if (error) console.log("error", error);
    else fetchDashboardCards();
    }


  useEffect(() => {
    fetchHistory();
    fetchDashboardCards();
  }, []);

  if (session && isClient) {
    return (
      <>
        {/* Modal for Viewing Query Data */}
        <Dialog open={modalVisible} onOpenChange={setModalVisible}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Query Data</DialogTitle>
              <DialogDescription>
                Data returned from the querys
              </DialogDescription>
            </DialogHeader>
            <QueryModalData modalData={modalData} />
            <DialogClose asChild>
                <Button>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/* Tab Content */}
        <div role="tablist" className="tabs tabs-bordered">
          <input type="radio" name="main_tab" role="tab" className="tab" aria-label="Dashboard"
          value="dashboard"
                        checked={activeTab === 'dashboard'}
                        onChange={handleTabChange}
          />
          <div role="tabpanel" className="tab-content p-10">
            <DashboardPage
              dashboardCards={dashboardCards}
              deleteDashboardCard={deleteDashboardCard}
              openModal={openModal}
              session={session}
              setActiveTab={setActiveTab}
            />
          </div>

          <input type="radio" name="main_tab" role="tab" className="tab" aria-label="Query" 
          checked={activeTab === 'query'}
          onChange={handleTabChange}
          value = "query"
          />
          <div role="tabpanel" className="tab-content p-10">
            <QueryPage
              fetchHistory={fetchHistory}
              openModal={openModal}
              session={session}
            />
          </div>

          <input type="radio" name="main_tab" role="tab" className="tab" aria-label="History" 
           checked={activeTab === 'history'}
           onChange={handleTabChange}
           value="history"
           />
          <div role="tabpanel" className="tab-content p-10">
            <HistoryPage
              history={history}
              openModal={openModal}
              session={session}
              fetchDashboardCards={fetchDashboardCards}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default HomePage;
