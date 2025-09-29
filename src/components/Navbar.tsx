
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-12 w-12 mr-3">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <path
                  d="M50 10C27.91 10 10 27.91 10 50C10 72.09 27.91 90 50 90C72.09 90 90 72.09 90 50C90 27.91 72.09 10 50 10Z"
                  fill="#FFF"
                  stroke="url(#paint0_linear)"
                  strokeWidth="4"
                />
                <path
                  d="M30 35C30 25 38 20 50 20C65 20 70 30 70 40C70 48 65 55 50 55C35 55 30 65 30 75"
                  stroke="url(#paint1_linear)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="paint0_linear" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F5A623" />
                    <stop offset="1" stopColor="#7ED321" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="30" y1="47.5" x2="70" y2="47.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F5A623" />
                    <stop offset="1" stopColor="#7ED321" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <span className="text-2xl font-bold logo-text">amozTech</span>
              <p className="text-xs text-gray-500 font-medium">THE POWER OF NOW</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 font-medium hover:text-cloud-blue transition-colors">
            Home
          </Link>
          <Link to="/blog" className="text-gray-700 font-medium hover:text-cloud-blue transition-colors">
            Blog
          </Link>
          <Link to="/faq" className="text-gray-700 font-medium hover:text-cloud-blue transition-colors">
            FAQ
          </Link>
          <Link to="/pricing" className="text-gray-700 font-medium hover:text-cloud-blue transition-colors">
            Pricing
          </Link>
          <Link to="/contact" className="text-gray-700 font-medium hover:text-cloud-blue transition-colors">
            Contact us
          </Link>
          <Link to="/login" className="text-gray-700 font-medium hover:text-cloud-blue transition-colors">
            Login
          </Link>
          <Button className="bg-cloud-blue hover:bg-blue-600 text-white">
            Try For Free
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-cloud-blue focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mt-4 flex flex-col space-y-4 md:hidden">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-cloud-blue transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="text-gray-700 font-medium hover:text-cloud-blue transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/faq"
            className="text-gray-700 font-medium hover:text-cloud-blue transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            to="/pricing"
            className="text-gray-700 font-medium hover:text-cloud-blue transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 font-medium hover:text-cloud-blue transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact us
          </Link>
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-cloud-blue transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Button className="bg-cloud-blue hover:bg-blue-600 text-white w-full">
            Try For Free
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
