"use client";
import { useEffect, useState } from "react";
import AudioInput from "./AudioInput";
import { Input } from "@/components/ui/input";

const TextInput = ({ setInputQuery, children }: any) => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const newInputQuery = {
      type: "text",
      query_input: inputText,
    };
    setInputQuery(newInputQuery);
  }, [inputText]);

  return (
    <>
      <div className="w-96 relative flex flex-row items-center justify-center  h-full">
        <Input
          className="h-12 text-md mr-2"
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <AudioInput setInputText={setInputText} />
      </div>
      {children}
    </>
  );
};

export default TextInput;
