
import { useParams } from 'react-router-dom';
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductDetail from "../components/ProductDetail";
import products from "../json/products.json";

function Product() {
   const { productId } = useParams();
   const product = products.find(
      (x) => x.id === productId
   );

   const styles = {
      mainLayout: {
        display: 'grid',
        minHeight: '100vh',
        gridTemplateAreas: `
          'header'
          'content'
          'footer'
        `,
        gridTemplateRows: 'auto auto auto',
        gap: '1em',
      },
      layoutHeader: {
        gridArea: 'header',
        padding: 0,
        height: 'auto',
        lineHeight: 1.6,
        backgroundColor: '#111828',
      },
      layoutFooter: {
        gridArea: 'footer',
        padding: 0,
        height: 'auto',
        lineHeight: 1.6,
        backgroundColor: '#111828',
      },
      layoutContent: {
        gridArea: 'content',
        backgroundColor: '#111828',
      }
    }  

   return (
      <div className="container" style={styles.mainLayout}>
         <Header
            style={styles.layoutHeader}
            title="Product Detail"
         />
         <ProductDetail product={product} style={styles.layoutContent} />
         <Footer style={styles.layoutFooter} />
      </div>
   );
}

export default Product;
