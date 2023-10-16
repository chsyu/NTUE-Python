import { Button } from "antd"

export default function AddToCart() {
  const btn = {
    height: 'auto',
    fontSize: '1.2rem',
    padding: '0.5rem 2rem',
  }

  return (
    <Button type="primary" style={btn}>
      Add To Cart
    </Button>
  );
}
