'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-[#597E52] text-lightCream p-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Vidya Writes. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Created with ♥ by abin mathew.
        </p>
      </div>
    </footer>
  );
}
