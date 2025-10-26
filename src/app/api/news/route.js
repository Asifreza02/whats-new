import { NextResponse } from "next/server";
import { fetchAndStoreNews } from "@/lib/fetchNews";
import { deleteOldNews } from "@/lib/deleteOldNews";
import { connectDB } from "@/lib/dbConnect";
import News from "@/models/News";

export async function GET(request) {
  await connectDB();

  // Get category from query string
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category"); // e.g., "technology"

  // Build filter
  const filter = category && category.toLowerCase() !== "all categories"
    ? { category: { $regex: new RegExp(`^${category}$`, "i") } }
    : {};

  // Fetch news from DB
  const news = await News.find(filter).sort({ date: -1 });

  // Trigger background update (optional)
  fetchAndStoreNews();
  deleteOldNews();

  return NextResponse.json({ posts: news });
}
