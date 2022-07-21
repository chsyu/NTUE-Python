import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { setPage } from "../actions/productActions"

export default function ShippingHeader(props) {
  const dispatch = useDispatch();

  const history = useHistory();

  const onClickHeader = () => {
    dispatch(setPage("/",  "NORDIC NEST Shopping Cart"));
    history.push("/");
  };

  return (
    <header className="header">
      <div className="header-wrap">
        <div className="header-text">
          <h1 className="header-title" onClick={onClickHeader}>{props.title}</h1>
        </div>
      </div>

      <CheckoutSteps {...props}></CheckoutSteps>
    </header>
  );
}
