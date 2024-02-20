import { supabase } from "@/lib/initSupabase";

export async function POST(request: Request) {
  const newData = await request.json();

  const { data, error }: any = await supabase.from("Dashboard Card").upsert({
    username: newData.username,
    card_id: newData.card_id,
    created_at: new Date(),
    query_name: newData.query_name,
    structured_query: newData.structured_query,
  });

  return new Response(JSON.stringify({data, error}), {
    headers: { "content-type": "application/json" },
  });
}

 