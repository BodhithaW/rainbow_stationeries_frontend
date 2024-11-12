// import React, { useState, useEffect } from "react";
// import { Form, Input, Button, message, Select, Card } from "antd";
// import axios from "axios";
// import BASE_URL from "../config"; // Ensure you have the BASE_URL configured
// import Sidebar from "../Components/SideBar";

// const { Option } = Select;

// const AddProduct = () => {
//   const [loading, setLoading] = useState(false); // for form submission loading
//   const [categories, setCategories] = useState([]); // to store categories from backend
//   const [isFetchingCategories, setIsFetchingCategories] = useState(true); // for category loading state

//   // Fetch categories from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/categories`);
//         setCategories(response.data); // assuming your API returns an array of categories
//         setIsFetchingCategories(false);
//       } catch (error) {
//         message.error("Failed to load categories.");
//         setIsFetchingCategories(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${BASE_URL}/api/products`, values);
//       if (response.status === 200) {
//         message.success("Product added successfully!");
//       }
//     } catch (error) {
//       message.error("Failed to add product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
//       <div className="d-flex">
//         {/* Sidebar */}
//         <Sidebar />
//       </div>
//       <Card
//         title="Add Product"
//         bordered={false}
//         style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginTop: "20px" }}
//       >
//         <Form
//           onFinish={handleSubmit}
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           initialValues={{
//             isActive: true, // Default value for active status
//           }}
//         >
//           <Form.Item
//             label="Product Name"
//             name="productName"
//             rules={[{ required: true, message: "Product name is required!" }]}
//           >
//             <Input placeholder="Enter product name" />
//           </Form.Item>

//           <Form.Item
//             label="Brand Name"
//             name="brand"
//             rules={[{ required: true, message: "Brand name is required!" }]}
//           >
//             <Input placeholder="Enter brand name" />
//           </Form.Item>

//           {/* Category Dropdown */}
//           <Form.Item
//             label="Category"
//             name="categoryId"
//             rules={[{ required: true, message: "Please select a category!" }]}
//           >
//             <Select
//               placeholder="Select a category"
//               loading={isFetchingCategories}
//               allowClear
//             >
//               {categories.map((category) => (
//                 <Option key={category.id} value={category.id}>
//                   {category.categoryName}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Visibility"
//             name="isActive"
//             valuePropName="checked"
//             rules={[{ required: true }]}
//             wrapperCol={{ offset: 8, span: 16 }}
//           >
//             <Select defaultValue={true}>
//               <Option value={true}>Active</Option>
//               <Option value={false}>Inactive</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Add Product
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default AddProduct;

// import React, { useState, useEffect } from "react";
// import { Form, Input, Button, message, Select, Card, Modal, Table } from "antd";
// import axios from "axios";
// import config from "../config"; // Ensure you have the BASE_URL configured
// import Sidebar from "../Components/SideBar";
// import { useNavigate } from "react-router-dom"; // React Router for navigation
// import "./AddProduct.css"; // Import the CSS file

// const { Option } = Select;

// const AddProduct = () => {
//   const [loading, setLoading] = useState(false); // for form submission loading
//   const [categories, setCategories] = useState([]); // to store categories from backend
//   const [isFetchingCategories, setIsFetchingCategories] = useState(true); // for category loading state
//   const [products, setProducts] = useState([]); // to store products for viewing, updating, and deleting
//   const [isModalVisible, setIsModalVisible] = useState(false); // modal visibility for view/edit
//   const [modalAction, setModalAction] = useState(""); // To track whether modal is for 'view', 'edit' or 'delete'
//   const [currentProduct, setCurrentProduct] = useState(null); // current product being viewed or edited
//   const navigate = useNavigate(); // Hook for navigation

//   // Fetch categories from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/categories`);
//         setCategories(response.data); // assuming your API returns an array of categories
//         setIsFetchingCategories(false);
//       } catch (error) {
//         message.error("Failed to load categories.");
//         setIsFetchingCategories(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/products`);
//         setProducts(response.data); // setting products from the API
//       } catch (error) {
//         message.error("Failed to load products.");
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Handle form submission (Add Product)
//   const handleSubmit = async (values) => {
//     const { productName, brand, categoryName } = values;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/products`,
//         productName,
//         brand,
//         categoryName
//       );
//       if (response.status === 200) {
//         message.success("Product added successfully!");
//         setProducts([...products, response.data]); // Add the new product to the list
//       }
//     } catch (error) {
//       message.error("Failed to add product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open modal for viewing a product
//   const handleViewProduct = (product) => {
//     setModalAction("view");
//     setCurrentProduct(product);
//     setIsModalVisible(true);
//   };

//   // Open modal for editing a product
//   const handleEditProduct = (product) => {
//     setModalAction("edit");
//     setCurrentProduct(product);
//     setIsModalVisible(true);
//   };

//   // Handle update product
//   const handleUpdateProduct = async (values) => {
//     setLoading(true);
//     try {
//       const response = await axios.put(
//         `${config.BASE_URL}/api/products/${currentProduct.id}`,
//         values
//       );
//       if (response.status === 200) {
//         message.success("Product updated successfully!");
//         setProducts(
//           products.map((product) =>
//             product.id === currentProduct.id ? response.data : product
//           )
//         );
//         setIsModalVisible(false); // Close the modal
//         setCurrentProduct(null); // Clear the current product state
//       }
//     } catch (error) {
//       message.error("Failed to update product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete product
//   const handleDeleteProduct = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.delete(
//         `${config.BASE_URL}/api/products/${currentProduct.id}`
//       );
//       if (response.status === 200) {
//         message.success("Product deleted successfully!");
//         setProducts(
//           products.filter((product) => product.id !== currentProduct.id)
//         ); // Remove the deleted product from the list
//         setIsModalVisible(false); // Close the modal
//         setCurrentProduct(null); // Clear the current product state
//       }
//     } catch (error) {
//       message.error("Failed to delete product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle modal cancel
//   const handleCancelModal = () => {
//     setIsModalVisible(false);
//     setCurrentProduct(null);
//   };

//   // Table columns for product listing
//   const columns = [
//     { title: "Product Name", dataIndex: "productName", key: "productName" },
//     { title: "Brand", dataIndex: "brand", key: "brand" },
//     { title: "Category", dataIndex: "categoryName", key: "categoryName" },
//     { title: "Visibility", dataIndex: "isActive", key: "isActive" },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <span>
//           <Button onClick={() => handleViewProduct(record)}>View</Button>
//           <Button
//             onClick={() => handleEditProduct(record)}
//             style={{ marginLeft: "8px" }}
//           >
//             Edit
//           </Button>
//           <Button
//             onClick={() => handleViewProduct(record)} // Use the same View button for delete confirmation
//             style={{ marginLeft: "8px" }}
//             danger
//           >
//             Delete
//           </Button>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div className="container">
//       <Sidebar />
//       <div className="content">
//         <Card
//           title="Add Product"
//           bordered={false}
//           style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
//         >
//           <Form
//             onFinish={handleSubmit}
//             layout="horizontal"
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 14 }}
//             initialValues={{
//               isActive: true, // Default value for active status
//             }}
//           >
//             <Form.Item
//               label="Product Name"
//               name="productName"
//               rules={[{ required: true, message: "Product name is required!" }]}
//             >
//               <Input placeholder="Enter product name" />
//             </Form.Item>

