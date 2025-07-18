import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';
import Card from 'react-bootstrap/Card';

class InvoiceItem extends React.Component {
  render() {
    const { items, currency, onItemizedItemEdit, onRowDel, onRowAdd } = this.props;
    return (
      <div>
        {items.map((item, idx) => (
          <Card key={item.id} className="mb-4 shadow-sm p-3" style={{border: '1px solid #e5e7eb', borderRadius: '10px'}}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-bold">Item #{idx + 1}</div>
              <BiTrash onClick={() => onRowDel(item)} style={{height: '28px', width: '28px', cursor: 'pointer'}} className="text-danger"/>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "text",
                    name: "name",
                    placeholder: "Item name",
                    value: item.name,
                    id: String(item.id),
                  }}/>
              </div>
              <div className="col-md-6 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "text",
                    name: "hsn",
                    placeholder: "HSN/SAC",
                    value: item.hsn,
                    id: String(item.id)
                  }}/>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-8 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "text",
                    name: "description",
                    placeholder: "Description",
                    value: item.description,
                    id: String(item.id)
                  }}/>
              </div>
              <div className="col-md-4 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "text",
                    name: "unit",
                    placeholder: "Unit",
                    value: item.unit,
                    id: String(item.id)
                  }}/>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 col-md-2 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "number",
                    name: "quantity",
                    min: 1,
                    step: "1",
                    placeholder: "Qty",
                    value: item.quantity,
                    id: String(item.id),
                  }}/>
              </div>
              <div className="col-6 col-md-2 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    leading: currency,
                    type: "number",
                    name: "price",
                    min: 1,
                    step: "0.01",
                    presicion: 2,
                    textAlign: "text-end",
                    placeholder: "Rate",
                    value: item.price,
                    id: String(item.id),
                  }}/>
              </div>
              <div className="col-6 col-md-2 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "number",
                    name: "discount",
                    min: 0,
                    max: 100,
                    step: "0.01",
                    presicion: 2,
                    textAlign: "text-end",
                    placeholder: "Discount %",
                    value: item.discount,
                    id: String(item.id),
                  }}/>
                <div className="small text-muted">
                  {item.discount ? `${item.discount}% = ${currency} ${(parseFloat(item.price) * parseInt(item.quantity) * parseFloat(item.discount || 0) / 100).toFixed(2)}` : '0%'}
                </div>
              </div>
              <div className="col-6 col-md-2 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "number",
                    name: "cgstRate",
                    min: 0,
                    step: "0.01",
                    presicion: 2,
                    textAlign: "text-end",
                    placeholder: "CGST %",
                    value: item.cgstRate,
                    id: String(item.id),
                  }}/>
              </div>
              <div className="col-6 col-md-2 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "number",
                    name: "sgstRate",
                    min: 0,
                    step: "0.01",
                    presicion: 2,
                    textAlign: "text-end",
                    placeholder: "SGST %",
                    value: item.sgstRate,
                    id: String(item.id),
                  }}/>
              </div>
              <div className="col-6 col-md-2 mb-2">
                <EditableField
                  onItemizedItemEdit={onItemizedItemEdit}
                  cellData={{
                    type: "number",
                    name: "igstRate",
                    min: 0,
                    step: "0.01",
                    presicion: 2,
                    textAlign: "text-end",
                    placeholder: "IGST %",
                    value: item.igstRate,
                    id: String(item.id),
                  }}/>
              </div>
              <div className="col-12 col-md-3 mb-2 d-flex align-items-center fw-bold">
                Amount: {currency} {((parseFloat(item.price) * parseInt(item.quantity)) - (parseFloat(item.price) * parseInt(item.quantity) * parseFloat(item.discount || 0) / 100)).toFixed(2)}
              </div>
            </div>
          </Card>
        ))}
        <Button className="fw-bold" onClick={onRowAdd}>Add Item</Button>
      </div>
    );
  }
}

export default InvoiceItem;
