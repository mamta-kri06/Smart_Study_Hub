import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Login.css"; // Make sure this path is correct

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          _id: data.user._id,
        })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      {loading && <Spinner />}
      <div className="card login-card shadow p-4">
        <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <button className="btn btn-primary w-100 " type="submit">
            Login
          </button>

          <div className="text-center mt-3 notauser">
            Not a user?
            <Link
              to="/register"
              className="fw-semibold text-decoration-none register-link"
            >
              Register here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
