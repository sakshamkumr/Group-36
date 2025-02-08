import React, { useState, useEffect } from "react";

const AllNews = ({ theme }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "1cf8acda848241eea2cf627427f7e795"; // Replace with your API key

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={theme === "dark" ? styles.darkContainer : styles.lightContainer}>
      <h1 style={styles.title}>Global News</h1>
      {loading ? (
        <p style={styles.loading}>Loading news...</p>
      ) : (
        <div style={styles.grid}>
          {news.map((article, index) => (
            <div key={index} style={theme === "dark" ? styles.darkCard : styles.lightCard} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} style={styles.image} />
              )}
              <div style={styles.cardBody}>
                <h2 style={theme === "dark" ? styles.darkCardTitle : styles.lightCardTitle}>{article.title}</h2>
                <p style={theme === "dark" ? styles.darkCardText : styles.lightCardText}>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.readMore}>
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

// Styles with Theme Support
const styles = {
  lightContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    color: "#000000",
    minHeight: "100vh",
  },
  darkContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  lightCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    color: "#000",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  darkCard: {
    border: "1px solid #555",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#2b2b2b",
    color: "#ffffff",
    boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "15px",
  },
  lightCardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#000",
  },
  darkCardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#fff",
  },
  lightCardText: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "15px",
  },
  darkCardText: {
    fontSize: "1rem",
    color: "#bbb",
    marginBottom: "15px",
  },
  readMore: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};


const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .news-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;
document.head.appendChild(styleTag);

export default AllNews;
