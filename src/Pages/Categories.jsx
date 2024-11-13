// import React, { useState, useEffect } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   message,
//   Card,
//   Modal,
//   Table,
//   Row,
//   Col,
// } from "antd";
// import axios from "axios";
// import config from "../config";
// import Sidebar from "../Components/SideBar";
// import { useNavigate } from "react-router-dom";
// import { DeleteOutlined } from "@ant-design/icons";
// import Styles from "../Styles/Page.css";

// const AddCategory = () => {
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const navigate = useNavigate();

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${config.BASE_URL}/api/categories`);
//       setCategories(response.data);
//     } catch (error) {
//       message.error("Failed to load categories.");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (values) => {
//     const { categoryName } = values;
//     setLoading(true);
//     try {
//       const response = await axios.post(`${config.BASE_URL}/api/categories`, {
//         categoryName,
//       });
//       if (response.status === 200) {
//         message.success("Category added successfully!");
//         setCategories([...categories, response.data]);
//         fetchCategories();
//       }
//     } catch (error) {
//       message.error("Failed to add category. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//     window.location.reload();
//   };

//   // Columns for the Ant Design Table
//   const columns = [
//     {
//       title: "Category Name",
//       dataIndex: "categoryName",
//       key: "categoryName",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <DeleteOutlined
//           style={{ color: "red" }}
//           onClick={() => handleDelete(record.id)}
//         />
//       ),
//     },
//   ];

//   // Handle category deletion
//   const handleDelete = async (id) => {
//     Modal.confirm({
//       title: "Are you sure you want to delete this product?",
//       onOk: async () => {
//         try {
//           await axios.delete(`${config.BASE_URL}/api/categories/${id}`);
//           message.success("Category deleted successfully!");
//           fetchCategories();
//         } catch (error) {
//           message.error("Failed to delete category.");
//         }
//       },
//       onCancel: () => {},
//     });
//   };

//   // Open and close modal
//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Row gutter={[16, 16]} justify="center">
//         <Col xs={24} sm={6} md={6} lg={4}>
//           <Sidebar />
//         </Col>

//         <Col xs={24} sm={18} md={12} lg={10}>
//           <Card
//             className={Styles.categorycard}
//             title="Add Category"
//             bordered={false}
//             style={{
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               marginTop: "20px",
//             }}
//           >
//             <Form
//               name="add_category"
//               onFinish={handleSubmit}
//               labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
//               wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
//               initialValues={{ isActive: true }}
//             >
//               <Form.Item
//                 label="Category Name"
//                 name="categoryName"
//                 rules={[
//                   { required: true, message: "Category name is required!" },
//                 ]}
//               >
//                 <Input placeholder="Enter category name" />
//               </Form.Item>
//               <Form.Item
//                 wrapperCol={{ xs: { span: 24 }, sm: { offset: 8, span: 16 } }}
//               >
//                 <Button
//                   className="btn1"
//                   type="primary"
//                   htmlType="submit"
//                   loading={loading}
//                   style={{
//                     marginleft: "500px",
//                   }}
//                 >
//                   Add Category
//                 </Button>
//               </Form.Item>
//             </Form>

//             <Button
//               className="view-categories-button"
//               onClick={showModal}
//               style={{
//                 marginTop: "20px",
//                 width: "100%",
//                 marginleft: "20090px",
//               }}
//             >
//               View Categories
//             </Button>
//           </Card>
//         </Col>
//       </Row>

//       {/* Modal for Viewing Categories */}
//       <Modal
//         title="Categories"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="close" onClick={handleCancel}>
//             Close
//           </Button>,
//         ]}
//         width={800}
//       >
//         <Table
//           columns={columns}
//           dataSource={categories}
//           rowKey="id"
//           pagination={false}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default AddCategory;

import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Sidebar from "../Components/SideBar";
import { useNavigate } from "react-router-dom";
import "../Styles/Page.css";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      alert("Failed to load categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${config.BASE_URL}/api/categories`, {
        categoryName,
      });
      if (response.status === 200) {
        alert("Category added successfully!");
        setCategories([...categories, response.data]);
        fetchCategories();
        setCategoryName(""); // Reset the input field
      }
    } catch (error) {
      alert("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${config.BASE_URL}/api/categories/${id}`);
        alert("Category deleted successfully!");
        fetchCategories();
      } catch (error) {
        alert("Failed to delete category.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
          <Sidebar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="card-title mb-0">Add Category</h4>
            </div>

            <form onSubmit={handleSubmit}>
              <br />
              <div className="d-flex align-items-center mb-3">
                <label
                  htmlFor="categoryName"
                  className="form-label me-2 label-required"
                >
                  Category Name<span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  style={{ maxWidth: "300px" }}
                />
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Category"}
              </button>
              <button
                className="btn btn-secondary w-100"
                onClick={() => setIsModalVisible(true)}
              >
                View Categories
              </button>
            </form>
          </div>

          {/* Modal for Viewing Categories */}
          {isModalVisible && (
            <div className="custom-modal">
              <div className="custom-modal-content">
                <h5>Categories</h5>
                <button
                  className="btn-close float-end"
                  onClick={() => setIsModalVisible(false)}
                ></button>
                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Category Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.categoryName}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(category.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="btn btn-secondary w-100 mt-3"
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
