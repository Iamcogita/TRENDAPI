import React, { useEffect, useState } from "react";

const TrendingQueries: React.FC = () => {
  const [trends, setTrends] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch("http://localhost:4000/trends"); // Fetch from Express
        if (!response.ok) throw new Error("Failed to fetch trends.");
        
        const data = await response.json();
        const topFiveTrends = data.globalTrends.slice(0, 5).map((t: any) => t.title.query);
        setTrends(topFiveTrends);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Top 5 Trending Queries</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : trends.length > 0 ? (
        <ul className="bg-white shadow-md rounded-lg p-4">
          {trends.map((query, index) => (
            <li
              key={index}
              className="border-b last:border-none py-2 px-4 text-lg hover:bg-gray-100"
            >
              {index + 1}. {query}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Loading trends...</p>
      )}
    </div>
  );
};

export default TrendingQueries;
