// import React, { useState } from "react";
// import { Form, Input, Button, message, Card } from "antd"; // Import Card
// import axios from "axios";
// import BASE_URL from "../config";
// import Sidebar from "../Components/SideBar";
// import { useNavigate } from "react-router-dom";
// import "./page.css";

// const AddCategory = () => {
//   const [loading, setLoading] = useState(false);

//   // Handle form submission
//   const handleSubmit = async (values) => {
//     const { categoryName } = values;
//     setLoading(true);
//     try {
//       const response = await axios.post(`${BASE_URL}/api/categories`, {
//         categoryName,
//         // Make sure the isActive value is sent in the request
//       });

//       // Handle success response
//       if (response.status === 200) {
//         message.success("Category added successfully!");
//       }
//     } catch (error) {
//       // Handle error response
//       message.error("Failed to add category. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const navigate = useNavigate();

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
//       <div className="d-flex">
//         {/* Sidebar */}
//         <Sidebar />
//       </div>
//       <div>
//         <Button
//           onClick={() => navigate("/viewcategories")}
//           style={{ marginBottom: "50px", marginLeft: "900px" }}
//         >
//           View Categories
//         </Button>
//       </div>
//       <Card
//         title="Add Category"
//         bordered={false}
//         style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginTop: "20px" }}
//       >
//         <Form
//           name="add_category"
//           onFinish={handleSubmit}
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           initialValues={{
//             isActive: true, // Default value
//           }}
//         >
//           <Form.Item
//             label="Category Name"
//             name="categoryName"
//             rules={[{ required: true, message: "Category name is required!" }]}
//           >
//             <Input placeholder="Enter category name" />
//           </Form.Item>

//           {/* <Form.Item label="Active" name="isActive" valuePropName="checked">
//             <Checkbox>Active</Checkbox>
//           </Form.Item> */}

//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Add Category
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default AddCategory;

import React, { useState } from "react";
import { Form, Input, Button, message, Card, Row, Col } from "antd";
import axios from "axios";
import config from "../config";
import Sidebar from "../Components/SideBar";
import { useNavigate } from "react-router-dom";

import "../Styles/page.css";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (values) => {
    const { categoryName } = values;
    setLoading(true);
    try {
      const response = await axios.post(`${config.BASE_URL}/api/categories`, {
        categoryName,
      });
      if (response.status === 200) {
        message.success("Category added successfully!");
        setCategories([...categories, response.dara]);
        navigate("/viewcategories"); // Redirect to view categories page after adding
      }
    } catch (error) {
      message.error("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} justify="center">
        {/* Sidebar in the header on mobile */}
        <Col xs={24} sm={6} md={6} lg={4}>
          <Sidebar />
        </Col>

        {/* Main content card */}
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
                rules={[
                  { required: true, message: "Category name is required!" },
                ]}
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
              onClick={() => navigate("/viewcategories")}
              style={{ marginBottom: "20px", width: "100%" }}
            >
              View Categories
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddCategory;
