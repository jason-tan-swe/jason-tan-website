import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/client";
import { EXPERIENCES_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const works = await sanityFetch({ 
      query: EXPERIENCES_QUERY,
      params: {},
      tags: ['experience']
    });
    return NextResponse.json({ success: true, data: works });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}
