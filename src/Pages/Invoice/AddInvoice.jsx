import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Sidebar from "../../Components/SideBar";
import "../../Styles/Invoice.css";

const AddInvoice = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([
    { productName: "", quantity: 1, unitPrice: 0, amount: 0 },
  ]);
  const [invoiceTotal, setInvoiceTotal] = useState(0);

  // Fetch products for the select dropdown
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      alert("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update amount and total when quantity or unitPrice changes
  const handleInvoiceItemChange = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field] = value;
    updatedItems[index].amount =
      updatedItems[index].quantity * updatedItems[index].unitPrice;
    setInvoiceItems(updatedItems);
    updateInvoiceTotal(updatedItems);
  };

  // Add new invoice item
  const addInvoiceItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { productName: "", quantity: 1, unitPrice: 0, amount: 0 },
    ]);
  };

  // Remove invoice item
  const removeInvoiceItem = (index) => {
    const updatedItems = invoiceItems.filter((_, i) => i !== index);
    setInvoiceItems(updatedItems);
    updateInvoiceTotal(updatedItems);
  };

  // Update total amount
  const updateInvoiceTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.amount, 0);
    setInvoiceTotal(total);
  };

  // Submit invoice
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const invoiceData = {
      invoiceId: 5000, // static initial ID, replace if needed
      invoiceCode: e.target.invoiceCode.value,
      customerName: e.target.customerName.value,
      customerNo: e.target.customerNo.value,
      billingAddress: e.target.billingAddress.value,
      invoiceTotal,
      invoiceItems,
    };

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/invoices`,
        invoiceData
      );
      if (response.status === 200) {
        alert("Invoice created successfully!");
        e.target.reset();
        setInvoiceItems([
          { productName: "", quantity: 1, unitPrice: 0, amount: 0 },
        ]);
        setInvoiceTotal(0);
      }
    } catch (error) {
      alert("Failed to create invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h3 className="card-title mb-4 text-center">Create Invoice</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="invoiceCode" className="form-label">
                Invoice Code
              </label>
              <input
                type="text"
                className="form-control"
                id="invoiceCode"
                name="invoiceCode"
                placeholder="e.g., INXXXXX"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">
                Customer Name
              </label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                name="customerName"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerNo" className="form-label">
                Customer No
              </label>
              <input
                type="text"
                className="form-control"
                id="customerNo"
                name="customerNo"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="billingAddress" className="form-label">
                Billing Address
              </label>
              <input
                type="text"
                className="form-control"
                id="billingAddress"
                name="billingAddress"
                required
              />
            </div>

            <h5 className="mb-3">Invoice Items</h5>
            {invoiceItems.map((item, index) => (
              <div key={index} className="border p-2 mb-2">
                <div className="mb-2">
                  <label className="form-label">Product</label>
                  <select
                    className="form-select"
                    value={item.productName}
                    onChange={(e) =>
                      handleInvoiceItemChange(
                        index,
                        "productName",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.productName}>
                        {product.productName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInvoiceItemChange(
                        index,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Unit Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleInvoiceItemChange(
                        index,
                        "unitPrice",
                        parseFloat(e.target.value)
                      )
                    }
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.amount.toFixed(2)}
                    disabled
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeInvoiceItem(index)}
                >
                  Remove Item
                </button>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-primary w-100 mb-3"
              onClick={addInvoiceItem}
            >
              Add Invoice Item
            </button>

            <div className="mb-3">
              <label className="form-label">Total Invoice Amount</label>
              <input
                type="text"
                className="form-control"
                value={invoiceTotal.toFixed(2)}
                disabled
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Invoice"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInvoice;
