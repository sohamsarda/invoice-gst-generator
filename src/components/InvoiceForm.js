import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import Modal from 'react-bootstrap/Modal'; // Added Modal import

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '₹',
      currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      notes: '',
      total: '0.00',
      subTotal: '0.00',
      discountRate: '',
      discountAmmount: '0.00',
      billToGSTIN: '',
      billFromGSTIN: '',
      billToState: '',
      billToPIN: '',
      billFromState: '',
      billFromPIN: '',
      billToStateCode: '',
      billFromStateCode: '',
      placeOfSupply: '',
      reverseCharge: 'No',
      shipTo: '',
      shipToAddress: '',
      shipToGSTIN: '',
      shipToState: '',
      shipToStateCode: '',
      bankDetails: '',
      bankAccountName: '',
      bankAccountNumber: '',
      bankName: '',
      bankIFSC: '',
      bankBranch: '',
      bankUPI: '',
      focusIndex: 0, // track which item to focus
      businessAddresses: [], // array of saved business addresses
      showManagementModal: false, // for managing saved data
    };
    this.state.items = [
      {
        id: 0,
        name: '',
        description: '',
        price: '',
        quantity: '',
        hsn: '',
        unit: '',
        discount: '',
        cgstRate: '',
        sgstRate: '',
        igstRate: '',
      }
    ];
    this.editField = this.editField.bind(this);
  }
  componentDidMount(prevProps) {
    const addresses = JSON.parse(localStorage.getItem('businessAddresses') || '[]');
    this.setState({ businessAddresses: addresses });
    this.handleCalculateTotal()
  }
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  };
  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1,
      hsn: '',
      unit: '',
      discount: '', // empty by default
      cgstRate: '',
      sgstRate: '',
      igstRate: '',
    }
    this.state.items.push(items);
    this.setState({ items: this.state.items, focusIndex: this.state.items.length - 1 });
  }
  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;
    var totalCGST = 0;
    var totalSGST = 0;
    var totalIGST = 0;
    var totalDiscount = 0;
    items.forEach(function(item) {
      const price = parseFloat(item.price) || 0;
      const discountPercent = parseFloat(item.discount) || 0;
      const qty = parseInt(item.quantity) || 0;
      const discountAmount = price * qty * (discountPercent / 100);
      totalDiscount += discountAmount;
      const taxable = (price * qty) - discountAmount;
      subTotal += taxable;
      totalCGST += taxable * (parseFloat(item.cgstRate || 0) / 100);
      totalSGST += taxable * (parseFloat(item.sgstRate || 0) / 100);
      totalIGST += taxable * (parseFloat(item.igstRate || 0) / 100);
    });
    const discountRateNum = Math.max(0, Math.min(100, parseFloat(this.state.discountRate || 0)));
    const discountAmmount = parseFloat(subTotal) * (discountRateNum / 100);
    let netAmount = subTotal - discountAmmount;
    let total = netAmount + totalCGST + totalSGST + totalIGST;
    this.setState({
      subTotal: subTotal.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      discountAmmount: discountAmmount.toFixed(2),
      cgstAmount: totalCGST.toFixed(2),
      sgstAmount: totalSGST.toFixed(2),
      igstAmount: totalIGST.toFixed(2),
      total: total.toFixed(2)
    });
  };
  onItemizedItemEdit(evt) {
    const id = evt.target.dataset.id;
    const { name, value } = evt.target;
    console.log('Edit:', name, value, id);
    const items = this.state.items.map(item =>
      String(item.id) === String(id) ? { ...item, [name]: value } : item
    );
    this.setState({ items }, this.handleCalculateTotal);
  }
  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, this.handleCalculateTotal);
  };
  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };
  openModal = (event) => {
    event.preventDefault()
    this.handleCalculateTotal()
    this.setState({isOpen: true})
  };
  closeModal = (event) => this.setState({isOpen: false});
  getIndianInvoiceNumber() {
    // Format: INV/YYYY-YY/NNN
    const now = new Date();
    const year = now.getFullYear();
    const nextYear = (year + 1).toString().slice(-2);
    const serial = this.state.invoiceNumber.toString().padStart(3, '0');
    return `INV/${year}-${nextYear}/${serial}`;
  }
  saveDraft = () => {
    localStorage.setItem('invoiceDraft', JSON.stringify(this.state));
    alert('Draft saved!');
  }

  loadDraft = () => {
    const draft = localStorage.getItem('invoiceDraft');
    if (draft) {
      this.setState(JSON.parse(draft));
    } else {
      alert('No draft found.');
    }
  }
  saveBusinessAddress = () => {
    let addresses = JSON.parse(localStorage.getItem('businessAddresses') || '[]');
    addresses.push({
      billFrom: this.state.billFrom,
      billFromEmail: this.state.billFromEmail,
      billFromAddress: this.state.billFromAddress,
      billFromGSTIN: this.state.billFromGSTIN,
      billFromState: this.state.billFromState,
      billFromStateCode: this.state.billFromStateCode,
      billFromPIN: this.state.billFromPIN,
    });
    localStorage.setItem('businessAddresses', JSON.stringify(addresses));
    this.setState({ businessAddresses: addresses });
    alert('Business address saved!');
  }

  handleBusinessAddressSelect = (e) => {
    const idx = e.target.value;
    if (idx !== "") {
      const addr = this.state.businessAddresses[idx];
      this.setState({
        billFrom: addr.billFrom,
        billFromEmail: addr.billFromEmail,
        billFromAddress: addr.billFromAddress,
        billFromGSTIN: addr.billFromGSTIN,
        billFromState: addr.billFromState,
        billFromStateCode: addr.billFromStateCode,
        billFromPIN: addr.billFromPIN,
      });
    }
  }
  deleteBusinessAddress = (index) => {
    let addresses = JSON.parse(localStorage.getItem('businessAddresses') || '[]');
    addresses.splice(index, 1);
    localStorage.setItem('businessAddresses', JSON.stringify(addresses));
    this.setState({ businessAddresses: addresses });
    alert('Business address deleted!');
  }

  deleteDraft = () => {
    localStorage.removeItem('invoiceDraft');
    alert('Draft deleted!');
  }

  openManagementModal = () => {
    this.setState({ showManagementModal: true });
  }

  closeManagementModal = () => {
    this.setState({ showManagementModal: false });
  }
  render() {
    return (
      <Form onSubmit={this.openModal}>
        <Card className="p-4 shadow mb-4" style={{borderRadius: '14px', background: '#fff'}}>
          <h3 className="mb-4 fw-bold text-primary">Create Invoice</h3>
          <h5 className="mb-3 mt-2 fw-semibold">Supplier Details</h5>
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <Form.Label className="fw-bold">Bill from:</Form.Label>
              <Form.Select onChange={this.handleBusinessAddressSelect} className="my-2">
                <option value="">Select Saved Business Address</option>
                {this.state.businessAddresses && this.state.businessAddresses.map((addr, idx) => (
                  <option key={idx} value={idx}>{addr.billFrom} ({addr.billFromAddress})</option>
                ))}
              </Form.Select>
              <div className="d-flex gap-2 my-2">
                <Button variant="outline-secondary" onClick={this.saveBusinessAddress}>
                  Save Current as Business Address
                </Button>
                <Button variant="outline-info" onClick={this.openManagementModal}>
                  Manage Saved Data
                </Button>
              </div>
              <Form.Control placeholder={"Who is this invoice from?"} rows={3} value={this.state.billFrom} type="text" name="billFrom" className="my-2" onChange={this.editField} autoComplete="name" required="required"/>
              <Form.Control placeholder={"Email address"} value={this.state.billFromEmail} type="email" name="billFromEmail" className="my-2" onChange={this.editField} autoComplete="email" required="required"/>
              <Form.Control placeholder={"Billing address"} value={this.state.billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={this.editField} required="required"/>
              <Form.Control placeholder={"State"} value={this.state.billFromState} type="text" name="billFromState" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"State Code"} value={this.state.billFromStateCode} type="text" name="billFromStateCode" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"PIN code"} value={this.state.billFromPIN} type="text" name="billFromPIN" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"GSTIN"} value={this.state.billFromGSTIN} type="text" name="billFromGSTIN" className="my-2" onChange={this.editField} />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label className="fw-bold">Bank Details (optional):</Form.Label>
              <Form.Control placeholder={"Account Holder Name"} value={this.state.bankAccountName} type="text" name="bankAccountName" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"Account Number"} value={this.state.bankAccountNumber} type="text" name="bankAccountNumber" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"Bank Name"} value={this.state.bankName} type="text" name="bankName" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"IFSC Code"} value={this.state.bankIFSC} type="text" name="bankIFSC" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"Branch"} value={this.state.bankBranch} type="text" name="bankBranch" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"UPI ID"} value={this.state.bankUPI} type="text" name="bankUPI" className="my-2" onChange={this.editField} />
            </Col>
          </Row>
          <h5 className="mb-3 mt-4 fw-semibold">Recipient Details</h5>
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <Form.Label className="fw-bold">Bill to:</Form.Label>
              <Form.Control placeholder={"Who is this invoice to?"} rows={3} value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={this.editField} autoComplete="name" required="required"/>
              <Form.Control placeholder={"Email address"} value={this.state.billToEmail} type="email" name="billToEmail" className="my-2" onChange={this.editField} autoComplete="email" required="required"/>
              <Form.Control placeholder={"Billing address"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={this.editField} required="required"/>
              <Form.Control placeholder={"State"} value={this.state.billToState} type="text" name="billToState" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"State Code"} value={this.state.billToStateCode} type="text" name="billToStateCode" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"PIN code"} value={this.state.billToPIN} type="text" name="billToPIN" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"GSTIN"} value={this.state.billToGSTIN} type="text" name="billToGSTIN" className="my-2" onChange={this.editField} />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label className="fw-bold">Shipping Details:</Form.Label>
              <Form.Control placeholder={"Shipping To"} value={this.state.shipTo} type="text" name="shipTo" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"Shipping Address"} value={this.state.shipToAddress} type="text" name="shipToAddress" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"Shipping GSTIN"} value={this.state.shipToGSTIN} type="text" name="shipToGSTIN" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"Shipping State"} value={this.state.shipToState} type="text" name="shipToState" className="my-2" onChange={this.editField} />
              <Form.Control placeholder={"Shipping State Code"} value={this.state.shipToStateCode} type="text" name="shipToStateCode" className="my-2" onChange={this.editField} />
            </Col>
          </Row>
          <h5 className="mb-3 mt-4 fw-semibold">Invoice Details</h5>
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Form.Label className="fw-bold">Invoice Number</Form.Label>
              <Form.Control type="number" value={this.state.invoiceNumber} name={"invoiceNumber"} onChange={this.editField} min="1" required="required"/>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label className="fw-bold">Invoice Date</Form.Label>
              <Form.Control type="date" value={this.state.dateOfIssue} name={"dateOfIssue"} onChange={this.editField} required="required"/>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label className="fw-bold">Place of Supply</Form.Label>
              <Form.Control placeholder={"Place of Supply"} value={this.state.placeOfSupply} type="text" name="placeOfSupply" onChange={this.editField} required="required"/>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Form.Label className="fw-bold">Reverse Charge</Form.Label>
              <Form.Control placeholder={"Reverse Charge (Yes/No)"} value={this.state.reverseCharge} type="text" name="reverseCharge" onChange={this.editField} required="required"/>
            </Col>
            <Col md={8} className="mb-3">
              <Form.Label className="fw-bold">Notes</Form.Label>
              <Form.Control placeholder="Thanks for your business!" name="notes" value={this.state.notes} onChange={this.editField} as="textarea" rows={1}/>
            </Col>
          </Row>
          <h5 className="mb-3 mt-4 fw-semibold">Invoice Items</h5>
          <div className="mb-4">
            <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items} focusIndex={this.state.focusIndex}/>
          </div>
          <Row className="mt-4 justify-content-end">
            <Col lg={6} className="mb-3">
              <div className="d-flex flex-row align-items-start justify-content-between">
                <span className="fw-bold">Subtotal:</span>
                <span>{this.state.currency}{this.state.subTotal}</span>
              </div>
              <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                <span className="fw-bold">Total Discount:</span>
                <span>{this.state.currency}{this.state.totalDiscount || "0.00"}</span>
              </div>
              <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                <span className="fw-bold">Total CGST:</span>
                <span>{this.state.currency}{this.state.cgstAmount}</span>
              </div>
              <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                <span className="fw-bold">Total SGST:</span>
                <span>{this.state.currency}{this.state.sgstAmount}</span>
              </div>
              <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                <span className="fw-bold">Total IGST:</span>
                <span>{this.state.currency}{this.state.igstAmount}</span>
              </div>
              <hr/>
              <div className="d-flex flex-row align-items-start justify-content-between" style={{fontSize: '1.125rem'}}>
                <span className="fw-bold">Total:</span>
                <span className="fw-bold">{this.state.currency}{this.state.total || 0}</span>
              </div>
            </Col>
          </Row>
          <div className="text-end mt-4">
            <Button variant="outline-secondary" className="me-2" onClick={this.saveDraft}>Save Draft</Button>
            <Button variant="outline-primary" className="me-2" onClick={this.loadDraft}>Load Draft</Button>
            <Button variant="outline-danger" className="me-2" onClick={this.deleteDraft}>Delete Draft</Button>
            <Button variant="primary" type="submit" size="lg" className="px-5 py-2 fw-bold shadow-sm">Review Invoice</Button>
          </div>
        </Card>
        <InvoiceModal
          showModal={this.state.isOpen}
          closeModal={this.closeModal}
          info={{
            ...this.state,
            formattedInvoiceNumber: this.getIndianInvoiceNumber()
          }}
          items={this.state.items}
          currency={this.state.currency}
          subTotal={this.state.subTotal}
          cgstAmount={this.state.cgstAmount}
          sgstAmount={this.state.sgstAmount}
          igstAmount={this.state.igstAmount}
          total={this.state.total}
        />
        {/* Management Modal */}
        <Modal show={this.state.showManagementModal} onHide={this.closeManagementModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Manage Saved Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Saved Business Addresses</h5>
            {this.state.businessAddresses.length === 0 ? (
              <p className="text-muted">No saved business addresses</p>
            ) : (
              <div className="mb-4">
                {this.state.businessAddresses.map((addr, idx) => (
                  <div key={idx} className="card mb-2 p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong>{addr.billFrom}</strong><br/>
                        <small>{addr.billFromEmail}</small><br/>
                        <small>{addr.billFromAddress}</small><br/>
                        <small>GSTIN: {addr.billFromGSTIN}</small>
                      </div>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => this.deleteBusinessAddress(idx)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <h5>Saved Draft</h5>
            {localStorage.getItem('invoiceDraft') ? (
              <div className="card mb-2 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Invoice Draft</strong><br/>
                    <small>Last saved draft</small>
                  </div>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={this.deleteDraft}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted">No saved draft</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeManagementModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
}

export default InvoiceForm;