//             <Form.Item
//               label="Brand Name"
//               name="brand"
//               rules={[{ required: true, message: "Brand name is required!" }]}
//             >
//               <Input placeholder="Enter brand name" />
//             </Form.Item>

//             <Form.Item
//               label="Category"
//               name="categoryId"
//               rules={[{ required: true, message: "Please select a category!" }]}
//             >
//               <Select
//                 placeholder="Select a category"
//                 loading={isFetchingCategories}
//                 allowClear
//               >
//                 {categories.map((category) => (
//                   <Option key={category.id} value={category.id}>
//                     {category.categoryName}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {/* <Form.Item
//               label="Visibility"
//               name="isActive"
//               valuePropName="checked"
//               rules={[{ required: true }]}
//             >
//               <Select defaultValue={true}>
//                 <Option value={true}>Active</Option>
//                 <Option value={false}>Inactive</Option>
//               </Select>
//             </Form.Item> */}

//             <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
//               <Button type="primary" htmlType="submit" loading={loading}>
//                 Add Product
//               </Button>
//             </Form.Item>
//           </Form>

//           {/* Add a button for viewing products */}
//           <Button
//             type="default"
//             style={{ marginTop: "20px" }}
//             onClick={() => navigate("/products")} // Navigate to products list page
//           >
//             View Products
//           </Button>
//         </Card>

//         <Table
//           dataSource={products}
//           columns={columns}
//           rowKey="id"
//           style={{ marginTop: "20px" }}
//         />

