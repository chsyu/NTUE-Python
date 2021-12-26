import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { login, rememberLoginUser } from "../actions/userActions";

const LoginCard = ({ redirect }) => {
  const { userInfo, loading, error, remember } = useSelector(
    (state) => state.userSignin
  );
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const history = useHistory();

  // const onFinishFailed = () => {
  //   console.log("Failed: ", error);
  // };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      await dispatch(login(values));
    } catch (e) {
      console.log(e)
    }

  };

  const onChange = (e) => {
    dispatch(rememberLoginUser(e.target.checked));
  };  


  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      name="normal_login"
      className="login-form"
      form={form}
      initialValues={{
        remember: true,
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
          <Checkbox onChange={onChange} checked={remember}>
            Remember me
          </Checkbox>
        </Form.Item>

        <Link className="login-form__forgot" to={"/"}>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        {loading ? (
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
        Or <Link to={"/register?redirect=shipping"}>register now!</Link>
        {error === "" ? (
          <></>
        ) : (
          <div className="login-form__error-wrap">
            <h3 className="login-form__error-title">
              <WarningOutlined className="site-form-item-icon" />
              {"  "}There was a problem
            </h3>
            <p className="login-form__error-message">{error}</p>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};;
export default LoginCard;
