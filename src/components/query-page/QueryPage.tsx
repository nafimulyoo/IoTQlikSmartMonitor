import React, { useState } from "react";
import SelectionInput from "./SelectionInput";
import TextInput from "./TextInput";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  // send query to server, get response

  const handleQuery = async (inputQuery: any) => {
    const data = await fetch("/api/query", {
      method: "POST",
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "new",
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
            <TabsList className="w-40 bg-white shadow-xl">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="select">Select</TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-20">
          
          <TabsContent value="text">
            <TextInput setInputQuery={setInputQuery} inputQuery={inputQuery} >
            <Button className="mt-4 w-full" onClick={() => handleQuery(inputQuery)}>Query</Button>
            </TextInput>
          </TabsContent>
          <TabsContent value="select">
            <SelectionInput
              setInputQuery={setInputQuery}
              inputQuery={inputQuery}
            >
              <Button className="mt-4 w-full" onClick={() => handleQuery(inputQuery)}>Query</Button>
              </SelectionInput>
          </TabsContent>
          </div>
        </Tabs>
        
      </div>
    </>
  );
};

export default QueryPage;
