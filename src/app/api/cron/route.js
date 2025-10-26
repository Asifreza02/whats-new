import { NextResponse } from "next/server";
import { fetchAndStoreNews } from "@/lib/fetchNews";
import { deleteOldNews } from "@/lib/deleteOldNews";

export async function GET() {
  try {
    console.log("🕒 Starting scheduled news update...");
    await fetchAndStoreNews();
    await deleteOldNews();
    console.log("✅ Cron job completed successfully.");
    return NextResponse.json({ message: "News updated and old items deleted" });
  } catch (error) {
    console.error("❌ Cron job failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
