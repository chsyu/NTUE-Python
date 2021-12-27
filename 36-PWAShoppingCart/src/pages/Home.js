import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from 'antd';

import NavBar from "../components/NavBar";
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductList from "../components/ProductList";
import { getTitle } from "../utils";
import { setPage } from "../actions/productActions";

const { Header, Content, Footer } = Layout;

function Home() {

  const { products, title } = useSelector((state) => state.product.page);
  const dispatch = useDispatch();

  useEffect(() => {
    if( products.length === 0 )
    {
      const url = window.location.pathname;
      dispatch(setPage(url, getTitle(url)))
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Layout className="container main-layout">
      <Layout className="bg-gray nav-area">
        <NavBar />
      </Layout>
      <Layout className="bg-gray main-area">
        <Header className="layout-header">
          <AppHeader title={title} />
        </Header>
        <Content className="layout-content">
          <ProductList />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
