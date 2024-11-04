import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, Shield } from 'lucide-react';
import { Button } from './Button';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center">
          <Shield className="h-16 w-16 text-blue-600" />
          <h1 className="mt-6 text-4xl font-bold text-gray-900">Welcome</h1>
          <p className="mt-2 text-lg text-gray-600">Get started with your account</p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={() => navigate('/register')}
            className="group relative"
          >
            <span className="absolute left-4 inset-y-0 flex items-center">
              <UserPlus className="h-5 w-5" />
            </span>
            <span className="ml-4">Create Account</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/login')}
            className="group relative"
          >
            <span className="absolute left-4 inset-y-0 flex items-center">
              <LogIn className="h-5 w-5" />
            </span>
            <span className="ml-4">Login</span>
          </Button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}