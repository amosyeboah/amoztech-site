import { Link } from 'react-router-dom';
import logo from '@/assets/amoztech-logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="AmozTech Logo" className="h-12 w-auto mr-2" />
              <div>
                <span className="text-lg font-bold logo-text">amozTech</span>
                <p className="text-[10px] text-gray-500 font-medium">THE POWER OF NOW</p>
              </div>
            </Link>
            <p className="text-gray-600 text-sm">
              Simplifying business management with affordable, tech solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Features</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Pricing</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Integrations</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Updates</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">About Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Careers</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Help Center</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Documentation</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">API Reference</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Community</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} amozTech. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Privacy Policy</Link>
              <Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Terms of Service</Link>
              <Link to="/" className="text-gray-600 hover:text-cloud-blue text-sm">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
