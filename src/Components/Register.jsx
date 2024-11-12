// import React, { useState } from "react";
// import AuthService from "./AuthService";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [role, setRole] = useState("ref"); // Default role set to "ref"
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await AuthService.register(username, password, role);
//       navigate("/login");
//     } catch (error) {
//       setError("Registration failed. Try again.");
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Register</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="admin">Admin</option>
//           <option value="ref">Ref</option>
//         </select>
//         <button type="submit">Register</button>
//       </form>
//       <p>
//         Already have an account? <a href="/login">Login here</a>
//       </p>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import AuthService from "./AuthService";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import Sidebar from "./SideBar";
import "../Styles/AuthStyles.css";

const { Option } = Select;

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const { username, password, role } = values;
    try {
      await AuthService.register(username, password, role);
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-form">
      <Sidebar />
      <h2>User Register</h2>
      {error && <p className="error">{error}</p>}
      <Form
        name="register"
        onFinish={handleRegister}
        initialValues={{
          role: "ref", // Default role
        }}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Username is required!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="ref">Ref</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
