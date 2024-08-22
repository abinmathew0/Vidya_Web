'use client';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-lightCream">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-darkRed"></div>
    </div>
  );
}
