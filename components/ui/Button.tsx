/**
 * Button — primary interactive element across the site.
 *
 * Variants:
 *   primary   — deep indigo background, ivory text (main CTAs)
 *   secondary — ivory background, indigo border (secondary actions)
 *   ghost     — transparent, indigo text with underline on hover (inline links)
 */

'use client';

import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo text-ivory-50 hover:bg-indigo-500 active:bg-indigo-500 border border-transparent',
  secondary:
    'bg-transparent text-indigo border border-indigo hover:bg-indigo-50 active:bg-indigo-100',
  ghost:
    'bg-transparent text-indigo border border-transparent hover:underline underline-offset-4 decoration-indigo-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-md font-sans font-medium
          transition-colors duration-150
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
