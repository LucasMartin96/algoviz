interface CardProps {
  title: string;
  children: React.ReactNode;
}

// TODO: Manejar las clases desde un archivoooooo!
const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:border-blue-500 transition-colors">
      <h3 className="text-xl font-bold mb-4 text-blue-500">{title}</h3>
      {children}
    </div>
  );
};

export default Card;
