import { Row, Col, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../redux/productsSlice";

import ProductItem from "./ProductItem";

export default function ProductList({ products }) {
  const isLoading = useSelector(selectIsLoading);

  return (
    <Skeleton loading={isLoading}>
      <Row gutter={[32, 32]}>
        {products.map(product => (
          <Col
            key={product.id}
            sm={{ span: 12 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
            xxl={{ span: 4 }}
          >
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </Skeleton>
  );
}

