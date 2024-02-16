import React, { useState } from "react";
import SelectionInput from "./SelectionInput";
import TextInput from "./TextInput";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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
    <div className="flex flex-col justify-end items-center h-screen w-screen z-20"> 
      <div className="text-center ml-12 flex-grow flex items-center justify-center mt-20">
      <h1 class="text-7xl font-bold">Start querying your <br></br> IoT data</h1>
        
      </div>
      <Tabs defaultValue="text">
      <div className="h-44 w-full flex flex-col mt-2 mb-10" >
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="select">Select</TabsTrigger>
        </TabsList>
      </div>
        <TabsContent value="text">
          <TextInput setInputQuery={setInputQuery} inputQuery={inputQuery} />
        </TabsContent>
        <TabsContent value="select">
          <SelectionInput
            setInputQuery={setInputQuery}
            inputQuery={inputQuery}
          />
        </TabsContent>
      </Tabs>
      <Button onClick={() => handleQuery(inputQuery)}>Query</Button>
      </div>
    </>
  );
};

export default QueryPage;
