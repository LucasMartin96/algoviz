'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dijkstra', href: '/dijkstra' },
  { name: 'Sorting', href: '/sorting' },
];

// TODO: Manejar las clases desde un archivoooooo! 
const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              AlgoViz
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
