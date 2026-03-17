import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { login, loginAsGuest, selectIsAuthenticated } from '../features/auth/authSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/checkout';

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();

      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password.');
        return;
      }

      const localName = email.split('@')[0] || 'User';
      const formattedName = localName.charAt(0).toUpperCase() + localName.slice(1);

      dispatch(
        login({
          name: formattedName,
          email,
        })
      );
      navigate(from, { replace: true });
    },
    [dispatch, email, from, navigate, password]
  );

  const handleGuestLogin = useCallback(() => {
    dispatch(loginAsGuest());
    navigate(from, { replace: true });
  }, [dispatch, from, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/checkout" replace />;
  }

  return (
    <section className="panel page-card auth-card">
      <h2>Login</h2>
      <p>Enter your credentials to continue to checkout.</p>

      <form className="form-grid" onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error ? <p className="error-text auth-error">{error}</p> : null}

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <button className="btn btn-secondary guest-login-btn" onClick={handleGuestLogin}>
        Login as Guest
      </button>
    </section>
  );
}

export default LoginPage;
