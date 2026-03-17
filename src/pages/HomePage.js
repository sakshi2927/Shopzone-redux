import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="hero panel">
      <p className="eyebrow">Welcome to</p>
      <h1>ShopZone Next</h1>
      <p>
        Modern e-commerce app powered by Redux Toolkit, React Router, dynamic product routes,
        and protected checkout.
      </p>
      <div className="hero-actions">
        <Link className="btn btn-primary" to="/shop">
          Start Shopping
        </Link>
        <Link className="btn btn-secondary" to="/contact">
          Contact Us
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
