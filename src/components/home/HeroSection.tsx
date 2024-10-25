import Link from 'next/link';
import Section from '../layout/Section';

// TODO: Manejar las clases desde un archivoooooo!
const HeroSection = () => {
  return (
    <Section className="py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Algorithm Visualization Made Simple
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Explore and understand complex algorithms through interactive
          visualizations. Watch how algorithms work step by step, making
          learning both fun and effective.
        </p>
        <Link
          href="/dijkstra"
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg
            font-medium hover:bg-blue-600 transition-colors"
        >
          Try Dijkstra&apos;s Algorithm
        </Link>
      </div>
    </Section>
  );
};

export default HeroSection;
