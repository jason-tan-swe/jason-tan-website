import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.email) {
    return NextResponse.json({}, { status: 400 });
  }

  const supabase = createClient();
  const { status } = await supabase.from("users").insert({ email: body.email });
  return NextResponse.json({}, { status });
}
