import React, { useState } from 'react';
import hokieBirdPattern from '../assets/hokie-bird-pattern.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, studentID, password });
    // Add authentication logic here
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        {/* HokieHand Button on the Top Left */}
        <button style={styles.homeButton} onClick={() => window.location.href = '/'}>
          HokieHand
        </button>
        <h1 style={styles.pageTitle}>Login Page</h1>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>VT Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your VT email"
            required
            style={styles.input}
          />

          <label style={styles.label}>Student ID:</label>
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            placeholder="Enter your Student ID"
            required
            style={styles.input}
          />

          <label style={styles.label}>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={styles.input}
          />
          
          <div style={styles.showPasswordContainer}>
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle the state
              style={styles.checkbox}
            />
            <label htmlFor="show-password" style={styles.showPasswordLabel}>
              Show Password
            </label>
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>

      <footer style={styles.footer}>
        <p>
            Contact us at <a href="mailto:info@vt.edu" style={styles.footerLink}>info@vt.edu</a> | Privacy Policy
        </p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundColor: '#131212',
    backgroundImage: `url(${hokieBirdPattern})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    backgroundPosition: '45deg'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #6A2C3E, #CF4520)',
    color: 'white',
    fontWeight: 'bold',
    padding: '1rem',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '80px',
  },
  homeButton: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    left: '1rem',
    fontWeight: 'bold',
    fontSize: '2rem',
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: '80px',
    paddingBottom: '80px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#CF4520',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '1rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  showPasswordContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  checkbox: {
    cursor: 'pointer',
  },
  showPasswordLabel: {
    fontSize: '1rem',
    color: 'white',
  },
  button: {
    padding: '0.75rem 1rem',
    backgroundColor: '#CF4520',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#CF4520',
    background: 'linear-gradient(90deg, #6A2C3E, #CF4520)',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1rem',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '60px',
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold'
  }
};

export default Login;
