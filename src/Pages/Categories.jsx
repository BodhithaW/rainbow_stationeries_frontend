import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Card, Modal, Table, Row, Col } from "antd";
import axios from "axios";
import config from "../config";
import Sidebar from "../Components/SideBar";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import "../Styles/page.css";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      message.error("Failed to load categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (values) => {
    const { categoryName } = values;
    setLoading(true);
    try {
      const response = await axios.post(`${config.BASE_URL}/api/categories`, { categoryName });
      if (response.status === 200) {
        message.success("Category added successfully!");
        setCategories([...categories, response.data]);
        fetchCategories();
      }
    } catch (error) {
      message.error("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
    window.location.reload();
  };

  // Columns for the Ant Design Table
  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  
  // Handle category deletion
  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      onOk: async () => {
    try {
      await axios.delete(`${config.BASE_URL}/api/categories/${id}`);
      message.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      message.error("Failed to delete category.");
    }
  },
  onCancel: () => {},
});
  };

  // Open and close modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={6} md={6} lg={4}>
          <Sidebar />
        </Col>

        <Col xs={24} sm={18} md={12} lg={10}>
          <Card
            title="Add Category"
            bordered={false}
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "20px",
            }}
          >
            <Form
              name="add_category"
              onFinish={handleSubmit}
              labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
              wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
              initialValues={{ isActive: true }}
            >
              <Form.Item
                label="Category Name"
                name="categoryName"
                rules={[{ required: true, message: "Category name is required!" }]}
              >
                <Input placeholder="Enter category name" />
              </Form.Item>
              <Form.Item
                wrapperCol={{ xs: { span: 24 }, sm: { offset: 8, span: 16 } }}
              >
                <Button type="primary" htmlType="submit" loading={loading}>
                  Add Category
                </Button>
              </Form.Item>
            </Form>

            <Button
              onClick={showModal}
              style={{ marginTop: "20px", width: "100%" }}
            >
              View Categories
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Modal for Viewing Categories */}
      <Modal
        title="Categories"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default AddCategory;
