import React, { useEffect, useState } from "react";
import { Badge, Card, message, Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../config";
import Sidebar from "../../Components/SideBar";

const PendingInvoices = () => {
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch inactive invoices on initial render
  useEffect(() => {
    const fetchPendingInvoices = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/invoices`);
        const inactiveInvoices = response.data.filter(invoice => !invoice.isActive);
        setPendingInvoices(inactiveInvoices);
      } catch (error) {
        message.error("Failed to load pending invoices.");
      }
    };

    fetchPendingInvoices();
  }, []);

  const showInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedInvoice(null);
  };

  const changeStatus = async (invoiceId) => {
    try {
      await axios.patch(`${config.BASE_URL}/api/invoices/${invoiceId}/status`);
      message.success("Invoice status updated successfully.");
      
      // Remove updated invoice from pending list
      setPendingInvoices(pendingInvoices.filter(invoice => invoice.invoiceId !== invoiceId));
    } catch (error) {
      message.error("Failed to update invoice status.");
    }
  };

  return (
    <>
      <Sidebar />
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px"
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          width: "100%",
          maxWidth: "800px",
        }}>
          {pendingInvoices.map((invoice) => (
            <Card
              key={invoice.invoiceId}
              style={{ width: "100%", maxWidth: "300px", textAlign: "left", position: "relative" }}
              onClick={() => showInvoiceDetails(invoice)}
            >
              {/* Badge for Pending Status */}
              {!invoice.isActive && (
                <Badge
                  count="Pending"
                  style={{ backgroundColor: "#ff4d4f", position: "absolute", top: "10px", right: "10px" }}
                />
              )}
              
              <p><strong>Invoice Number:</strong> {invoice.invoiceCode}</p>
              <p><strong>Customer:</strong> {invoice.customerName}</p>
              <p><strong>Address:</strong> {invoice.billingAddress}</p>
              <p><strong>Date:</strong> {new Date(invoice.createdAt).toLocaleString()}</p>
              <p><strong>Total:</strong> {invoice.invoiceTotal.toFixed(2)}</p>
              
              {/* Edit Icon to Change Status */}
              <EditOutlined
                onClick={(e) => {
                  e.stopPropagation(); // Prevents modal from opening
                  changeStatus(invoice.invoiceId);
                }}
                style={{ fontSize: "18px", color: "#1890ff", cursor: "pointer", position: "absolute", bottom: "10px", right: "10px" }}
              />
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for showing full invoice details */}
      {selectedInvoice && (
        <Modal
          title={`Invoice Details - #${selectedInvoice.invoiceId}`}
          visible={isModalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>Close</Button>,
          ]}
          centered
        >
          <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceCode}</p>
          <p><strong>Customer Name:</strong> {selectedInvoice.customerName}</p>
          <p><strong>Customer Number:</strong> {selectedInvoice.customerNo}</p>
          <p><strong>Billing Address:</strong> {selectedInvoice.billingAddress}</p>
          <p><strong>Date:</strong> {new Date(selectedInvoice.createdAt).toLocaleString()}</p>
          <p><strong>Invoice Total:</strong> {selectedInvoice.invoiceTotal.toFixed(2)}</p>
          
          <h3>Invoice Items:</h3>
          {selectedInvoice.invoiceItems.map((item) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              <p><strong>Product:</strong> {item.productName}</p>
              <p><strong>Category:</strong> {item.categoryName}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Unit Price:</strong> {item.unitPrice.toFixed(2)}</p>
              <p><strong>Amount:</strong> {item.amount.toFixed(2)}</p>
              <hr />
            </div>
          ))}
        </Modal>
      )}
    </>
  );
};

export default PendingInvoices;
