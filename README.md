# Invoice Generator (React)

A professional invoice generator web app for Indian businesses, built with React. Easily create GST-compliant invoices, add itemized products/services, apply Indian tax rates (CGST, SGST, IGST), and download invoices as print-ready PDFs.

---

## Features
- **GST-compliant Indian Tax Invoice** format
- Add multiple items with quantity, price, and optional description
- Supports CGST, SGST, IGST calculations
- Customizable company and client details (address, GSTIN, etc.)
- Auto-formatted invoice number (Indian style: INV/YYYY-YY/NNN)
- Download invoice as a professional, print-ready PDF
- INR (₹) currency, Indian date format (DD/MM/YYYY)
- Company logo support
- Responsive and print-friendly design

---


## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm (comes with Node.js)

### Installation
```bash
git clone <your-repo-url>
cd invoice-generator
npm install
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

---

## Usage
1. Fill in your company and client details (name, address, GSTIN, etc.)
2. Add invoice items (description is optional)
3. Enter tax rates (CGST, SGST, IGST) as needed
4. Review the invoice preview
5. Download the invoice as a PDF for printing or sharing

---

## Customization
- **Logo:** Replace `src/favicon-32x32.png` with your company logo for branding
- **Default values:** Edit `src/components/InvoiceForm.js` to set your own default company info
- **Styling:** Modify CSS in `src/App.css` or component styles for further customization

---

## License
MIT License


