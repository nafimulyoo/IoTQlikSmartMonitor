import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { HumanMessage } from "@langchain/core/messages";
import { responseSchema } from "@/query/structuredQuery";
import { JSONLoader } from "langchain/document_loaders/fs/json";

// const exampleJson = {
//   "name": "John Doe",
//   "age": 30,
//   "cars": [
//     { "name": "Ford", "models": ["Fiesta", "Focus", "Mustang"] },
//     { "name": "BMW", "models": ["320", "X3", "X5"] },
//     { "name": "Fiat", "models": ["500", "Panda"] }
//   ]
// }

// const loader = new JSONLoader({ data: exampleJson });

// const docs = await loader.load();


// const parser = new JsonOutputFunctionsParser();
  
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
