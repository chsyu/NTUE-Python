import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className="nav-bar">
            <NavLink to="/products/category/tableware"
                className={(navData) => (navData.isActive ? 'nav-item nav-item--active' : 'nav-item')}>
                Tableware
            </NavLink>
            <NavLink to="/products/category/cookware"
                className={(navData) => (navData.isActive ? 'nav-item nav-item--active' : 'nav-item')}>
                Cookware
            </NavLink>
            <NavLink to="/products/category/home-accessories"
                className={(navData) => (navData.isActive ? 'nav-item nav-item--active' : 'nav-item')}>
                Home accessories
            </NavLink>
            <NavLink to="/products/category/lighting"
                className={(navData) => (navData.isActive ? 'nav-item nav-item--active' : 'nav-item')}>
                Lighting
            </NavLink>
            <NavLink to="/products/category/textile"
                className={(navData) => (navData.isActive ? 'nav-item nav-item--active' : 'nav-item')}>
                Textile
            </NavLink>
            <NavLink to="/products/category/furniture"
                className={(navData) => (navData.isActive ? 'nav-item nav-item--active' : 'nav-item')}>
                Furniture
            </NavLink>
        </div>
    );
}