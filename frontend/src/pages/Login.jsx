import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message)
        }


      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token);
        } else {
           toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  useEffect(() => {
    if (token) {
      navigate('/')
    }
  },[token])
  


  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={onSubmitHandler}
        className="border border-gray-400 w-full max-w-md bg-[#0d1117] rounded-2xl shadow-lg p-8 space-y-8"
      >
        {/* Title */}
        <div className="text-center text-3xl font-semibold ">
          {currentState === 'Login'
            ? <Title text1="LOG" text2="IN" />
            : <Title text1="SIGN" text2="UP" />
          }
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-gray-200">
          {currentState !== 'Login' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-200/50"
              placeholder="Your Name"
              required
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
           className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-200/50"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
           className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-200/50"
            placeholder="Password"
            required
          />
        </div>

        {/* Forgot password */}
        <div className="flex justify-between text-sm text-gray-200">
          <p className="cursor-pointer hover:underline">Forgot your password?</p>
        </div>

        {/* Submit button */}
          <button
              type="submit"
              className=" w-full mt-2 relative inline-flex items-center justify-center p-2 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              {currentState}
            
            </button>

        {/* Toggle link */}
        <p
          onClick={() =>
            setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
          }
          className="cursor-pointer text-center text-gray-100/60 mt-4 hover:underline"
        >
          {currentState === 'Login'
            ? 'Create an account? Click here'
            : 'Already have an account? Login here'}
        </p>
      </form>
    </div>
  );
};

export default Login;
