import { Row, Col } from "antd";
import AddToCart from "./AddToCart"

function ProductDetail({ product }) {

   const styles = {
      image: {
         width: '100%',
         height: '24rem',
         objectFit: 'cover',
         objectPosition: 'center',
         borderRadius: '2%',
         marginBottom: 0,
         paddingBottom: 0,
      },
      info: {
         padding: '0 1.2rem',
      },
      category: {
         color: 'white',
         opacity: 0.4,
         marginBottom: '0.2rem',
      },
      name: {
         color: 'white',
         marginBottom: '0.5rem',
         fontSize: '1.5rem',
      },
      description: {
         color: 'white',
         opacity: 0.6,
         fontSize: '1rem',
         marginBottom: '1rem',
      },
      wrap: {
         display: 'flex',
         flexDirection: 'column',
      },
      price: {
         fontSize: '1.5rem',
      },

   }

   return (
      <Row gutter={[32, 32]}
         style={{justifyContent: 'center'}}
      >
         <Col 
            xs={{ span: 24 }} 
            lg={{ span: 6 }} 
         >
            <img
               alt={product.name}
               style={styles.image}
               src={product.image}
            />                          
         </Col>
         <Col 
            xs={{ span: 24 }} 
            lg={{ span: 14 }} 
         >
            <div style={styles.info} >
               <h2 style={styles.category} >
                  {product.category}
               </h2>
               <h1 style={styles.name} >
                  {product.name}
               </h1>
               <p style={styles.description}>
                  {product.description_long}
               </p>
               <div style={styles.wrap}>
                  <p style={styles.price} >
                     US${product.price}.00
                  </p>
                  <AddToCart />
               </div>
            </div>           
         </Col>
      </Row>         
   );
}

export default ProductDetail;