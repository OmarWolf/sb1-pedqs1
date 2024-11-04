import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Login successful!');
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center justify-center mb-6">
            <LogIn className="h-8 w-8 text-blue-600" />
            <h2 className="ml-2 text-2xl font-bold text-gray-900">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading}>
              Sign in
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}