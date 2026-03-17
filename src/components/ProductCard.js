import { memo } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, inCart, onAddToCart, onRemoveFromCart }) {
  const title = product.title ?? product.name;

  return (
    <article className="product-card">
      <img
        src={product.thumbnail ?? product.image}
        alt={title}
        className="product-image"
        loading="lazy"
      />

      <h3>{title}</h3>
      <div className="product-meta">
        <span>{product.category}</span>
        <span>${product.price}</span>
      </div>

      <Link className="btn btn-secondary" to={`/product/${product.id}`}>
        View Details
      </Link>

      {inCart ? (
        <button className="btn btn-danger" onClick={() => onRemoveFromCart(product.id)}>
          Remove from cart
        </button>
      ) : (
        <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
          Add to cart
        </button>
      )}
    </article>
  );
}

export default memo(ProductCard);
