interface SectionProps {
  children: React.ReactNode;
  className?: string;
  darker?: boolean;
}

// TODO: Manejar las clases desde un archivoooooo! 
const Section = ({
  children,
  className = '',
  darker = false,
}: SectionProps) => {
  return (
    <section
      className={`py-16 px-4 ${darker ? 'bg-gray-800' : 'bg-gray-900'} ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

export default Section;
