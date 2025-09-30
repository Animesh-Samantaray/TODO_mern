import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authActions } from '.'; // adjust path if needed

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${window.location.origin}/api/auth/login`, { email, password });

      // store session
      sessionStorage.setItem('userId', res.data._id);
      sessionStorage.setItem('isLoggedIn',true);
      sessionStorage.setItem('email', res.data.email);

      // redux update
      dispatch(authActions.login({ email: res.data.email, id: res.data._id }));

      toast.success('Welcome Back Hero');
      navigate('/'); // ✅ correct navigation
    } catch (error) {
      console.log(error.response?.data); // see backend error
      if (error.response?.status === 404) toast.error('You have to register first');
      else if (error.response?.status === 400) toast.error('Wrong Password');
      else toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Welcome Back ....
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={onHandle}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
