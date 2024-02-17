import React, { useState } from "react";
import SelectionInput from "./SelectionInput";
import TextInput from "./TextInput";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface JSX {
  IntrinsicElements: {
    input: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >;
  };
}

const QueryPage = ({ fetchHistory, openModal, session }: any) => {
  const [inputQuery, setInputQuery] = useState({});
  const [latestDevice, setLatestDevice] = useState(true);
  // send query to server, get response
    const handleCheckboxChange = () => {
    setLatestDevice(!latestDevice); // Toggle the value of isChecked
    console.log(latestDevice);
  };

  const handleQuery = async (inputQuery: any) => {
    const data = await fetch("/api/query", {
      method: "POST",
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "new",
        update: latestDevice,
        session,
        query_input: inputQuery,
      }),
    }).then((res) => res.json());

    openModal(data);
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
          <div className="form-control mt-8">
      <label className="label cursor-pointer">
        
        <input 
          type="checkbox" 
          checked={latestDevice} 
          onChange={handleCheckboxChange} // Bind onChange event to handleCheckboxChange function
          className="checkbox mb-2" 
        />
        <span className="label-text mx-4">Update device data</span> 
      </label>
    </div>
          <div className="flex items-center space-x-2">

          </div>
          <div className="">

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
            <TabsContent value="select" className="flex flex-col items-center">
              <SelectionInput
                setInputQuery={setInputQuery}
                inputQuery={inputQuery}
              >
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleQuery(inputQuery)}
                >
                  Query
                </Button>
              </SelectionInput>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default QueryPage;
