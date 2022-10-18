import { Layout } from "antd";
import { useSearchParams } from 'react-router-dom';

import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import LoginCard from "../components/LoginCard";

const { Header, Content, Footer } = Layout;

function Login() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
        <Header className="layout-header">
          <AppHeader title="Login Page" />
        </Header>
        <Content className="layout-content">
          <LoginCard redirect={redirect} />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Login;
