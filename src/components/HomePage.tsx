"use client";

import DashboardPage from "@/components/dashboard-page/DashboardPage";
import HistoryPage from "@/components/history-page/HistoryPage";
import QueryPage from "@/components/query-page/QueryPage";
import { useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/initSupabase";
import QueryModalData from "@/query/QueryDataModal";
import { SessionContext } from "@/app/page";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HomePage = ({ logout }: any) => {
  const { toast } = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [history, setHistory]: any = useState([]);
  const [dashboardCards, setDashboardCards] = useState([]);
  const [modalData, setModalData] = useState({});
  const session = useContext(SessionContext);

  console.log(session);
  const openModal = (modalData: any) => {
    setModalData(modalData);
    setModalVisible(true);
    console.log("modalData", modalData);
  };
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (event: any) => {
    console.log("tab change", event.target);
    setActiveTab(event.target.value);
  };

  const fetchHistory = async () => {
    console.log("fetching history");
    const { data, error }: any = await supabase
      .from("Query History")
      .select("*")
      .eq("username", session.username);
    if (error) console.log("error", error);
    else setHistory(data);
  };

  const fetchDashboardCards = async () => {
    const { data, error }: any = await supabase

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
    });
    if (error) console.log("error", error);
    else fetchDashboardCards();
  };

  useEffect(() => {
    if (session) {
      fetchHistory();
      fetchDashboardCards();
    }
  }, [session]);

  const hiddenStyle = { display: "none" };

  const dashboardStyle = activeTab === "dashboard" ? {} : hiddenStyle;
  const queryStyle = activeTab === "query" ? {} : hiddenStyle;
  const historyStyle = activeTab === "history" ? {} : hiddenStyle;

  if (session) {
    return (
      <>
        <div className="z-10 absolute navbar shadow-none ">
          <div className="navbar-start">
            <p className="text-xl font-semibold ml-4 ">IOTkliq Smart Monitor</p>
          </div>
          <div className="navbar-center">
            <div role="tablist" className="tabs tabs-bordered">
              <input
                type="radio"
                name="main_tab"
                role="tab"
                className="tab"
                aria-label="Dashboard"
                value="dashboard"
                checked={activeTab === "dashboard"}
                onChange={handleTabChange}
              />
              <input
                type="radio"
                name="main_tab"
                role="tab"
                className="tab mx-6"
                aria-label="Query"
                checked={activeTab === "query"}
                onChange={handleTabChange}
                value="query"
              />
              <input
                type="radio"
                name="main_tab"
                role="tab"
                className="tab"
                aria-label="History"
                checked={activeTab === "history"}
                onChange={handleTabChange}
                value="history"
              />
            </div>
          </div>
          <div className="navbar-end">
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Modal for Viewing Query Data */}
        <Dialog open={modalVisible} onOpenChange={() => setModalVisible}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Query Data</DialogTitle>
              <DialogDescription>
                Data returned from the querys
              </DialogDescription>
            </DialogHeader>
            <QueryModalData modalData={modalData} />
            <DialogClose asChild>
              <Button onClick={() => setModalVisible(false)}>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/* Tab Content */}

        <div className="p-10" style={dashboardStyle}>
          <DashboardPage
            dashboardCards={dashboardCards}
            deleteDashboardCard={deleteDashboardCard}
            openModal={openModal}
            session={session}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="pt-10" style={queryStyle}>
          <QueryPage
            fetchHistory={fetchHistory}
            openModal={openModal}
            session={session}
          />
        </div>

        <div className="pt-10" style={historyStyle}>
          <HistoryPage
            history={history}
            openModal={openModal}
            session={session}
            fetchDashboardCards={fetchDashboardCards}
          />
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
