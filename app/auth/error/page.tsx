import { useRouter } from 'next/router';

export default function ErrorPage() {
  const { query } = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Error</h1>
      <p>{query.error}</p>
    </div>
  );
}
