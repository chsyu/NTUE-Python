import { useEffect, useLayoutEffect } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductList from "../components/ProductList";
import { selectProducts, getProductsAsync } from "../redux/productsSlice";
const { Header, Content, Footer } = Layout;

function Home() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const url = categoryName || "";

  const title = url === ""
    ? "NORDIC NEST Shopping Cart"
    : products[0]?.category.toUpperCase();

  useLayoutEffect(() => {
    dispatch(getProductsAsync(url));
  }, [url, dispatch])

  return (
    <Layout className="container main-layout">
      <Header className="layout-header">
        <AppHeader title={title} />
      </Header>
      <Content className="layout-content">
        <ProductList products={products} />
      </Content>
      <Footer className="layout-footer">
        <AppFooter />
      </Footer>
    </Layout>
  );
}

export default Home;
