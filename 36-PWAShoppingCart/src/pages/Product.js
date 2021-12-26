import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from 'antd';
import NavBar from "../components/NavBar";
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductDetail from "../components/ProductDetail";
import { setProductDetail } from "../actions/productActions";


const { Header, Content, Footer } = Layout;

function Product({ match }) {

   const { products } = useSelector((state) => state.product.page);
   const dispatch = useDispatch();
   useEffect(() => {
      if(products.length === 0)
      {
         console.log('call setProductDetail from Product Page useEffect')
         dispatch(setProductDetail(match.params.productId, 0))
      }
   }, [])// eslint-disable-line react-hooks/exhaustive-deps

   return (
      <Layout className="container main-layout">
         <Layout className="bg-gray nav-area">
            <NavBar />
         </Layout>
         <Layout className="bg-gray main-area">
            <Header className="layout-header">
               <AppHeader title="Product Detail" />
            </Header>
            <Content className="layout-content">
               <ProductDetail />
            </Content>
            <Footer className="layout-footer">
               <AppFooter />
            </Footer>
         </Layout>
      </Layout>
   );
}

export default Product;
