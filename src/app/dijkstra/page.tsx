import DijkstraWrapper from '@/components/DijkstraWrapper';

export default function DijkstraPage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] bg-gray-900 py-8">
      <div className="container mx-auto max-w-7xl px-4 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <DijkstraWrapper />
        </div>
      </div>
    </main>
  );
}
