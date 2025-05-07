import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name:'',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = Navigate();

  const handleClick = async (e) => {
    e.preventDefault(); 
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(user.email);
    if (!validEmail) {
      return setError('Please provide a valid email');
    } else if (user.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }else if(user.name.trim() === ''){
        return setError('Name field must not be empty');
    }

    setIsLoading(true);

    try {
      const sendUserInfo = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const parseResp = await sendUserInfo.json();
      console.log(parseResp);
      setError(null);
      alert('Registration successfull please login')
       navigate('/login')
    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form className="space-y-4">
        <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-3 border rounded-xl"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-xl transition ${
              isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/" className="text-green-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
