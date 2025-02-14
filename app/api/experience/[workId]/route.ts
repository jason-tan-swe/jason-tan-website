import { EXPERIENCE_QUERY } from "@/sanity/lib/queries";
import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/client";
import { Experience } from "@/sanity/sanity.types";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
  request: Request,
  { params }: { params: { workId: string } }
) {
  try {
      const { workId } = params;
      const data = await sanityFetch<Promise<[Experience]>>({ 
        query: EXPERIENCE_QUERY,
        tags: ['experience'],
        params: { slug: workId }
      });
      
      if (!data[0]) {
        return NextResponse.json({ success: false, error: "Work not found" }, { status: 404 }); 
      }

      return NextResponse.json({ success: true, data: data[0] });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch experiences" },
        { status: 500 }
      );
  }
}
