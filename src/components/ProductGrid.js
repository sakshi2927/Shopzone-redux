import { memo } from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ products, cartItemIds, onAddToCart, onRemoveFromCart }) {
  return (
    <section className="panel">
      <h2>Products ({products.length})</h2>

      {products.length === 0 ? (
        <div className="empty-state">No products match your filters.</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inCart={cartItemIds.has(product.id)}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default memo(ProductGrid);
