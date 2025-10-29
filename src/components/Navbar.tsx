import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/amoztech-logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="AmozTech Logo" className="h-16 w-auto" />
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
          <Button asChild className="bg-cloud-blue hover:bg-blue-600 text-white">
            <Link to="/pricing">Try For Free</Link>
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
          <Button asChild className="bg-cloud-blue hover:bg-blue-600 text-white w-full">
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>Try For Free</Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
