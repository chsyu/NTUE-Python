import { useState } from "react";
import { Row, Col, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import AddToCart from "./AddToCart"
import { selectIsLoading } from "../redux/productsSlice";

const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

function ProductDetail({ product }) {
   const [qty, setQty] = useState(product.countInStock > 0 ? 1 : 0);
   const isLoading = useSelector(selectIsLoading);

   return (
      <>
         {isLoading ? (
            <div className="spinner-wrap">
               <Spin indicator={antIcon} className="spinner" />
            </div>
         ) : (
            <Row gutter={[32, 32]}>
               <Col xs={{ span: 20, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                  <img
                     alt={product.name}
                     className="product-image"
                     src={product.image}
                  />
               </Col>
               <Col xs={{ span: 20, offset: 2 }} lg={{ span: 14, offset: 0 }} >
                  <div className="product-info--detail">
                     <h2 className="product-category">
                        {product.category}
                     </h2>
                     <h1 className="product-name product-name--large">
                        {product.name}
                     </h1>
                     <p className="product-description">{product.description_long}</p>
                     <div className="product-price-wrap">
                        <p className="product-price product-price--large">
                           US${product.price}.00
                        </p>
                        <p className="product-status">
                           Status: {product.countInStock > 0 ? "In Stock" : "Unavailable."}
                        </p>
                        <div className="product-qty">
                           Qty: {"   "}
                           <Select
                              defaultValue={qty}
                              className="select-style"
                              onChange={val => setQty(val)}
                           >
                              {[...Array(product.countInStock).keys()].map((x) => (
                                 <Option key={x + 1} value={x + 1}>
                                    {x + 1}
                                 </Option>
                              ))}
                           </Select>
                        </div>
                        <p className="product-qty">
                           Total Price: {product.price * qty}
                        </p>
                        <AddToCart product={product} qty={qty} />
                     </div>
                  </div>
               </Col>
            </Row>
         )}
      </>);
}

export default ProductDetail;