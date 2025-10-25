"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Label, Button, Checkbox } from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="https://ecm.capitalone.com/CI_Common/assets/images/logos/capital-one-logo.svg"
            alt="Capital One Logo"
            width={150}
            height={50}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <label htmlFor="username" className="text-sm font-medium text-gray-900">Username</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiMail className="w-5 h-5 text-gray-500" />
              </div>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="password" className="text-sm font-medium text-gray-900">Password</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiLockClosed className="w-5 h-5 text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-sm font-medium text-gray-900">Remember Me</label>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign In
          </button>
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-blue-700 hover:underline block mb-2">
              Forgot Username or Password?
            </a>
            <a href="#" className="text-sm text-blue-700 hover:underline block">
              Set Up Online Access
            </a>
          </div>
        </form>
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Looking for these accounts?</p>
          <a href="#" className="text-sm text-blue-700 hover:underline block">
            Commercial or Trade Credit
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;