
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="hero-gradient min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row items-center">
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
            Automate your business management at very-Low cost
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Best POS, Invoicing, Inventory & Service management application for your growing business!
          </p>
          <Button className="bg-cloud-blue hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-md">
            Start your Free Trial
          </Button>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2">
          <img 
            src="/lovable-uploads/cefaab59-d79b-406f-8c58-f0203baf2bd1.png" 
            alt="Business person celebrating success with a tablet" 
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
