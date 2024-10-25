interface AlgorithmItem {
  name: string;
  status: 'available' | 'coming-soon';
}

interface AlgorithmListProps {
  items: AlgorithmItem[];
}

const AlgorithmList = ({ items }: AlgorithmListProps) => {
  return (
    <ul className="space-y-2 text-gray-300">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <span
            className={`w-2 h-2 rounded-full mr-2 ${
              item.status === 'available' ? 'bg-blue-500' : 'bg-yellow-500'
            }`}
          />
          {item.name} (
          {item.status === 'available' ? 'Available' : 'Coming Soon'})
        </li>
      ))}
    </ul>
  );
};

export default AlgorithmList;
