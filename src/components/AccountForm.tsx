import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { CreditCardForm } from './CreditCardForm';

interface AccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export function AccountForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AccountFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<AccountFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<AccountFormData> = {};
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Account created successfully!');
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center justify-center mb-6">
            <UserPlus className="h-8 w-8 text-blue-600" />
            <h2 className="ml-2 text-2xl font-bold text-gray-900">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  className="pl-10"
                  required
                />
                <User className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  className="pl-10"
                  required
                />
                <User className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              </div>
            </div>

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
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                className="pl-10"
                required
              />
              <Phone className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                label="Address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                className="pl-10"
                required
              />
              <MapPin className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
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

            <div className="relative">
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                className="pl-10"
                required
              />
              <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowCreditCardForm(true)}
              className="group relative"
            >
              <span className="absolute left-4 inset-y-0 flex items-center">
                <CreditCard className="h-5 w-5" />
              </span>
              <span className="ml-4">Add Credit Card</span>
            </Button>

            <Button type="submit" isLoading={isLoading}>
              Create Account
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </div>
      </div>

      {showCreditCardForm && (
        <CreditCardForm onClose={() => setShowCreditCardForm(false)} />
      )}
    </div>
  );
}