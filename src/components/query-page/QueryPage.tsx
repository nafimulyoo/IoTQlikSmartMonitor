import React, { useState } from "react";
import SelectionInput from "./SelectionInput";
import TextInput from "./TextInput";

interface JSX {
  IntrinsicElements: {
    input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  };
}

const QueryPage = ({ fetchHistory, setModalData, session }: any) => {
  const [inputQuery, setInputQuery] = useState({});
  // send query to server, get response

  const handleQuery = async (inputQuery: any) => {
    const data = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          method : "new",
          session,
          query_input : inputQuery
        }
      ),
    }).then((res) => res.json());
    
    setModalData(data);
    fetchHistory();
    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    modalElement?.showModal();
  };

  return (
    <>
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="queryMode"
          role="tab"
          className="tab"
          aria-label="Text/Voice Input"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <TextInput setInputQuery={setInputQuery} inputQuery={inputQuery} />
        </div>

        <input
          type="radio"
          name="queryMode"
          role="tab"
          className="tab"
          aria-label="Selection Input"
        />
        <div role="tabpanel" className="tab-content p-10">
          <SelectionInput
            setInputQuery={setInputQuery}
            inputQuery={inputQuery}
          />
        </div>
      </div>
      <button onClick={() => handleQuery(inputQuery)}>Query</button>
    </>
  );
};

export default QueryPage;
