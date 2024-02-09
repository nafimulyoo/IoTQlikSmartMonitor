import convertTextToStructuredQuery from "@/lib/nlpModel";
import { getUrlFromStructuredQuery } from "@/query/structuredQuery";
import axios from "axios";

type query = {
  method: "new" | "saved";
  session: {
    username: string;
    token: string;
    site: string;
  };
  query_input: {
    type: string;
    data: string;
  };
};

export async function POST(request: Request) {
  const query = await request.json();
  var structuredQuery;
  console.log("MEMK");
  console.log(query);

  if (!query.session) return new Response("Unauthorized", { status: 401 });

  if (query.method === "new") {
    if (query.query_input.type === "text") {
      structuredQuery = await convertTextToStructuredQuery(
        query.query_input.query_input
      );
    } else if (query.method === "select") {
      structuredQuery = query.query_input.query_input;
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
      'Content-Type': 'application/json',
    },
  })

  const jsonString = data.data.substring(data.data.indexOf('{'))
  const query_result = JSON.parse(jsonString)
  
  return new Response(
    JSON.stringify(query_result)
    , {
    headers: { "content-type": "application/json" },
  });

}
