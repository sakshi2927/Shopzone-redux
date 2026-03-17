import { memo } from 'react';

function CartPanel({ cartItems, cartTotal, onRemove }) {
  return (
    <aside className="panel">
      <h2>Cart ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <div className="empty-state">Your cart is empty.</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <div>
                  ${item.price} x {item.quantity}
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">Total: ${cartTotal.toFixed(2)}</div>
        </>
      )}
    </aside>
  );
}

export default memo(CartPanel);
