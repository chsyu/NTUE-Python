
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { selectProduct, getProductByIdAsync } from "../redux/productsSlice";
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductDetail from "../components/ProductDetail";

const { Header, Content, Footer } = Layout;

function Product() {
   const { productId } = useParams();
   const dispatch = useDispatch();
   const product = useSelector(selectProduct);

   useEffect(() => {
      dispatch(getProductByIdAsync(productId));
   }, [productId, dispatch])

   return (
      <Layout className="container main-layout">
         <Header className="layout-header">
            <AppHeader title="Product Detail"/>
         </Header>
         <Content className="layout-content">
            <ProductDetail product = {product} />
         </Content>
         <Footer className="layout-footer">
            <AppFooter />
         </Footer>
      </Layout>
   );
}

export default Product;
