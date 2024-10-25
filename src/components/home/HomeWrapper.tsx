import {
  pathfindingAlgorithms,
  sortingAlgorithms,
  otherAlgorithms,
} from '@/data/algorithms';
import HeroSection from './HeroSection';
import Section from '../layout/Section';
import Card from '../ui/Card';
import AlgorithmList from '../ui/AlgorithmList';

// TODO: Manejar las clases desde un archivoooooo!
const HomeWrapper = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSection />

      <Section darker>
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Available & Upcoming Algorithms
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card title="Pathfinding Algorithms">
            <AlgorithmList items={pathfindingAlgorithms} />
          </Card>

          <Card title="Sorting Algorithms">
            <AlgorithmList items={sortingAlgorithms} />
          </Card>

          <Card title="Other Algorithms">
            <AlgorithmList items={otherAlgorithms} />
          </Card>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Visualize to Understand
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our interactive visualizations help you understand how algorithms
            work in real-time. Perfect for students, developers, and anyone
            interested in learning algorithms.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default HomeWrapper;
