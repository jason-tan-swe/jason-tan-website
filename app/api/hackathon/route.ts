import { HACKATHONS_QUERY } from "@/sanity/lib/queries";
import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/client";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    const hackathons = await sanityFetch({ 
      query: HACKATHONS_QUERY,
      params: {},
      tags: ['hackathon']
    });
    return NextResponse.json({ success: true, data: hackathons });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}
