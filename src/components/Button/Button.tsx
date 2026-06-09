import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}

export const Button = ({ children, className = '', variant = 'primary', ...props }: ButtonProps) => {
  const baseClass =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300/60 disabled:cursor-not-allowed disabled:opacity-50';
  const variantClass =
    variant === 'primary'
      ? 'bg-gradient-to-r from-[#ff4fd8] via-[#9f5cff] to-[#6d5dfc] text-white shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:scale-[1.03] hover:shadow-[0_0_34px_rgba(217,70,239,0.58)] disabled:hover:scale-100'
      : 'border border-purple-300/20 bg-black/20 text-purple-100 hover:border-purple-300/50 hover:bg-purple-300/10';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
