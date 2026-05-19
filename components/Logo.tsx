'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-lg font-bold',
    md: 'text-xl font-bold',
    lg: 'text-3xl font-bold',
  };
  return (
    <Link href="/" className={cn('flex items-center gap-0.5 select-none', className)}>
      <span className={cn(sizes[size], 'text-sky-500 tracking-tight')}>voyageo</span>
      <span className={cn(sizes[size], 'text-slate-400 tracking-tight font-medium')}>.ai</span>
    </Link>
  );
}
