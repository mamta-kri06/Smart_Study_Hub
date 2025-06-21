import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import "../styles/Login.css"; // ✅ Ensure this path is correct

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Invalid username or password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center">
      {loading && <Spinner />}
      <div className="login-card shadow p-4">
        <h2 className="text-center mb-4">Register</h2>

        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>

          <button className="btn btn-primary w-100 mt-2" type="submit">
            Register
          </button>

          <div className="text-center mt-3">
            <span className="notauser">Already registered?</span>
            <Link to="/login" className="register-link">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
