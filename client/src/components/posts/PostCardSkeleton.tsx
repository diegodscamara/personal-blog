import React from 'react';
import { Skeleton } from '../ui/skeleton'; // Ensure you have a Skeleton component

const PostCardSkeleton: React.FC<{ isLarge?: boolean }> = ({ isLarge = false }) => {
  const cardClasses = isLarge ? 'col-span-full sm:col-span-2' : 'col-span-1 sm:col-span-1';
  const titleSkeletonClass = isLarge ? 'h-12 mb-4' : 'h-6 mb-4';
  const contentSkeletonClass = isLarge ? 'h-4 w-3/4' : 'h-4';

  return (
    <div className={`${cardClasses} bg-white shadow rounded-lg p-4`}>
      <Skeleton className={titleSkeletonClass} />
      <Skeleton className={contentSkeletonClass} />
      <Skeleton className={contentSkeletonClass} />
      <Skeleton className="h-4 mt-4" />
    </div>
  );
}

export default PostCardSkeleton;
