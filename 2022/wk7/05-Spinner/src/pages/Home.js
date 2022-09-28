import { useEffect } from 'react';
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
  let title = "NORDIC NEST Shopping Cart";
  let url = "/";
  let filterProducts = products || [];
  if(!!categoryName) {
    url = categoryName;
    filterProducts = products.filter(
      product => product.category.toUpperCase() == categoryName.toUpperCase());
    if(!filterProducts) filterProducts = [];
    if(filterProducts.length)
      title = filterProducts[0].category.toUpperCase();
  }

  useEffect(() => {
    dispatch(getProductsAsync(url));
  }, [categoryName])


  return (
    <Layout className="container main-layout">
      <Header className="layout-header">
        <AppHeader title={title}/>
      </Header>
      <Content className="layout-content">
        <ProductList products={filterProducts}/>
      </Content>
      <Footer className="layout-footer">
        <AppFooter/>  
      </Footer>      
    </Layout>
  );
}

export default Home;