//         {/* Modal for View/Edit/Delete Product */}
//         <Modal
//           title={
//             modalAction === "edit"
//               ? "Edit Product"
//               : modalAction === "view"
//               ? "View Product"
//               : "Delete Product"
//           }
//           visible={isModalVisible}
//           onCancel={handleCancelModal}
//           footer={null}
//           width={600}
//         >
//           {modalAction !== "delete" && (
//             <Form initialValues={currentProduct} onFinish={handleUpdateProduct}>
//               <Form.Item label="Product Name" name="productName">
//                 <Input
//                   placeholder="Product Name"
//                   disabled={modalAction === "view"}
//                 />
//               </Form.Item>

//               <Form.Item label="Brand" name="brand">
//                 <Input
//                   placeholder="Brand Name"
//                   disabled={modalAction === "view"}
//                 />
//               </Form.Item>

//               <Form.Item label="Category" name="categoryId">
//                 <Select disabled={modalAction === "view"}>
//                   {categories.map((category) => (
//                     <Option key={category.id} value={category.id}>
//                       {category.categoryName}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>

//               <Form.Item
//                 label="Visibility"
//                 name="isActive"
//                 valuePropName="checked"
//               >
//                 <Select disabled={modalAction === "view"}>
//                   <Option value={true}>Active</Option>
//                   <Option value={false}>Inactive</Option>
//                 </Select>
//               </Form.Item>

//               {modalAction === "edit" && (
//                 <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
//                   <Button type="primary" htmlType="submit" loading={loading}>
//                     Update Product
//                   </Button>
//                 </Form.Item>
//               )}
//             </Form>
//           )}

//           {modalAction === "delete" && (
//             <div>
//               <p>Are you sure you want to delete this product?</p>
//               <Button
//                 onClick={handleDeleteProduct}
//                 type="danger"
//                 loading={loading}
//               >
//                 Delete
//               </Button>
//               <Button
//                 style={{ marginLeft: "8px" }}
//                 onClick={handleCancelModal}
//                 loading={loading}
//               >
//                 Cancel
//               </Button>
//             </div>
//           )}
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// import React, { useState, useEffect } from "react";
// import { Form, Input, Button, message, Select, Card, Modal, Table } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import axios from "axios";
// import config from "../config";
// import Sidebar from "../Components/SideBar";
// import "./AddProduct.css";

// const { Option } = Select;

// const AddProduct = () => {
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isFetchingCategories, setIsFetchingCategories] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/categories`);
//         setCategories(response.data);
//         setIsFetchingCategories(false);
//       } catch (error) {
//         message.error("Failed to load categories.");
//         setIsFetchingCategories(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${config.BASE_URL}/api/products`);
//       setProducts(response.data);
//     } catch (error) {
//       message.error("Failed to load products.");
//     }
//   };

//   // Add Product
//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/products`,
//         values
//       );
//       if (response.status === 200) {
//         message.success("Product added successfully!");
//         setProducts([...products, response.data]);
//       }
//     } catch (error) {
//       message.error("Failed to add product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit Product
//   const handleEditProduct = (product) => {
//     // Set up the form to edit the selected product (show modal or form pre-filled with product data)
//     console.log("Editing product:", product);
//     // You can implement form pre-filling and handle the submission to update the product here
//   };

//   // Delete Product
//   const handleDeleteProduct = async (productId) => {
//     try {
//       await axios.delete(`${config.BASE_URL}/api/products/${productId}`);
//       message.success("Product deleted successfully!");
//       setProducts(products.filter((product) => product.id !== productId));
//     } catch (error) {
//       message.error("Failed to delete product.");
//     }
//   };

//   // View Products
//   const handleViewProducts = () => {
//     fetchProducts();
//     setIsModalVisible(true);
//   };

//   // Close Modal
//   const handleCancelModal = () => {
//     setIsModalVisible(false);
//   };

