"use client";

import DashboardPage from "@/components/dashboard-page/DashboardPage";
import HistoryPage from "@/components/history-page/HistoryPage";
import QueryPage from "@/components/query-page/QueryPage";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/initSupabase";
import QueryModalData from "@/query/QueryDataModal";
import { getSession } from "@/lib/auth";

const HomePage = () => {
  var session;

  if (typeof window !== "undefined") {
    session = getSession();
    if (!session) {
      window.location.href = "/login";
    }
  }

  const [history, setHistory]: any = useState([]);
  const [dashboardCards, setDashboardCards] = useState([]);
  const [modalData, setModalData] = useState({});

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Component did mount
    setIsClient(true);
  }, []);

  const fetchHistory = async () => {
    const { data, error }: any = await supabase
      .from("Query History")
      .select("*");
    if (error) console.log("error", error);
    else setHistory(data);
  };

  const fetchDashboardCards = async () => {
    const { data, error }: any = await supabase
      .from("Dashboard Card")
      .select("*");

    if (error) console.log("error", error);
    else setDashboardCards(data);
  };

  useEffect(() => {
    fetchHistory();
    fetchDashboardCards();
  }, []);

  if (session && isClient) {
    return (
      <>
        {/* Modal for Viewing Query Data */}
        <dialog id="modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="modal-action">
              <QueryModalData modalData={modalData} />
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* Tab Control */}
        <div role="tablist" className="tabs tabs-bordered">
          <input
            type="radio"
            name="mainTab"
            role="tab"
            className="tab"
            aria-label="Dashboard"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-10">
            <DashboardPage
              dashboardCards={dashboardCards}
              setModalData={setModalData}
              session={session}
            />
          </div>

          <input
            type="radio"
            name="mainTab"
            role="tab"
            className="tab"
            aria-label="Query"
          />
          <div role="tabpanel" className="tab-content p-10">
            <QueryPage
              fetchHistory={fetchHistory}
              setModalData={setModalData}
              session={session}
            />
          </div>

          <input
            type="radio"
            name="mainTab"
            role="tab"
            className="tab"
            aria-label="History"
          />
          <div role="tabpanel" className="tab-content p-10">
            <HistoryPage
              history={history}
              setModalData={setModalData}
              session={session}
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
