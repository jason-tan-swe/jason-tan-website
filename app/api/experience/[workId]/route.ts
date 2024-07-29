import { getWorkData } from "@/lib/works";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
  request: Request,
  { params }: { params: { workId: string } }
) {
  const workId = params.workId;
  const data = await getWorkData(workId);

  return NextResponse.json(data, { status: data.success ? 200 : 404 });
}
