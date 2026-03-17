import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSlice';
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from '../features/auth/authSlice';
import { selectTheme, toggleTheme } from '../features/theme/themeSlice';

function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const theme = useSelector(selectTheme);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleThemeToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className="navbar panel">
      <NavLink className="brand" to="/">
        ShopZone
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/cart" className="cart-link">
          Cart <span className="badge">{cartCount}</span>
        </NavLink>
      </nav>

      <div className="nav-actions">
        <button className="btn btn-secondary" onClick={handleThemeToggle}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>

        {isAuthenticated ? (
          <>
            <span className="user-pill">Hi, {user?.name ?? 'Guest'}</span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink className="btn btn-primary" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Navbar;
