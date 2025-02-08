import React, { useState, useEffect } from "react";

const Country = ({ theme }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("United States"); // Default country

  const countryList = [
    { code: "United States", name: "United States" },
    { code: "United Kingdom", name: "United Kingdom" },
    { code: "India", name: "India" },
    { code: "Canada", name: "Canada" },
    { code: "Australia", name: "Australia" },
    { code: "France", name: "France" },
    { code: "Germany", name: "Germany" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${selectedCountry}&sortBy=publishedAt&apiKey=1cf8acda848241eea2cf627427f7e795`
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
  }, [selectedCountry]);       // Fetching the news when country changes

  return (
    <div style={theme === "dark" ? styles.darkContainer : styles.lightContainer}>
      <h1 style={styles.title}>News by Country</h1>

      {/* Dropdown for which country to select */}
      <select
        style={theme === "dark" ? styles.darkDropdown : styles.lightDropdown}
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {countryList.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

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
                <h2 style={styles.cardTitle}>{article.title}</h2>
                <p style={styles.cardText}>{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={theme === "dark" ? styles.darkReadMore : styles.lightReadMore}
                >
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


const styles = {
  lightContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  darkContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  lightDropdown: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#000",
  },
  darkDropdown: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #444",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "#fff",
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
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  darkCard: {
    border: "1px solid #444",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.1)",
    backgroundColor: "#2a2a2a",
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
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "15px",
  },
  lightReadMore: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  darkReadMore: {
    textDecoration: "none",
    color: "#ffa500",
    fontWeight: "bold",
  },
};

const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .news-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
  .light-mode a:hover {
    color: #ff4500;
  }
  .dark-mode a:hover {
    color: #ffcc00;
  }
`;
document.head.appendChild(styleTag);

export default Country;
