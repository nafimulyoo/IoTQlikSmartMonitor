import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { getResponseSchema  } from "@/query/structuredQuery";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { getDeviceData } from "./deviceData";



const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
const parser = new JsonOutputFunctionsParser();

export default async function convertTextToStructuredQuery(queryText: string, session,  updateDevice) {
  // Create a new runnable, bind the function to the model, and pipe the output through the parser

  const deviceData = await getDeviceData(session,  updateDevice)

  const deviceDataString = parseDeviceDataToString(deviceData);

  const responseSchema = getResponseSchema(deviceDataString);

  const runnable = llm
    .bind({
      functions: [responseSchema],
      function_call: { name: "responseSchema" },
    })
    .pipe(parser);

  // Invoke the runnable with an input
  const structuredQuery = await runnable.invoke([
    new HumanMessage(queryText),
  ]);
  return structuredQuery;
}


function parseDeviceDataToString(data) {
  let deviceDataString = "";
  data.device.forEach((device) => {
    // Describing the device and its parameters
    let deviceDescription = `\n Device '${device.name}' with code '${device.code}' has the following parameters:`;
    if (device.parameters && device.parameters.parameter) {
      device.parameters.parameter.forEach((param) => {
        const paramDescription = ` - Parameter '${param.name}' (Code: ${param.code}, Unit: ${param.unit})`;
        deviceDescription += `\n${paramDescription}`;
      });
    }
    deviceDataString += deviceDescription;
  });

  return deviceDataString;
}
