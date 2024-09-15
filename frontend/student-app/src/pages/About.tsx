import React from 'react';
import hokieBirdPattern from '../assets/hokie4k.png'; // Make sure to adjust the path based on where you place the image


const About: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          {/* HokieHand on the Left */}
          <a href="/" style={styles.logo}>
            <h1 style={styles.logoText}>HokieHand</h1>
          </a>
          {/* Navigation on the Right */}
          <nav style={styles.nav}>
            <a href="/about" style={styles.navLink}>About</a>
            <a href="/StudentInputPage" style={styles.navLink}>FindYou</a>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main style={styles.mainContent}>
        <h1 style={styles.pageHeading}>About Us</h1>
        <p style={styles.pageContent}>
          Welcome to HokieHand! We are dedicated to providing you with the best tools and resources to help you find the best classes and professors that fit your needs. Our platform offers a user-friendly search interface and valuable information to enhance your academic experience.
        </p>
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
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#131212',
    fontFamily: 'Arial, sans-serif',
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
    fontWeight: 'bold'
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
    textDecoration: 'none', // Remove underline for the <a> tag
    color: 'inherit', // Inherit the color of the parent
  },
  logoText: {
    margin: 0,
    fontFamily: 'inherit', // Ensure the font stays the same
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none', // Remove underline from nav links
    fontSize: '1.2rem',
    fontFamily: 'inherit', // Match font family
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
  pageHeading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#CF4420',
    fontWeight: '600',
    textAlign: 'center',
  },
  pageContent: {
    fontSize: '1.2rem',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: '1.6',
  },
  footer: {
    width: '100%',
    padding: '0.75rem 1.5rem', // Reduced padding for a smaller footer
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
    fontWeight: 'bold'
  },
};

export default About;
