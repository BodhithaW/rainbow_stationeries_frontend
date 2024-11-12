import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users"); // Adjust the API endpoint as needed
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`); // Adjust the API endpoint as needed
      notification.success({ message: "User deleted successfully!" });
      fetchUsers();
    } catch (error) {
      notification.error({ message: "Error deleting user" });
    }
  };

  const handleModalOk = async (values) => {
    try {
      // Update the user
      await axios.put(`/api/users/${editingUser.id}`, values); // Adjust the API endpoint as needed
      notification.success({ message: "User updated successfully!" });
      fetchUsers();
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: "Error updating user" });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="danger">
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          initialValues={
            isEditing
              ? {
                  username: editingUser.username,
                  password: editingUser.password,
                }
              : {}
          }
          onFinish={handleModalOk}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
