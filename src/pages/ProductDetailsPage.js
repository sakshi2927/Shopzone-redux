import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart, removeFromCart, selectCartItems } from '../features/cart/cartSlice';

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Product not found.');
        }

        const data = await response.json();
        setProduct(data);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Failed to load product details.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  const inCart = useMemo(() => {
    return cartItems.some((item) => item.id === Number(id));
  }, [cartItems, id]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      dispatch(addToCart(product));
    }
  }, [dispatch, product]);

  const handleRemoveFromCart = useCallback(() => {
    dispatch(removeFromCart(Number(id)));
  }, [dispatch, id]);

  if (loading) {
    return <section className="panel page-card">Loading product details...</section>;
  }

  if (error || !product) {
    return <section className="panel page-card error-text">{error || 'Product not found.'}</section>;
  }

  return (
    <section className="panel product-detail page-card">
      <img src={product.thumbnail} alt={product.title} className="detail-image" />

      <div>
        <p className="eyebrow">{product.category}</p>
        <h2>{product.title}</h2>
        <p className="detail-price">${product.price}</p>
        <p>{product.description}</p>

        <div className="hero-actions">
          {inCart ? (
            <button className="btn btn-danger" onClick={handleRemoveFromCart}>
              Remove from cart
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to cart
            </button>
          )}

          <Link className="btn btn-secondary" to="/shop">
            Back to Shop
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
