import React from 'react';
import Image from 'next/image';

interface FlagIconProps {
  countryCode: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

const sizeDimensions: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', { width: number; height: number; classNames: string }> = {
  xs: { width: 16, height: 11, classNames: 'w-4 h-[11px]' },
  sm: { width: 20, height: 14, classNames: 'w-5 h-[14px]' },
  md: { width: 26, height: 18, classNames: 'w-[26px] h-[18px]' },
  lg: { width: 36, height: 25, classNames: 'w-9 h-[25px]' },
  xl: { width: 54, height: 36, classNames: 'w-[54px] h-[36px]' },
};

export default function FlagIcon({
  countryCode,
  size = 'md',
  className = '',
  alt,
}: FlagIconProps) {
  const code = (countryCode || '').toLowerCase().trim();
  const dim = sizeDimensions[size] || sizeDimensions.md;

  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-[3px] border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.08)] bg-white align-middle ${dim.classNames} ${className}`}
      style={{ lineHeight: 0 }}
      title={alt || `${code.toUpperCase()} Flag`}
    >
      <Image
        src={`/flags/${code}.svg`}
        alt={alt || `${code.toUpperCase()} Flag`}
        width={dim.width}
        height={dim.height}
        className="w-full h-full object-cover block"
      />
    </span>
  );
}
