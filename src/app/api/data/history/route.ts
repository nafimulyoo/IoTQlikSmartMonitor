import { supabase } from "@/lib/initSupabase";

export async function POST(request: Request) {
  const session = await request.json();

  const { data, error }: any = await supabase
  .from("Query History")
  .select("*")
  .eq("username", session.username)
  .order("created_at", { ascending: false });

  return new Response(JSON.stringify({data, error}), {
    headers: { "content-type": "application/json" },
  });
}

 