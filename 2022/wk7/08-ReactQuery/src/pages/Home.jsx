import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductList from "../components/ProductList";
import { getProducts } from "../api";
const { Header, Content, Footer } = Layout;

function Home() {

  const { categoryName } = useParams();
  const url = categoryName || "";
  const { data, isLoading } = useQuery([url], getProducts)
  const products = data?.data || [];
  const title = url === ""
    ? "NORDIC NEST Shopping Cart"
    : products[0]?.category.toUpperCase();

  return (
    <Layout className="container main-layout">
      <Header className="layout-header">
        <AppHeader title={title} isLoading={isLoading} />
      </Header>
      <Content className="layout-content">
        <ProductList products={products} isLoading={isLoading} />
      </Content>
      <Footer className="layout-footer">
        <AppFooter />
      </Footer>
    </Layout>
  );
}

export default Home;
