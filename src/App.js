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
                <ion-icon name="logo-github" style={{ fontSize: 24 }}></ion-icon>
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
                <ion-icon name="logo-linkedin" style={{ fontSize: 24 }}></ion-icon>
              </a>
            </div>
            
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
