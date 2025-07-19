import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-001.pdf');
  });
}

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showShareMenu: false };
  }

  openShareMenu = () => this.setState({ showShareMenu: true });
  closeShareMenu = () => this.setState({ showShareMenu: false });

  sendViaEmail = () => {
    const subject = encodeURIComponent('Invoice from ' + (this.props.info.billFrom || 'Your Company'));
    const body = encodeURIComponent('Dear ' + (this.props.info.billTo || 'Customer') + ',%0D%0A%0D%0AFind your invoice attached. (You can download the PDF from the app.)%0D%0A%0D%0AThank you!');
    const mailto = `mailto:${this.props.info.billToEmail || ''}?subject=${subject}&body=${body}`;
    window.open(mailto, '_blank');
    this.closeShareMenu();
  };
  sendViaWhatsApp = () => {
    const message = encodeURIComponent('Hello ' + (this.props.info.billTo || '') + ', your invoice from ' + (this.props.info.billFrom || 'our company') + ' is ready. (You can download the PDF from the app.)');
    const phone = '';
    const waUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(waUrl, '_blank');
    this.closeShareMenu();
  };
  copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    this.closeShareMenu();
  };

  handlePrint = () => {
    const printContents = document.getElementById('invoiceCapture').innerHTML;
    const win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Print Invoice</title>');
    win.document.write('</head><body >');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  }

  render() {
    return(
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
          <div id="invoiceCapture" className="invoice-capture">
            <div className="text-center mb-3">
              <div style={{fontWeight: 700, fontSize: '1.7rem', letterSpacing: '2px', textTransform: 'uppercase'}}>TAX INVOICE</div>
            </div>
            <div className="invoice-gov-header row g-3 mb-3">
              <div className="col-md-4">
                <div className="card p-3 h-100" style={{background: '#f8fafc', border: '1px solid #e3e7ef', borderRadius: '10px'}}>
                  <div className="fw-bold mb-2" style={{fontSize: '1.08rem', letterSpacing: '0.5px'}}>
                    <span role="img" aria-label="Supplier" className="me-1"></span> Supplier
                  </div>
                  <div className="mb-1">{this.props.info.billFrom || 'Supplier Name'}</div>
                  <div className="mb-1">{this.props.info.billFromAddress || ''}</div>
                  <div className="mb-1">GSTIN: {this.props.info.billFromGSTIN || ''}</div>
                  <div className="mb-1">State: {this.props.info.billFromState || ''} ({this.props.info.billFromStateCode || ''})</div>
                  <div className="mb-1">Email: {this.props.info.billFromEmail || ''}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 h-100" style={{background: '#f8fafc', border: '1px solid #e3e7ef', borderRadius: '10px'}}>
                  <div className="fw-bold mb-2" style={{fontSize: '1.08rem', letterSpacing: '0.5px'}}>
                    <span role="img" aria-label="Invoice" className="me-1"></span> Invoice Details
                  </div>
                  <div className="mb-1"><b>Tax Invoice</b></div>
                  <div className="mb-1">Invoice No: {this.props.info.formattedInvoiceNumber || this.props.info.invoiceNumber || ''}</div>
                  <div className="mb-1">Date: {this.props.info.dateOfIssue ? (() => { const d = new Date(this.props.info.dateOfIssue); return (d.getDate().toString().padStart(2, '0') + '/' + (d.getMonth()+1).toString().padStart(2, '0') + '/' + d.getFullYear()); })() : ''}</div>
                  <div className="mb-1">Place of Supply: {this.props.info.placeOfSupply || ''}</div>
                  <div className="mb-1">Reverse Charge: {this.props.info.reverseCharge || 'No'}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 h-100" style={{background: '#f8fafc', border: '1px solid #e3e7ef', borderRadius: '10px'}}>
                  <div className="fw-bold mb-2" style={{fontSize: '1.08rem', letterSpacing: '0.5px'}}>
                    <span role="img" aria-label="Recipient" className="me-1"></span> Recipient
                  </div>
                  <div className="mb-1">{this.props.info.billTo || ''}</div>
                  <div className="mb-1">{this.props.info.billToAddress || ''}</div>
                  <div className="mb-1">GSTIN: {this.props.info.billToGSTIN || ''}</div>
                  <div className="mb-1">State: {this.props.info.billToState || ''} ({this.props.info.billToStateCode || ''})</div>
                  <div className="mb-1">Email: {this.props.info.billToEmail || ''}</div>
                </div>
              </div>
            </div>
            <div className="gov-shipping-details card p-3 mb-3" style={{background: '#f8fafc', border: '1px solid #e3e7ef', borderRadius: '10px'}}>
              <div className="fw-bold mb-2" style={{fontSize: '1.08rem', letterSpacing: '0.5px'}}>
                <span role="img" aria-label="Shipping" className="me-1"></span> Shipping Details
              </div>
              <div className="mb-1"><b>Shipping To:</b> {this.props.info.shipTo || this.props.info.billTo || ''}</div>
              <div className="mb-1">{this.props.info.shipToAddress || this.props.info.billToAddress || ''}</div>
              <div className="mb-1">GSTIN: {this.props.info.shipToGSTIN || this.props.info.billToGSTIN || ''}</div>
              <div className="mb-1">State: {this.props.info.shipToState || this.props.info.billToState || ''} ({this.props.info.shipToStateCode || this.props.info.billToStateCode || ''})</div>
            </div>
            <table className="invoice-table gov-table">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Description of Goods/Services</th>
                  <th>HSN/SAC</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Rate</th>
                  <th>Discount</th>
                  <th>Taxable Value</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>IGST</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.props.items.map((item, i) => {
                  const price = parseFloat(item.price) || 0;
                  const discount = parseFloat(item.discount) || 0;
                  const qty = parseInt(item.quantity) || 0;
                  const discountAmount = price * qty * (discount / 100);
                  const taxable = (price * qty) - discountAmount;
                  const cgst = item.cgstRate ? (taxable * (parseFloat(item.cgstRate) / 100)) : 0;
                  const sgst = item.sgstRate ? (taxable * (parseFloat(item.sgstRate) / 100)) : 0;
                  const igst = item.igstRate ? (taxable * (parseFloat(item.igstRate) / 100)) : 0;
                  const total = taxable + cgst + sgst + igst;
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{item.name} {item.description ? `- ${item.description}` : ''}</td>
                      <td>{item.hsn || ''}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit || ''}</td>
                      <td>{this.props.currency} {item.price}</td>
                      <td>{item.discount ? `${item.discount}% = ${this.props.currency} ${(parseFloat(item.price) * parseInt(item.quantity) * parseFloat(item.discount || 0) / 100).toFixed(2)}` : '0%'}</td>
                      <td>{this.props.currency} {taxable.toFixed(2)}</td>
                      <td>{item.cgstRate ? `${item.cgstRate}%` : '-'}</td>
                      <td>{item.sgstRate ? `${item.sgstRate}%` : '-'}</td>
                      <td>{item.igstRate ? `${item.igstRate}%` : '-'}</td>
                      <td>{this.props.currency} {total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table className="invoice-summary mt-3 mb-2" style={{width: '100%', background: '#f8fafc', border: '1px solid #e3e7ef', borderRadius: '8px'}}>
              <tbody>
                <tr>
                  <td className="fw-bold">Total Taxable Value</td>
                  <td className="text-end">{this.props.currency} {this.props.subTotal}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Total CGST</td>
                  <td className="text-end">{this.props.currency} {this.props.cgstAmount}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Total SGST</td>
                  <td className="text-end">{this.props.currency} {this.props.sgstAmount}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Total IGST</td>
                  <td className="text-end">{this.props.currency} {this.props.igstAmount}</td>
                </tr>
                <tr className="total-row">
                  <td className="fw-bold">Grand Total (Invoice Value)</td>
                  <td className="text-end fw-bold">{this.props.currency} {this.props.total}</td>
                </tr>
              </tbody>
            </table>
            {(
              this.props.info.bankAccountName ||
              this.props.info.bankAccountNumber ||
              this.props.info.bankName ||
              this.props.info.bankIFSC ||
              this.props.info.bankBranch ||
              this.props.info.bankUPI
            ) && (
              <div className="gov-bank-details card p-3 my-3" style={{background: '#f6fafd', border: '1px solid #b6d4fe', borderRadius: '8px'}}>
                <div className="fw-bold mb-2" style={{fontSize: '1.1rem'}}>Bank Details </div>
                <table style={{width: '100%', fontSize: '1rem'}}>
                  <tbody>
                    {this.props.info.bankAccountName && (
                      <tr><td className="fw-semibold" style={{width: '180px'}}>Account Holder Name</td><td>{this.props.info.bankAccountName}</td></tr>
                    )}
                    {this.props.info.bankAccountNumber && (
                      <tr><td className="fw-semibold">Account Number</td><td>{this.props.info.bankAccountNumber}</td></tr>
                    )}
                    {this.props.info.bankName && (
                      <tr><td className="fw-semibold">Bank Name</td><td>{this.props.info.bankName}</td></tr>
                    )}
                    {this.props.info.bankIFSC && (
                      <tr><td className="fw-semibold">IFSC Code</td><td>{this.props.info.bankIFSC}</td></tr>
                    )}
                    {this.props.info.bankBranch && (
                      <tr><td className="fw-semibold">Branch</td><td>{this.props.info.bankBranch}</td></tr>
                    )}
                    {this.props.info.bankUPI && (
                      <tr><td className="fw-semibold">UPI ID</td><td>{this.props.info.bankUPI}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <div className="gov-declaration mt-4">
              <div className="mb-2" style={{fontWeight: 500}}>
                Declaration: Certified that the particulars given above are true and correct and that the amount indicated represents the price actually charged and that there is no additional consideration.
              </div>
              <div className="mb-2">Subject to jurisdiction of your city. This is a computer-generated invoice and does not require a signature.</div>
              <div className="d-flex justify-content-end align-items-end mt-4">
                <div className="text-end">
                  <div className="mb-2">For <b>{this.props.info.billFrom || 'Supplier Name'}</b></div>
                  <div style={{marginTop: '32px', textAlign: 'right', fontWeight: 600}}><b>Authorised Signatory</b></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button variant="primary" className="d-block w-100" onClick={this.openShareMenu}>
                  <BiPaperPlane style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Share
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                  <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                  Download
                </Button>
                <Button variant="outline-secondary" className="d-block w-100 mt-3" onClick={this.handlePrint}>
                  Print
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        {/* Share menu modal */}
        <Modal show={this.state.showShareMenu} onHide={this.closeShareMenu} centered>
          <Modal.Header closeButton><Modal.Title>Share Invoice</Modal.Title></Modal.Header>
          <Modal.Body>
            <Button variant="outline-primary" className="w-100 mb-2" onClick={this.sendViaEmail}>Send via Email</Button>
            <Button variant="outline-success" className="w-100 mb-2" onClick={this.sendViaWhatsApp}>Send via WhatsApp</Button>
            <Button variant="outline-secondary" className="w-100" onClick={this.copyLink}>Copy Link</Button>
          </Modal.Body>
        </Modal>
        <hr className="mt-4 mb-3"/>
      </div>
    )
  }
}

export default InvoiceModal;
