import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import AlgorithmList from '@/components/ui/AlgorithmList';
import { layoutStyles } from '@/styles/layout';
import {
  pathfindingAlgorithms,
  sortingAlgorithms,
  otherAlgorithms,
} from '@/data/algorithms';

export default function Home() {
  return (
    <main className={layoutStyles.page.wrapper}>
      <HeroSection />

      <Section darker>
        <h2 className={layoutStyles.section.title}>
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
          <h2 className={layoutStyles.section.title}>
            Visualize to Understand
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our interactive visualizations help you understand how algorithms
            work in real-time. Perfect for students, developers, and anyone
            interested in learning algorithms.
          </p>
        </div>
      </Section>
    </main>
  );
}
