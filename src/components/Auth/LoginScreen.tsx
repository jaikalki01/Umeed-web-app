import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RegistrationScreen from './RegistrationScreen';

import logo from "/public/img/logo.png";
import background from "/public/img/umeed-banner.jpg";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch {
      // error handled in AuthContext
    }
  };

  const handleRegistrationComplete = () => {
    setShowRegistration(false);
  };

  if (showRegistration) {
    return (
      <RegistrationScreen
        onComplete={handleRegistrationComplete}
        onBack={() => setShowRegistration(false)}
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${background})` }}
    >
    <Card className="w-full max-w-md shadow-2xl bg-black/30 backdrop-blur-md border-none">
  <CardHeader className="text-center pb-2">
    <div className="flex items-center justify-center space-x-2 mb-4">
      {/* <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent opacity-80">
        Umeed
      </h1> */}
      <img src={logo} alt="Umeed Logo" className="h-12" />
    </div>
    <CardTitle className="text-center
    text-2xl
    font-bold
    bg-gradient-to-r 
    from-red-300
    via-orange-200 
    via-[#FDFFB8] 
    via-green-200 
    via-blue-300 
    via-[#EABDE6]
    to-purple-300
    bg-clip-text 
    text-transparent">Welcome Back!</CardTitle>
    <CardDescription className="text-white ">
      World's First LGBTQ+ Matrimony App
    </CardDescription>
  </CardHeader>

  <CardContent>
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" className="opacity-80">Login</TabsTrigger>
        <TabsTrigger value="otp" className="opacity-80">OTP Login</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="opacity-90"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="opacity-90"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm opacity-80">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="otp" className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="opacity-90"
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Send OTP
          </Button>
        </div>
      </TabsContent>
    </Tabs>

    <div className="mt-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 opacity-50" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white/50 px-2 text-black-500">New to Umeed?</span>
        </div>
      </div>

<Button
  variant="outline"
  onClick={() => setShowRegistration(true)}
  className="
    w-full 
    border-none 
    text-purple-600 
    bg-white/50
    transition-all duration-[100ms] ease-in-out
    hover:purple-50 hover:scale-105
  "
>
  Create New Account
</Button>

    </div>

    <p className="text-xs text-center text-white mt-6">
      By continuing, you agree to our Terms of Service and Privacy Policy
    </p>

  </CardContent>
</Card>

    </div>
  );
};

export default LoginScreen;
