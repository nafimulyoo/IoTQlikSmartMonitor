import { supabase } from "@/lib/initSupabase";

export async function POST(request: Request) {
  const session = await request.json();

  const { data, error }: any = await supabase
    .from("Dashboard Card")
    .select("*")
    .eq("username", session.username);

  console.log(data)
  return new Response(JSON.stringify({data, error}), {
    headers: { "content-type": "application/json" },
  });
}

 