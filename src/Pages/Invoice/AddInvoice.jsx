import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, message } from "antd";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import config from "../../config";
import Sidebar from "../../Components/SideBar";
import "../../Styles/AddProduct.css";

const { Option } = Select;

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
      message.error("Failed to load products.");
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
  const handleSubmit = async (values) => {
    setLoading(true);
    const invoiceData = {
      invoiceId: values.invoiceId,
      invoiceCode: values.invoiceCode,
      customerName: values.customerName,
      customerNo: values.customerNo,
      billingAddress: values.billingAddress,
      invoiceTotal,
      invoiceItems,
    };

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/invoices`,
        invoiceData
      );
      if (response.status === 200) {
        message.success("Invoice created successfully!");
        // Reset form and state after submission
        setInvoiceItems([{ productName: "", quantity: 1, unitPrice: 0, amount: 0 }]);
        setInvoiceTotal(0);
      }
    } catch (error) {
      message.error("Failed to create invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Sidebar />
    <div className="container">
      <Card title="Create Invoice" bordered={false}>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ invoiceId: 5000 }}
        >
          <Form.Item
            label="Invoice Code"
            name="invoiceCode"
            rules={[{ required: true, message: "Invoice Code is required! ex: INXXXXX" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: "Customer name is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Customer No"
            name="customerNo"
            rules={[{ required: true, message: "Customer number is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Billing Address"
            name="billingAddress"
            rules={[
              { required: true, message: "Billing address is required!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Dynamic Invoice Items */}
          {invoiceItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Form.Item
                label="Product"
                required
                name={[index, "productName"]}
                rules={[{ required: true, message: "Select a product!" }]}
              >
                <Select
                  value={item.productName}
                  onChange={(value) =>
                    handleInvoiceItemChange(index, "productName", value)
                  }
                  placeholder="Select product"
                >
                  {products.map((product) => (
                    <Option key={product.id} value={product.productName}>
                      {product.productName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Quantity"
                required
                name={[index, "quantity"]}
                rules={[{ required: true, message: "Quantity is required!" }]}
              >
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleInvoiceItemChange(index, "quantity", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item
                label="Unit Price"
                required
                name={[index, "unitPrice"]}
                rules={[{ required: true, message: "Unit price is required!" }]}
              >
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleInvoiceItemChange(index, "unitPrice", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Amount">
                <Input value={item.amount} disabled />
              </Form.Item>

              <Button
                type="danger"
                onClick={() => removeInvoiceItem(index)}
                icon={<DeleteOutlined />}
              >
                Remove Item
              </Button>
            </div>
          ))}

          <Button
            type="dashed"
            onClick={addInvoiceItem}
            block
            style={{ marginBottom: "20px" }}
          >
            Add Invoice Item
          </Button>

          <Form.Item label="Total Invoice Amount">
            <Input value={invoiceTotal} disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit Invoice
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </div>
  );
};

export default AddInvoice;
