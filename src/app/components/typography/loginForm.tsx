"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { TextField, Button, Checkbox, Card, Link } from '@/components/ui';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
    
    // Simulate login and redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md" padding="lg">
        {/* Logo and Title */}
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

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            icon={HiMail}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={HiLockClosed}
          />

          <Checkbox
            id="remember"
            label="Remember Me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>

          {/* Links */}
          <div className="text-center mt-4 space-y-2">
            <Link href="#" variant="primary" className="block">
              Forgot Username or Password?
            </Link>
            <Link href="#" variant="primary" className="block">
              Set Up Online Access
            </Link>
          </div>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Looking for these accounts?</p>
          <Link href="#" variant="primary" className="block">
            Commercial or Trade Credit
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;