//   // Table columns with edit and delete icons
//   const columns = [
//     { title: "Product Name", dataIndex: "productName", key: "productName" },
//     { title: "Brand", dataIndex: "brand", key: "brand" },
//     { title: "Category", dataIndex: "categoryName", key: "categoryName" },
//     { title: "Visibility", dataIndex: "isActive", key: "isActive" },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, product) => (
//         <>
//           <EditOutlined
//             style={{ color: "blue", marginRight: 16 }}
//             onClick={() => handleEditProduct(product)}
//           />
//           <DeleteOutlined
//             style={{ color: "red" }}
//             onClick={() => handleDeleteProduct(product.id)}
//           />
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="container">
//       <Sidebar />
//       <div className="content">
//         <Card
//           title="Add Product"
//           bordered={false}
//           style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
//         >
//           <Form
//             onFinish={handleSubmit}
//             layout="horizontal"
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 14 }}
//             initialValues={{ isActive: true }}
//           >
//             <Form.Item
//               label="Product Name"
//               name="productName"
//               rules={[{ required: true, message: "Product name is required!" }]}
//             >
//               <Input placeholder="Enter product name" />
//             </Form.Item>
//             <Form.Item
//               label="Brand Name"
//               name="brand"
//               rules={[{ required: true, message: "Brand name is required!" }]}
//             >
//               <Input placeholder="Enter brand name" />
//             </Form.Item>
//             <Form.Item
//               label="Category"
//               name="categoryId"
//               rules={[{ required: true, message: "Please select a category!" }]}
//             >
//               <Select
//                 placeholder="Select a category"
//                 loading={isFetchingCategories}
//                 allowClear
//               >
//                 {categories.map((category) => (
//                   <Option key={category.id} value={category.id}>
//                     {category.categoryName}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
//               <Button type="primary" htmlType="submit" loading={loading}>
//                 Add Product
//               </Button>
//             </Form.Item>
//           </Form>
//           <Button
//             className="view-btn"
//             type="default"
//             style={{ marginTop: "20px" }}
//             onClick={handleViewProducts}
//           >
//             View Products
//           </Button>
//         </Card>

//         {/* Modal for Product Table */}
//         <Modal
//           title="Products"
//           visible={isModalVisible}
//           onCancel={handleCancelModal}
//           footer={[
//             <Button key="close" onClick={handleCancelModal}>
//               Close
//             </Button>,
//           ]}
//           width={800}
//         >
//           <Table dataSource={products} columns={columns} rowKey="id" />
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Select, Card, Modal, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../config";
import Sidebar from "../Components/SideBar";
import "../Styles/AddProduct.css";

const { Option } = Select;

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/categories`);
        setCategories(response.data);
        setIsFetchingCategories(false);
      } catch (error) {
        message.error("Failed to load categories.");
        setIsFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      message.error("Failed to load products.");
    }
  };

  // Add Product
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/products`,
        values
      );
      if (response.status === 200) {
        message.success("Product added successfully!");
        setProducts([...products, response.data]);
      }
    } catch (error) {
      message.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  // Edit Product
  const handleEditProduct = (product) => {
    console.log("Editing product:", product);
  };

  // Delete Product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/products/${productId}`);
      message.success("Product deleted successfully!");
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      message.error("Failed to delete product.");
    }
  };

  // View Products
  const handleViewProducts = () => {
    fetchProducts();
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  // Table columns with edit and delete icons
  const columns = [
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "categoryName", key: "categoryName" },
    { title: "Visibility", dataIndex: "isActive", key: "isActive" },
    {
      title: "Actions",
      key: "actions",
      render: (_, product) => (
        <>
          <EditOutlined
            style={{ color: "blue", marginRight: 16 }}
            onClick={() => handleEditProduct(product)}
          />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => handleDeleteProduct(product.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Card
          title="Add Product"
          bordered={false}
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <Form
            onFinish={handleSubmit}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ isActive: true }}
          >
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[{ required: true, message: "Product name is required!" }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item
              label="Brand Name"
              name="brand"
              rules={[{ required: true, message: "Brand name is required!" }]}
            >
              <Input placeholder="Enter brand name" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select
                placeholder="Select a category"
                loading={isFetchingCategories}
                allowClear
              >
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.categoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Product
              </Button>
            </Form.Item>
          </Form>
          <Button
            className="view-btn"
            type="default"
            style={{ marginTop: "20px" }}
            onClick={handleViewProducts}
          >
            View Products
          </Button>
        </Card>

        {/* Modal for Product Table */}
        <Modal
          title="Products"
          visible={isModalVisible}
          onCancel={handleCancelModal}
          footer={[
            <Button key="close" onClick={handleCancelModal}>
              Close
            </Button>,
          ]}
          width={800}
          className="product-modal"
        >
          <Table
            dataSource={products}
            columns={columns}
            rowKey="id"
            className="responsive-table"
          />
        </Modal>
      </div>
    </div>
  );
};

export default AddProduct;
