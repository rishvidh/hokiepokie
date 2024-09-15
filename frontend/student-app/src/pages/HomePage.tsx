import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import hokieBirdPattern from '../assets/hokie4k.png'; // Make sure to adjust the path based on where you place the image

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div style={styles.appContainer}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          {/* HokieHand on the Left */}
          <a href="/" style={styles.logo}>
            <h1 style={styles.logoText}>HokieHand</h1>
          </a>
          {/* Navigation on the Right */}
          <nav style={styles.nav}>
            <Link to="/About" style={styles.navLink}>
              About
            </Link>
            <Link to="/StudentInputPage" style={styles.navLink}>
              FindYou
            </Link>
            <Link to="/Login" style={styles.navLink}>
                Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Section - Search Bar */}
      <main style={styles.mainContent}>
        <h2 style={styles.mainHeading}>Search for Classes or Professors</h2>
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by class or professor name"
            style={styles.searchInput}
          />
          <button
            onClick={handleSearchSubmit}
            style={{
              ...styles.searchButton,
              backgroundColor: isHovered ? '#BF362F' : '#CF4420',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isHovered ? '0 4px 10px rgba(0, 0, 0, 0.2)' : '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Search
          </button>
        </div>
      </main>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p>
          Contact us at <a href="mailto:info@vt.edu" style={styles.footerLink}>info@vt.edu</a> | Privacy Policy
        </p>
      </footer>
    </div>
  );
};

// Inline styles for the components
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#131212',
    backgroundImage: `url(${hokieBirdPattern})`, // Use the uploaded pattern
    backgroundSize: 'cover', // Adjust size as needed
    backgroundRepeat: 'repeat',
    backgroundPosition: '45deg', // Diagonal orientation
  },
  header: {
    width: '100%',
    padding: '1.5rem',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #6A2C3E, #CF4520)',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    textDecoration: 'none',
    color: 'inherit',
  },
  logoText: {
    margin: 0,
    fontFamily: 'inherit',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontFamily: 'inherit',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    width: '100%',
    maxWidth: '800px',
  },
  mainHeading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#CF4420',
    fontWeight: '600',
    textAlign: 'center',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginRight: '1rem',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  searchButton: {
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    width: '100%',
    padding: '0.75rem 1.5rem',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #6A2C3E, #CF4520)',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default App;
