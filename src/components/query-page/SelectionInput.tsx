"use client";
import { useEffect, useState } from "react";

const SelectionInput = ({ setInputQuery, inputQuery }: any) => {
  
  const [ selection1, setSelection1 ] = useState("select1");
  const [ selection2, setSelection2 ] = useState("select1");
  const [ selection3, setSelection3 ] = useState("select1");

  useEffect(() => {
    const newInputQuery = {
      type: "select",
      query_input : {
        value1: selection1,
        value2: selection2,
        value3: selection3,
      }
    };
    setInputQuery(newInputQuery);
  }, [selection1, selection2, selection3]);
  
  return (
    <div>
      <select value={selection1} onChange={(e) => setSelection1(e.target.value)}>
        <option value="select1">Select 1</option>
        <option value="select2">Select 2</option>
        <option value="select3">Select 3</option>
      </select>
      <select value={selection2} onChange={(e) => setSelection2(e.target.value)}>
        <option value="select1">Select 1</option>
        <option value="select2">Select 2</option>
        <option value="select3">Select 3</option>
      </select>
      <select value={selection3} onChange={(e) => setSelection3(e.target.value)}>
        <option value="select1">Select 1</option>
        <option value="select2">Select 2</option>
        <option value="select3">Select 3</option>
      </select>
    </div>
  );
};

export default SelectionInput;
