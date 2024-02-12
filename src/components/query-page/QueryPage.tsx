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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Start querying your IoT data
      </h1>
      <Tabs defaultValue="text">
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="select">Select</TabsTrigger>
        </TabsList>
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
    </>
  );
};

export default QueryPage;
