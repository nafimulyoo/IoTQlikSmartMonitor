import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { HumanMessage } from "@langchain/core/messages";
import { responseSchema } from "@/query/structuredQuery";

const parser = new JsonOutputFunctionsParser();
  
// Instantiate the ChatOpenAI class
const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });

// Create a new runnable, bind the function to the model, and pipe the output through the parser

export default async function convertTextToStructuredQuery(queryText: string) {
  // Create a new runnable, bind the function to the model, and pipe the output through the parser
  const runnable = model
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
