import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { logout, updateUserInfo } from "../actions/userActions";

const ProfileCard = () => {

  const { userInfo } = useSelector((state) => state.userSignin);
  const { username, access_token, user_id } = userInfo;
  const address = userInfo.address || '';
  const tel = userInfo.tel || '';
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  const handleUpdate = (values) => {
    dispatch(updateUserInfo({ ...values, access_token, user_id }));
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <Form
      onFinish={handleUpdate}
      name="normal_login"
      className="login-form"
      form={form}
      initialValues={userInfo}
    >
      <Form.Item
        label="Name: "
        name="username"
        rules={[
          {
            type: "string",
            message: "The input is not valid name!",
          },
          {
            message: "Please input your name!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder={username} />
      </Form.Item> 
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="rePassword"
        label="Re-enter Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            message: "Please re-enter your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Address: "
        name="address"
        rules={[
          {
            type: "string",
            message: "The input is not valid address!",
          },
          {
            message: "Please input your address!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder={address} />
      </Form.Item>
      <Form.Item
        label="Tel: "
        name="tel"
        rules={[
          {
            type: "string",
            message: "The input is not valid tel!",
          },
          {
            message: "Please input your phone number!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder={tel} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form__button">
          Submit
        </Button>

        <Button
          type="danger"
          style={{ marginTop: "0.8rem" }}
          className="login-form__button"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Form.Item>
    </Form>
  );
};


export default ProfileCard;
