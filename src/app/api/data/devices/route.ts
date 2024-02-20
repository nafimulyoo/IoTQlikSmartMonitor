import { getDeviceData } from "@/lib/deviceData";

export async function POST(request: Request) {
  const parameter = await request.json();
  const session = parameter.session;
  const update = parameter.update;
  const deviceData = await getDeviceData(session, update);

  return new Response(JSON.stringify(deviceData), {
    headers: { "content-type": "application/json" },
  });
}
 