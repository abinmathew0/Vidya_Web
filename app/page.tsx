import Link from 'next/link';
import './globals.css';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
     
      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-6xl font-extrabold text-darkRed mb-4 mt-36">
          I craft words that inspire and inform
        </h1>
        <p className="text-lg text-burntOrange mt-10">
          Writing content that resonates with your audience and makes a lasting impact.
        </p>
        <Link href="/articles" className="mt-10 mb-36 px-8 py-4 bg-darkRed text-lightCream text-lg font-bold rounded-full shadow-lg hover:bg-[#7E6752] transition duration-300">
          See my work
        </Link>
      </main>
    </div>
  );
}
