import { Link } from 'react-router-dom';
import logo from '@/assets/amoztech-logo.png';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const productLinks = [
    { label: 'Features', to: '/' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Integrations', to: '/' },
    { label: 'Updates', to: '/' },
  ];

  const companyLinks = [
    { label: 'About Us', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Blog', to: '/blog' },
  ];

  const supportLinks = [
    { label: 'Help Center', to: '/' },
    { label: 'Documentation', to: '/' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Community', to: '/' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground to-foreground/95" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6 group">
              <img src={logo} alt="AmozTech Logo" className="h-12 w-auto mr-3 brightness-0 invert transition-transform duration-300 group-hover:scale-105" />
              <div>
                <span className="text-xl font-bold text-background">amozTech</span>
                <p className="text-[10px] text-background/60 font-medium tracking-wider">THE POWER OF NOW</p>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-sm">
              Simplifying business management with affordable, modern tech solutions. Empowering businesses across Africa and beyond.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hello@amoztech.com" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors text-sm">
                <Mail size={16} />
                <span>hello@amoztech.com</span>
              </a>
              <a href="tel:+233240857085" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors text-sm">
                <Phone size={16} />
                <span>+233 24 085 7085</span>
              </a>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin size={16} />
                <span>Accra, Ghana</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-background mb-6 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-background/70 hover:text-primary text-sm transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-background mb-6 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-background/70 hover:text-primary text-sm transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-background mb-6 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-background/70 hover:text-primary text-sm transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} amozTech. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/" className="text-background/60 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-background/60 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-background/60 hover:text-primary text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
