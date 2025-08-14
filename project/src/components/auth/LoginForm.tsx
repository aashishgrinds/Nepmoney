import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { TrendingUp, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        toast.success('Welcome to Nepmoney!');
      } else {
        toast.error('Invalid credentials. Use demo/demo123');
      }
      setLoading(false);
    }, 1000);
  };

  // Auto-fill demo credentials
  React.useEffect(() => {
    setUsername('demo');
    setPassword('demo123');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Nepmoney</h1>
          <p className="text-gray-600 mt-2">Your personal finance tracker</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Button type="submit" className="w-full" loading={loading}>
            Sign In
          </Button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Demo Credentials</p>
                <p className="text-blue-700">Username: demo | Password: demo123</p>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}