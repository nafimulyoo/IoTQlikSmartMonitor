import React, { useState } from "react";
import SelectionInput from "./SelectionInput";
import TextInput from "./TextInput";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QueryPage = ({ fetchHistory, openModal, session }: any) => {
  const [inputQuery, setInputQuery] = useState({});
  const [latestDevice, setLatestDevice] = useState(true);
  // send query to server, get response
  const handleCheckboxChange = () => {
    setLatestDevice(!latestDevice); // Toggle the value of isChecked
  };

  const handleQuery = async (inputQuery: any) => {
    const output_data = await fetch("/api/query", {
      method: "POST",
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "new",
        updateDevice: latestDevice,
        session,
        query_input: inputQuery,
      }),
    }).then((res) => res.json());

    openModal(
      {data: output_data,
        structured_query: null}
    );
    fetchHistory();
    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    modalElement?.showModal();
  };

  return (
    <>
      <div className="flex flex-col items-center z-20">
        <div className="text-center flex-grow flex items-center justify-center mt-48">
          <h1 className="text-7xl font-bold">
            Start querying your <br></br> IoT data
          </h1>
        </div>
        <Tabs defaultValue="text">
          <div className="w-full flex flex-col items-center mt-16">
            <TabsList className="h-12 w-32 bg-800 shadow-md">
              <TabsTrigger className="" value="text">
                Text
              </TabsTrigger>
              <TabsTrigger value="select">Select</TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-4">
          <div className="form-control flex flex-row items-center justify-center">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      checked={latestDevice}
                      onChange={handleCheckboxChange}
                      className="checkbox"
                    />
                    <span className="label-text ml-2">Update device data</span>
                  </label>
                </div>
            <TabsContent value="text">
              <TextInput setInputQuery={setInputQuery} inputQuery={inputQuery}>

                <Button
                  className="mt-4 w-full"
                  onClick={() => handleQuery(inputQuery)}
                >
                  Query
                </Button>
              </TextInput>
            </TabsContent>
            <TabsContent value="select">

                <div className="flex flex-col items-center">
                  
              <SelectionInput
                setInputQuery={setInputQuery}
                inputQuery={inputQuery}
                session={session}
                >
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleQuery(inputQuery)}
                  >
                  Query
                </Button>
              </SelectionInput>
                  </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default QueryPage;
