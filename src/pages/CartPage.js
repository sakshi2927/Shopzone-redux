import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartPanel from '../components/CartPanel';
import { removeFromCart, selectCartItems, selectCartTotal } from '../features/cart/cartSlice';

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <section className="panel page-card">
      <h2>Your Cart</h2>
      <CartPanel cartItems={cartItems} cartTotal={cartTotal} onRemove={(id) => dispatch(removeFromCart(id))} />

      <div className="hero-actions">
        <Link className="btn btn-secondary" to="/shop">
          Continue Shopping
        </Link>
        <Link className="btn btn-primary" to="/checkout">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}

export default CartPage;
