import client from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const send = await client.publish("realtime", JSON.stringify(body));
  return NextResponse.json(send);
}
