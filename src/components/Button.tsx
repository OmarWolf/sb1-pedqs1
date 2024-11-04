import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  const variants = {
    primary: 'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
    secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 disabled:bg-gray-100'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}