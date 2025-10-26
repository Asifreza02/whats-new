import { connectDB } from "@/lib/dbConnect";
import News from "@/models/News";

export const dynamic = "force-dynamic"; // ensures fresh data on each load

export default async function TopPostsPage() {
  await connectDB();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  const posts = await News.find({ date: { $gte: cutoff } })
    .sort({ likes: -1 })
    .limit(10);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">🔥 Top Liked Posts This Month</h1>
      {posts.map((p) => (
        <div key={p._id} className="border rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-500">{p.category}</p>
          <h2 className="text-xl font-semibold">{p.title}</h2>
          <p>{p.summary}</p>
          <p className="mt-2">👍 {p.likes} | 👎 {p.dislikes}</p>
        </div>
      ))}
    </main>
  );
}
