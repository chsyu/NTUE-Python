import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPage } from "../actions/productActions"

export default function NavItem(props) {
  const { children, to, className, activeClassName, onClose } = props;
  const { navBar } = useSelector(state => state.product);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setPage(to, children));
    onClose && onClose();
  };

  return (
    <Link to={`${to}`}>
      <div
        onClick={onClick}
        className={`
            ${className} 
            ${navBar.activeItem === to ? activeClassName : ""}`}
      >
        {children}
      </div>
    </Link>
  );
}
