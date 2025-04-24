
import React from 'react';

export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div
    className={`
      relative
      overflow-hidden
      bg-gray-200
      rounded-md
      animate-pulse
      ${className}
    `}
  >
    <div
      className="
        absolute
        inset-0
        -translate-x-full
        bg-gradient-to-r
        from-transparent
        via-white/40
        to-transparent
        animate-[shimmer_2s_infinite]
      "
    />
  </div>
);