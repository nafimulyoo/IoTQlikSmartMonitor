import { useWhisper } from "@chengsokdara/use-whisper";
import { Button } from "../ui/button";

const AudioInput = ({ setInputText }: any) => {
  const onTranscribe = async (blob: Blob) => {
    const base64 = await new Promise<string | ArrayBuffer | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    const body = JSON.stringify({ file: base64, model: "whisper-1" });
    const headers = { "Content-Type": "application/json" };
    const response = await fetch("api/whisper", {
      method: "POST",
      body,
      headers,
    });
    const { text } = await response.json();
    // you must return result from your server in Transcript format
    console.log(text);
    setInputText(text);
    return {
      blob,
      text,
    };
  };

  const { startRecording, stopRecording } = useWhisper({
    onTranscribe,
  });

  return (
    <>
      <Button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 384 512"
        >
          <path
            fill="white"
            d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"
          />
        </svg>
      </Button>
    </>
  );
};
export default AudioInput;
