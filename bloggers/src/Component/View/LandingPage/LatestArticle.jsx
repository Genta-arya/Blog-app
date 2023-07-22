import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const LatestArticles = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.27:3001/posting")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Sort articles by date in descending order
          const sortedArticles = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          // Get the first three articles (latest articles)
          const latestThreeArticles = sortedArticles.slice(0, 3);
          setLatestArticles(latestThreeArticles);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // Function to format the date (e.g., July 5, 2023)
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-5 flex justify-center">Artikel Terbaru</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : latestArticles.length > 0 ? (
        <div>
          {latestArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-lg p-8 rounded-lg mb-4 hover:scale-105"
            >
                
              <img
                src="https://via.placeholder.com/300x200"
                alt="Placeholder Image"
                className="w-full h-48 object-cover"
              />
              <Link
                to={`/detail/${article.id}`}
                className="text-xl font-bold mb-2 hover:text-green-500"
              >
                <h2 className="text-xl font-bold mt-2">{article.title}</h2>
              </Link>

              <p className="text-gray-500 mb-2">{formatDate(article.date)}</p>
              <p className="text-gray-600 mb-2">Author: {article.author}</p>
              <p className="text-gray-800">
                {article.isi.substring(0, 100)}.....
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>No articles found.</div>
      )}
    </div>
  );
};

export default LatestArticles;
