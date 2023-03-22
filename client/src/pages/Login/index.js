import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetButtonLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];
function Login() {
  const { buttonLoading } = useSelector((state) => state.loaders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetButtonLoader(true));
      const response = await LoginUser(values);
      dispatch(SetButtonLoader(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetButtonLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary flex justify-center items-center">
        <div className="text-white border-l-gray-300  border-0 border-solid px-5">
          <h1 className="text-7xl">SHEY-TRACKER</h1>
          <h1>One Stop Solution for all your business needs </h1>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-white p-5 rounded w-[450px]">
          <h1 className="text-primary text-2xl">LOGIN TO YOUR ACCOUNT</h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={rules}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules}>
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-2"
              loading={buttonLoading}
            >
              Login
            </Button>

            <div className="mt-5 text-center">
              <span className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
