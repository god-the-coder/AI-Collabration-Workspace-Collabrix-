import React from 'react';
import { getMediaUrl } from '../../utils/media';

// Consistent gradient background used for initials fallback across the app.
const DEFAULT_GRADIENT = 'bg-gradient-to-br from-indigo-500 to-violet-500';

const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-[13px]',
  lg: 'h-14 w-14 text-[18px] sm:h-16 sm:w-16 sm:text-[20px]',
};

// Renders a workspace/user logo image when available, otherwise falls back
// to a gradient circle showing the name's initials.
export default function Avatar({
  src,
  initials,
  name,
  size = 'md',
  rounded = 'rounded-2xl',
  className = '',
}) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const resolvedSrc = getMediaUrl(src);

  if (resolvedSrc) {
    return (
      <img
        src={resolvedSrc}
        alt={name || 'Avatar'}
        className={`shrink-0 ${rounded} object-cover ${sizeClass} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center ${rounded} ${DEFAULT_GRADIENT} font-bold text-white ${sizeClass} ${className}`}
    >
      {initials || '?'}
    </div>
  );
}
