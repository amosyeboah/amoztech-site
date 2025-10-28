import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-gradient min-h-[calc(100vh-80px)] relative overflow-hidden">
      <div className="container mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row items-center">
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-slide-in-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6 opacity-0 animate-fade-in-up" 
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Automate your business management at very-Low cost
          </h1>
          <p className="text-xl text-gray-700 mb-8 opacity-0 animate-fade-in-up"
             style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Best POS, Invoicing, Inventory & Service management application for your growing business!
          </p>
          <Button 
            asChild
            size="lg"
            className="px-8 py-6 text-lg opacity-0 animate-fade-in-up hover:scale-105 transition-transform duration-200 relative z-10"
            style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            <Link to="/pricing">Start your Free Trial</Link>
          </Button>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 animate-slide-in-right">
          <div className="relative">
            <img 
              src="/lovable-uploads/P-3.png" 
              alt="Business person celebrating success with a tablet" 
              className="w-full h-auto object-cover rounded-lg shadow-lg animate-float"
            />
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-cloud-blue/10 rounded-full animate-float" 
                 style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-cloud-yellow/10 rounded-full animate-float"
                 style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-cloud-green/10 rounded-full animate-float"
                 style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cloud-blue/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cloud-yellow/5 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cloud-green/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;
