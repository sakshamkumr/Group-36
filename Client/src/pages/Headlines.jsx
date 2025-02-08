import React, { useState, useEffect } from "react";
import "./PagesStylesheets/headlines.css"; // Import the external CSS file

const Headlines = ({ theme }) => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "1cf8acda848241eea2cf627427f7e795"; // Replace with your API key

  useEffect(() => {
    const fetchHeadlines = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setHeadlines(data.articles || []);
      } catch (error) {
        console.error("Error fetching headlines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div className={`container ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <h1 className="title">Global News Headlines</h1>

      {loading ? (
        <p className="loading">Loading headlines...</p>
      ) : (
        <div className="grid">
          {headlines.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="news-image" />
              )}
              <div className="news-content">
                <h2 className="news-title">{article.title}</h2>
                <p className="news-description">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Headlines;
