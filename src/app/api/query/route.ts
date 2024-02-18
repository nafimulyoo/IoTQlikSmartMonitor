import convertTextToStructuredQuery from "@/lib/nlpModel";
import { getUrlFromStructuredQuery } from "@/query/structuredQuery";
import axios from "axios";
import { supabase } from "@/lib/initSupabase";

export async function POST(request: Request) {
  const query = await request.json();
  var structuredQuery;


  if (!query.session) return new Response("Unauthorized", { status: 401 });
  if (query.session == "unauthorized")
    return new Response("Unauthorized", { status: 401 });

  if (query.method === "new") {
    if (query.query_input.type === "text") {
      structuredQuery = await convertTextToStructuredQuery(
        query.query_input.query_input,
        query.session,
        query.updateDevice
      );
    } else if (query.query_input.type === "select") {
      structuredQuery = query.query_input.query_selection;
      console.log("structuredQuery", structuredQuery);
    }
    const { error } = await supabase
    .from("Query History")
    .insert({
         username: query.session.username,
         site: query.session.site,
         query_name: structuredQuery.query_name,
         structured_query: structuredQuery,
       });
     if (error) {
       console.error("Error saving structured query to supabase:", error);
       throw new Error("Error saving structured query");
     }
   
  } else if (query.method === "saved") {
    structuredQuery = query.query_input.query_input;
  }
  // this return string
  console.log(structuredQuery);
  const url = getUrlFromStructuredQuery(
    structuredQuery,
    query.session.token,
    query.session.site,
    query.session.username
  );


  const data = await axios.post(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });



  const jsonString = data.data.substring(data.data.indexOf("{"));
  const apiData = JSON.parse(jsonString);
  // add structured query to the result
  const query_result = { ...apiData, query_type: structuredQuery.query_type };

  return new Response(JSON.stringify(query_result), {
    headers: { "content-type": "application/json" },
  });
}
