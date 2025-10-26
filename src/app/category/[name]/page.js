import { connectDB } from "@/lib/dbConnect";
import News from "@/models/News";

export const dynamic = "force-dynamic";

export default async function Explore({ params }) {
  const { name } = params;
  await connectDB();
  const posts = await News.find({ category: new RegExp(name, "i") }).sort({ date: -1 });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{name} News</h1>
      {posts.map((p) => (
        <div key={p._id} className="border rounded-xl p-4 mb-4">
          <h2 className="text-xl font-semibold">{p.title}</h2>
          <p>{p.summary}</p>
        </div>
      ))}
    </main>
  );
}
