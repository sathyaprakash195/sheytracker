import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { SetButtonLoader, SetLoader } from "../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";

const rules = [
  {
    required: true,
    message: "required",
  },
];
function Register() {
  const { buttonLoading } = useSelector((state) => state.loaders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetButtonLoader(true));
      const response = await RegisterUser(values);
      dispatch(SetButtonLoader(false));
      if (response.success) {
        navigate("/login");
        message.success(response.message);
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
    <div className="grid grid-cols-2">
      <div className="h-screen  flex justify-center items-center">
        <div className="bg-white p-5 rounded w-[450px]">
          <h1 className="text-primary text-2xl">LETS GET YOU STARTED</h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={rules}>
              <Input placeholder="Name" />
            </Form.Item>
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
              Register
            </Button>

            <div className="mt-5 text-center">
              <span className="text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
      <div className="bg-primary flex h-screen justify-center items-center">
        <div className="text-white border-l-gray-300  border-0 border-solid px-5">
          <h1 className="text-7xl">SHEY-TRACKER</h1>
          <h1>One Stop Solution for all your business needs </h1>
        </div>
      </div>
    </div>
  );
}

export default Register;
