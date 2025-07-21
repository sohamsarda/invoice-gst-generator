import React, { Component, useEffect } from 'react';
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
    </div>
  );
}}

export default App;
