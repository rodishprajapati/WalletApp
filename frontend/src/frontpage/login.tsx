import { Button, FormProps, Input } from "antd";
import Form from "antd/es/form/Form";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:8001/users/login",
        values
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
      console.log("successfully loggedIn");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-black-700 ">hello</div>
      <div className="bg-red-800 p-10">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div>
          Don't Have an Account? <br />
          <Link to={"/signup"}>Create New Account</Link>
        </div>
      </div>
    </>
  );
};
export default Login;
