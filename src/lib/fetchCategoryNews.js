const fetchCategoryNews = async (category) => {
  setLoading(true);
  try {
    let url = '/api/news';
    if (category && category !== 'All Categories') {
      // Convert to lowercase for API, adjust if your API expects exact case
      url += `?category=${encodeURIComponent(category.toLowerCase())}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setNews(data.posts || []);
    setCurrentPage(1);
  } catch (err) {
    console.error(`❌ Failed to fetch ${category} news:`, err);
    setNews([]);
  }
  setLoading(false);
};
