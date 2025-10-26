import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "./dbConnect";
import News from "@/models/News";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const fetchAndStoreNews = async () => {
  await connectDB();
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const categories = [  'Technology', 'Sports', 'Finance', 'Politics', 'Health', 'Science',
  'Entertainment', 'Business', 'World', 'Education', 'Environment', 'Travel',
  'Lifestyle', 'Food', 'Culture', 'History',];

  for (const category of categories) {
    try {
      const prompt = `Give me a trending ${category} news headlines with short summaries and real URLs of the information.
      Format strictly as JSON array like this:
      [{"title": "headline", "summary": "summary", "url": "https://example.com"}]`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const newsList = JSON.parse(cleanText);

      for (const item of newsList) {
        await News.create({
          category,
          title: item.title,
          summary: item.summary,
          content: item.summary,
          url: item.url, 
        });
      }

      console.log(`✅ Added ${category} news`);
    } catch (err) {
      console.error(`⚠️ Failed to fetch/store ${category} news:`, err.message);
    }
  }
};
