import React, { useState, useEffect } from "react";
import { Card, Button, Modal, List, Typography, message } from "antd";
import axios from "axios";
import config from "../../config";
import Sidebar from "../../Components/SideBar";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch invoices from API
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.BASE_URL}/api/invoices`);
      setInvoices(response.data);
    } catch (error) {
      message.error("Failed to load invoices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle click on card to view full invoice details
  const viewInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  return (
    <>
    <Sidebar />
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {invoices.map((invoice) => (
        <Card
          key={invoice.invoiceId}
          // title={`Invoice ID: ${invoice.invoiceId}`}
          bordered
          style={{ width: 300 }}
          extra={
            <Button type="link" onClick={() => viewInvoiceDetails(invoice)}>
              View Details
            </Button>
          }
        >
          <p><strong>Invoice Number:</strong> {invoice.invoiceCode}</p>
          <p><strong>Customer Name:</strong> {invoice.customerName}</p>
          <p><strong>Billing Address:</strong> {invoice.billingAddress}</p>
          <p><strong>Date:</strong> {new Date(invoice.createdAt).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> {invoice.invoiceTotal.toFixed(2)}</p>
        </Card>
      ))}

      {/* Modal for Invoice Details */}
      <Modal
        // title={`Invoice ID: ${selectedInvoice?.invoiceId}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedInvoice && (
          <div>
            <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceCode}</p>
            <p><strong>Customer Name:</strong> {selectedInvoice.customerName}</p>
            <p><strong>Customer No:</strong> {selectedInvoice.customerNo}</p>
            <p><strong>Billing Address:</strong> {selectedInvoice.billingAddress}</p>
            <p><strong>Total Amount:</strong> {selectedInvoice.invoiceTotal.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(selectedInvoice.createdAt).toLocaleString()}</p>
            <List
              header={<Typography.Title level={4}>Invoice Items</Typography.Title>}
              bordered
              dataSource={selectedInvoice.invoiceItems}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.productName} (Category: ${item.categoryName})`}
                    description={`Quantity: ${item.quantity}, Unit Price: ${item.unitPrice.toFixed(2)}, Amount: ${item.amount.toFixed(2)}`}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
    </>
  );
};

export default InvoiceList;
