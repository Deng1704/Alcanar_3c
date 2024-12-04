import { useState, useRef, useCallback, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../util/hooks/useDebounce';
import axios from 'axios';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const debouncedFormState = useDebounce(formState, 2000);

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setIsFieldsDirty(true);
  };

  const validateFields = () => {
    const { email, password } = formState;
    return email.trim() && password.trim();
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      setIsFieldsDirty(true);
      if (!formState.email) emailRef.current.focus();
      if (!formState.password) passwordRef.current.focus();
      return;
    }

    setStatus('loading');
    try {
      const response = await axios.post('/admin/login', formState, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });

      localStorage.setItem('accessToken', response.data.access_token);
      navigate('/main/movies');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    } finally {
      setStatus('idle');
    }
  };

  useEffect(() => {
    if (debouncedFormState.email || debouncedFormState.password) {
      setIsFieldsDirty(false);
    }
  }, [debouncedFormState]);

  return (
    <div className="Login">
      <div className="main-container">
        <h3>Sign In</h3>
        <form>
          <div className="form-container">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="text"
                id="email"
                name="email"
                ref={emailRef}
                value={formState.email}
                onChange={handleOnChange}
              />
              {isFieldsDirty && !formState.email && (
                <span className="errors">Email is required</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                id="password"
                name="password"
                ref={passwordRef}
                value={formState.password}
                onChange={handleOnChange}
              />
              {isFieldsDirty && !formState.password && (
                <span className="errors">Password is required</span>
              )}
            </div>

            {/* Show/Hide Password Toggle */}
            <div
              className="show-password"
              onClick={handleShowPassword}
              aria-label="Toggle password visibility"
            >
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            {/* Submit Button */}
            <div className="submit-container">
              <button
                className="btn-primary"
                type="button"
                disabled={status === 'loading'}
                onClick={handleLogin}
              >
                {status === 'idle' ? 'Login' : 'Loading, Please wait...'}
              </button>
            </div>

            {/* Register Redirect */}
            <div className="register-container">
              <small>Don't have an account? </small>
              <a href="/register">
                <small>Register</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
