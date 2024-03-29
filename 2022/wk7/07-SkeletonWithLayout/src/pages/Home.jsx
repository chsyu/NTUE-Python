import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductList from "../components/ProductList";
import { useProducts } from '../react-query';
const { Header, Content, Footer } = Layout;

let contentForSkeleton = [];
for(let i = 0; i < 11; i ++)
  contentForSkeleton.push({id: i})


function Home() {

  const { categoryName } = useParams();
  const url = categoryName || "";
  const { data, isLoading } = useProducts(url);
  const products = data?.data || contentForSkeleton;
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
