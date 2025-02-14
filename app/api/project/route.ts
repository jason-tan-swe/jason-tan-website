import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/client";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    const projects = await sanityFetch({ 
      query: PROJECTS_QUERY,
      params: {},
      tags: ['project']
    });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}
