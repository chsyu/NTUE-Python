import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { login, setUser, setError, remember } from "../redux/usersSlice";
import { useSignInWithEmailPassword } from "../react-query";
import { selectUserInfo, selectIsRemember } from "../redux/usersSlice";

const LoginCard = ({ redirect }) => {
  const userInfo = useSelector(selectUserInfo);
  // const isLoading = useSelector(selectIsLoading);
  // const error = useSelector(selectError);
  const { mutate, isLoading, data, error } = useSignInWithEmailPassword();
  const isRemember = useSelector(selectIsRemember);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();


  // const onFinishFailed = () => {
  //   console.log("Failed: ", error);
  // };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    mutate(values);
  };

  const onChange = (e) => {
    dispatch(remember(e.target.checked));
  };

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      name="normal_login"
      className="login-form"
      form={form}
      initialValues={{
        isRemember: true,
      }}
      onFinish={onFinish}
    // onFihishFailed={onFinishFailed}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
        hasFeedback
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="E-Mail"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox onChange={onChange} checked={isRemember}>
            Remember me
          </Checkbox>
        </Form.Item>

        <Link className="login-form__forgot" to={"/"}>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        {isLoading ? (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
            loading
          >
            Log in
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
          >
            Log in
          </Button>
        )}
        Or <Link to={`/auth/register?redirect=${redirect}`}>register now!</Link>
        { !error ? (
          <></>
        ) : (
          <div className="login-form__error-wrap">
            <h3 className="login-form__error-title">
              <WarningOutlined className="site-form-item-icon" />
              {"  "}There was a problem
            </h3>
            <p className="login-form__error-message">{error.message}</p>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};;
export default LoginCard;
