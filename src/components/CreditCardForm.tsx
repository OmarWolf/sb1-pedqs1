import { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

interface CreditCardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export function CreditCardForm({ onClose }: { onClose: () => void }) {
  const [cardData, setCardData] = useState<CreditCardData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [errors, setErrors] = useState<Partial<CreditCardData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<CreditCardData> = {};
    
    if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date';
    }
    
    if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
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
    
    alert('Credit card added successfully!');
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CreditCard className="h-6 w-6 text-blue-600" />
            <h2 className="ml-2 text-xl font-bold text-gray-900">Add Credit Card</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              label="Card Number"
              name="cardNumber"
              type="text"
              value={cardData.cardNumber}
              onChange={handleChange}
              error={errors.cardNumber}
              className="pl-10"
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              required
            />
            <CreditCard className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                label="Expiry Date"
                name="expiryDate"
                type="text"
                value={cardData.expiryDate}
                onChange={handleChange}
                error={errors.expiryDate}
                className="pl-10"
                placeholder="MM/YY"
                maxLength={5}
                required
              />
              <Calendar className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                label="CVV"
                name="cvv"
                type="text"
                value={cardData.cvv}
                onChange={handleChange}
                error={errors.cvv}
                className="pl-10"
                placeholder="123"
                maxLength={4}
                required
              />
              <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <Input
              label="Cardholder Name"
              name="cardholderName"
              type="text"
              value={cardData.cardholderName}
              onChange={handleChange}
              error={errors.cardholderName}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="flex space-x-4">
            <Button type="submit" isLoading={isLoading}>
              Add Card
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}