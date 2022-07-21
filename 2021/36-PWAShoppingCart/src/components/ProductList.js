import { useSelector } from "react-redux";
import { Row, Col, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products } = useSelector((state) => state.product.page);

  const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

  return (
    <>
      {!products ? (
        <div className="spinner-wrap">
          <Spin indicator={antIcon} className="spinner" />
        </div>
      ) : (
        <Row gutter={[32, 32]}>
          {products.map((product) => (
            <Col
              key={product.id}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              xxl={{ span: 6 }}
            >
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

