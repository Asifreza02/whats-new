import { NextResponse } from "next/server";
import News from "@/models/News";
import { connectDB } from "@/lib/dbConnect";

export async function POST(req) {
  await connectDB();
  const { id, type } = await req.json();

  const update = type === "like" ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };
  await News.findByIdAndUpdate(id, update);

  return NextResponse.json({ success: true });
}
