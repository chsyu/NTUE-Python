
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductDetail from "../components/ProductDetail";
import { getProductById } from "../api"

const { Header, Content, Footer } = Layout;

function Product() {
   const { productId } = useParams();
   const { data, isLoading } = useQuery([productId], getProductById)
   const product = data || {};

   return (
      <Layout className="container main-layout">
         <Header className="layout-header">
            <AppHeader title="Product Detail" />
         </Header>
         <Content className="layout-content">
            <ProductDetail product={product} isLoading={isLoading} />
         </Content>
         <Footer className="layout-footer">
            <AppFooter />
         </Footer>
      </Layout>
   );
}

export default Product;
