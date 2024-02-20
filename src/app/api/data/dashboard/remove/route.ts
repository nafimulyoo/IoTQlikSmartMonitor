import { supabase } from "@/lib/initSupabase";

export async function POST(request: Request) {
  const removedData = await request.json();

  const { error }: any = await supabase
      .from("Dashboard Card")
      .delete()
      .eq("username", removedData.username)
      .eq("card_id", removedData.card_id);

  return new Response(JSON.stringify({error}), {
    headers: { "content-type": "application/json" },
  });
}

 