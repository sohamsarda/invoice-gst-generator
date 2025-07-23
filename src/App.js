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
          <InvoiceForm/>
        </Container>
   <footer
          style={{
            width: '100%',
            background: '#f8f9fa', // Matches Bootstrap light background
            color: '#212529',
            padding: '1.5rem 0',
            marginTop: '2rem',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
            fontSize: '1rem',
            letterSpacing: '0.5px'
          }}
        >
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontWeight: 500, marginBottom: '0.5rem' }}>
              Made by Soham Sarda
            </span>
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
                <svg height="20" width="20" viewBox="0 0 16 16" fill="#212529" style={{ marginRight: 6 }}>
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8zm-1 12H5V7h2v5zm-1-6.25C5.45 5.75 5 5.3 5 4.75S5.45 3.75 6 3.75 7 4.2 7 4.75 6.55 5.75 6 5.75zm7 6.25h-2V9.5c0-.55-.45-1-1-1s-1 .45-1 1V12H7V7h2v.75c.28-.45.78-.75 1.25-.75 1.1 0 2 .9 2 2V12z"/>
                </svg>
                GitHub
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
                <svg height="20" width="20" viewBox="0 0 512 512" fill="#0a66c2" style={{ marginRight: 6 }}>
                  <path d="M417.2 64H94.8C78.6 64 64 78.6 64 94.8v322.4C64 433.4 78.6 448 94.8 448h322.4c16.2 0 29.8-14.6 29.8-30.8V94.8C448 78.6 433.4 64 417.2 64zM192 384h-64V208h64v176zm-32-200c-20.8 0-37.6-16.8-37.6-37.6S139.2 108.8 160 108.8s37.6 16.8 37.6 37.6S180.8 184 160 184zm256 200h-64V280c0-24.8-20.2-45-45-45s-45 20.2-45 45v104h-64V208h64v24.8c13.6-19.2 36.8-32.8 61.6-32.8 44.8 0 81.4 36.6 81.4 81.4V384z"/>
                </svg>
                LinkedIn
              </a>

            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
