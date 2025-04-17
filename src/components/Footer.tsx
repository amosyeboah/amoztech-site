
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="h-8 w-8 mr-2">
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
                <span className="text-lg font-bold logo-text">CLOUD ERP</span>
                <p className="text-[10px] text-gray-500 font-medium">THE POWER OF POSSIBILITY</p>
              </div>
            </Link>
            <p className="text-gray-600 text-sm">
              Simplifying business management with affordable, powerful cloud solutions.
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
              © {new Date().getFullYear()} Cloud ERP. All rights reserved.
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
