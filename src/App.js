import React, { Component } from 'react';
import ReactGA from 'react-ga4';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';

const MEASUREMENT_ID = "G-WRJKGSVRW8"; // Your Measurement ID

class App extends Component {
  componentDidMount() {
    ReactGA.initialize(MEASUREMENT_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }

  render() {
    return (
      <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <Container>
          <InvoiceForm />
        </Container>
        <footer
          style={{
            width: '100%',
            // Matches Bootstrap light background
            color: '#212529',
            padding: '1.5rem 0',
            marginTop: '2rem',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
            fontSize: '1rem',
            letterSpacing: '0.5px'
          }}
        >
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <a href="https://sohamsarda.github.io/portfolio-website/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <span style={{ fontWeight: 500, marginBottom: '0.5rem' }}>
                Made by Soham Sarda
              </span>
            </a>
            <div>
              <a
                href="https://github.com/sohamsarda"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#212529',
                  textDecoration: 'none',
                  marginRight: '1.5rem',
                  fontWeight: 400,
                  transition: 'color 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                {/* GitHub SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"></svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/soham-sarda-a54053243/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0a66c2',
                  textDecoration: 'none',
                  fontWeight: 400,
                  transition: 'color 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                {/* LinkedIn SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.002 3.6 4.604v5.592z" />
                </svg>
              </a>
            </div>

          </div>
        </footer>
      </div>
    );
  }
}

export default App;
