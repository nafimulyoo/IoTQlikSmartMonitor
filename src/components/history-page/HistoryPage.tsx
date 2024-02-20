"use client";
import { supabase } from "@/lib/initSupabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";


const HistoryPage = ({
  history,
  openModal,
  fetchDashboardCards,
  session,
}: any) => {
  const { toast } = useToast();
  const handleAddToDashboard = async (history: any, card_id: number) => {
    const { data, error }: any = await supabase.from("Dashboard Card").upsert({
      username: session.username,
      card_id: card_id,
      created_at: new Date(),
      query_name: history.query_name,
      structured_query: history.structured_query,
    });
    toast({
      title: `${history.query_name} added to dashboard`,
      description: "You can now view this query on your dashboard",
    });
    fetchDashboardCards();
  };

  const handleViewHistory = async (structured_query: any, session: any) => {
    const newModalData = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "saved",
        session,
        query_input: {
          type: "structured_query",
          query_input: structured_query,
        },
      }),
    }).then((res) => res.json());

    
    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    openModal(
      {data: newModalData,
      structured_query: structured_query}
    );
    modalElement?.showModal();
  };

  return (
    <>
      <div className="flex flex-col justify-end items-center h-screen z-20">
        <div className="text-center flex-grow flex flex-col items-center justify-center mt-16 mb-32">
          <h1 className="text-4xl font-bold mb-8">Query History</h1>
          <div className="overflow-x-hidden overflow-y-scroll flex-grow mt-8 h-8">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-gray-900">Time</th>
                  <th className="text-gray-900">Query Name</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {history.map((history: any) => (
                  <tr key={history.id}>
                    <td>{new Date(history.created_at).toLocaleString()}</td>
                    <td>{history.query_name}</td>
                    <td className="pl-20 pr-2 mr-2">
                      <div className="dropdown">
                        <Button variant="outline" className="h-full">
                          Add to Dashboard
                        </Button>
                        <div
                          tabIndex={1}
                          className="dropdown-content z-[2] card card-compact w-52 p-2 bg-base-100 shadow-md"
                        >
                          <div className="card-body flex flex-col w-48">
                            <div className="flex flex-row w-full justify-evenly">
                              <Button
                              variant="outline"
                                onClick={() => handleAddToDashboard(history, 1)}
                                 className="w-1/2 mr-2 h-full"
                              >
                                1
                              </Button>
                              <Button
                              variant="outline"
                                onClick={() => handleAddToDashboard(history, 2)}
                                 className="w-1/2 h-full"
                              >
                                2
                              </Button>
                            </div>
                            <div className="flex flex-row justify-evenly items-center">
                              <Button
                              variant="outline"
                                onClick={() => handleAddToDashboard(history, 3)}
                                 className="w-1/2 mr-2 h-full"
                              >
                                3
                              </Button>
                              <Button
                              variant="outline"
                                onClick={() => handleAddToDashboard(history, 4)}
                                 className="w-1/2 h-full"
                              >
                                4
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="ml-0 pl-0">
                      <Button
                        onClick={() => {
                          handleViewHistory(history.structured_query, session);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
