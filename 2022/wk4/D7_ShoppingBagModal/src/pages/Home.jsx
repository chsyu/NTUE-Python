import { Layout } from 'antd';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductList from "../components/ProductList";
import { selectProducts } from "../redux/productsSlice";
const { Header, Content, Footer } = Layout;

function Home() {
  let products = useSelector(selectProducts);
  const { categoryName } = useParams();
  const url = categoryName || "/";
  if (url != "/")
    products = products.filter(x => x?.category.toUpperCase() === url.toUpperCase());

  const title = url === "/"
    ? "NORDIC NEST Shopping Cart"
    : products[0]?.category.toUpperCase();

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
