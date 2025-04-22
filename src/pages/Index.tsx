import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Database, Shield, Users, Clock, BoxIcon, Globe, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      title: "Point of Sale",
      description: "Streamlined checkout process with easy inventory management and barcode scanning.",
      icon: BarChart2,
    },
    {
      title: "Invoicing & Billing",
      description: "Create professional invoices, track payments, and manage your financial transactions easily.",
      icon: Database,
    },
    {
      title: "Inventory Management",
      description: "Track stock levels, automate reordering, and prevent stockouts with real-time updates.",
      icon: Shield,
    },
    {
      title: "Customer Management",
      description: "Build stronger relationships with customer profiles, purchase history, and loyalty programs.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All-in-One Business Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage every aspect of your business with our powerful yet easy-to-use platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-cloud-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Smart POS Software For All Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              It is a full-featured point of sale software for all types of businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Retail Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-64 relative overflow-hidden group">
                <img 
                  src="/images/retail-pos-software.jpg" 
                  alt="Retail POS Software" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:animate-image-scale"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:animate-fade-in"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Retail POS Software</h3>
                <p className="text-gray-600 text-sm">
                  Grocery Store, Department Store, Supermarket, Hypermarket, Convenience Store, General Store, Fruits & Vegetables, Liquor Store, Kirana Store POS Software
                </p>
              </div>
            </div>

            {/* Food & Drink Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-64 relative overflow-hidden group">
                <img 
                  src="/images/restaurant-management-software.jpg" 
                  alt="Food & Drink POS" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:animate-image-scale"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:animate-fade-in"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Food & Drink</h3>
                <p className="text-gray-600 text-sm">
                  Restaurant, Cafe, Coffee Shop, Bistro, Fast Food, Food Court, Sweet Shop, Ice Cream Shop, Food Truck, Pizzeria, Bar, Restro Bar, Cake Shop, Bakery POS Software
                </p>
              </div>
            </div>

            {/* Pharma Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-64 relative overflow-hidden group">
                <img 
                  src="/images/pharmacy-pos-billing-software.jpg" 
                  alt="Pharma & Healthcare POS" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:animate-image-scale"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:animate-fade-in"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pharma & Healthcare</h3>
                <p className="text-gray-600 text-sm">
                  Pharmacy, Medical shop, Health care, Chemists, Druggists, Surgical Store, Ayurvedic & Wellness, Medicine Shop POS Software
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All-in-One POS Features */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="h-[500px] relative overflow-hidden rounded-xl group">
                <div 
                  className="absolute inset-0 bg-[url('/images/pos-pic.jpg')] bg-cover bg-center group-hover:animate-image-scale"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:animate-fade-in"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                All-In-One Smart Point Of Sale Software
              </h2>
              <p className="text-gray-600 mb-8">
                No special hardware required. Turn your laptop, mobile or tablet into a powerful Point of Sale Software. Sell in a simple, orderly and fast way from any device.
              </p>
              <div className="space-y-4">
                {[
                  "Easy and User friendly point of sale",
                  "Monitor your business from anywhere and at any time",
                  "Sell items by serial numbers, product name and scan bar code",
                  "Search for products by categories",
                  "Multiple payment options",
                  "Add new customer from POS screen",
                  "Walk-In-Customer added automatically",
                  "Create discount for products",
                  "Taxes calculation"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-cloud-blue mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Management Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-cloud-blue font-semibold mb-4">
                Keep Your Inventory Always Up To Date With Smart POS System
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Inventory Management
              </h2>
              <p className="text-gray-600 mb-8">
                Perform simple and accurate inventory counts that help protect your investment and your business capital with updated value information in real time.
              </p>
              <div className="space-y-4">
                {[
                  "Create and edit products with images",
                  "Import products in bulk from an excel file",
                  "Find and edit products with a friendly and easy to use interface",
                  "Create and manage the categories of your products",
                  "Know the stock in real time of each store",
                  "Automatic low stock alerts"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-cloud-blue mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="h-[500px] relative overflow-hidden rounded-xl group">
                  <div 
                    className="absolute inset-0 bg-[url('/images/inventory-pic.jpg')] bg-cover bg-center group-hover:animate-image-scale"
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent opacity-0 group-hover:animate-fade-in"></div>
                </div>
                <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg max-w-sm hover:animate-slide-up">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-cloud-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Easily Controls The Inventory</h4>
                  </div>
                  <p className="text-gray-600">
                    Control The Items In Your Store Locations And Automates The Processes For Tracking And Locating Products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="h-[500px] relative overflow-hidden rounded-xl group">
                <div 
                  className="absolute inset-0 bg-[url('/images/report-pic.jpg')] bg-cover bg-center group-hover:animate-image-scale"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:animate-fade-in"></div>
              </div>
              <div className="bg-gray-900 text-white p-6 rounded-xl mt-6 max-w-sm mx-auto transform -translate-y-20 hover:animate-slide-up">
                <h4 className="text-lg font-semibold mb-2">
                  Know The Situation Of Your Business In A Schematic Way And At Any Time
                </h4>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-cloud-blue font-semibold mb-4">
                Reports To Help You Make Important Decisions
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Online Statistics And Reports
              </h2>
              <p className="text-gray-600 mb-6">
                Keep track of the factors that are part of your success and avoid products or services that may cause your losses with reports that are updated in real time.
              </p>
              <p className="text-gray-600 mb-8">
                Check your reports from anywhere and make timely and informed decisions. You can view reports with multiple filters.
              </p>
              <div className="space-y-4">
                {[
                  "Sales reports, net profit and buying trends",
                  "Monitor the productivity and performance of your employees with sales representative reports",
                  "Reports by product, supplier, customer, stock, expense and purchase payment and more",
                  "View complete sales history",
                  "Available at any time and from anywhere",
                  "Filters by customizable dates",
                  "Download reports in excel, csv and pdf format"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-cloud-blue mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      z

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers are saying about amozTech Solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "amozTech POS has completely transformed how we manage our retail business. The inventory tracking alone has saved us thousands of dollars."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Sarah Johnson</p>
                <p className="text-gray-500 text-sm">CEO, Fashion Boutique</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "The invoicing system is a game-changer. We've reduced our billing time by 75% and improved cash flow significantly."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Michael Chen</p>
                <p className="text-gray-500 text-sm">Owner, Tech Solutions</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "As a supermarket owner, I needed a system that could handle both front and back-of-house operations. amozTech POS does it all seamlessly."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Elena Rodriguez</p>
                <p className="text-gray-500 text-sm">Owner, Fusion Supermarket</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 hero-gradient">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to streamline your business operations?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Join hundreds of businesses who trust amozTech Solutions for their daily operations. Get started today with our 14-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-cloud-blue hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-md">
              Start your Free Trial
            </Button>
            <Button variant="outline" className="border-gray-400 text-gray-700 px-8 py-6 text-lg rounded-md">
              <Link to="/pricing" className="flex items-center">
                See Pricing <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
