import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Database, Shield, Users, Check, Zap, Globe, TrendingUp, Box, FileText, PieChart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Index = () => {
  const features = [
    {
      title: "Point of Sale",
      description: "Streamlined checkout with barcode scanning and multiple payment options.",
      icon: BarChart2,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Invoicing & Billing",
      description: "Create professional invoices and track payments effortlessly.",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Inventory Management",
      description: "Real-time stock tracking with automated low-stock alerts.",
      icon: Box,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Customer Management",
      description: "Build relationships with profiles, history, and loyalty programs.",
      icon: Users,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const steps = [
    { number: "01", title: "Sign Up", description: "Create a free trial account. No credit card required." },
    { number: "02", title: "Setup Store", description: "Configure your business information and settings." },
    { number: "03", title: "Start Selling", description: "Begin processing transactions and tracking performance." },
  ];

  const businessTypes = [
    {
      title: "Retail POS Software",
      description: "Grocery Store, Supermarket, Convenience Store, Department Store, General Store",
      image: "/images/retail-pos-software.jpg",
    },
    {
      title: "Food & Drink",
      description: "Restaurant, Cafe, Fast Food, Bakery, Food Truck, Bar & Lounge",
      image: "/images/restaurant-management-software.jpg",
    },
    {
      title: "Pharma & Healthcare",
      description: "Pharmacy, Medical Shop, Chemists, Drugstore, Wellness Center",
      image: "/images/pharmacy-pos-billing-software.jpg",
    },
  ];

  const stats = [
    { value: "500+", label: "Active Businesses" },
    { value: "99.9%", label: "Uptime" },
    { value: "50K+", label: "Transactions Daily" },
    { value: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      quote: "amozTech POS has completely transformed how we manage our retail business. The inventory tracking alone has saved us thousands.",
      author: "Sarah Johnson",
      role: "CEO, Fashion Boutique",
      avatar: "SJ",
    },
    {
      quote: "The invoicing system is a game-changer. We've reduced our billing time by 75% and improved cash flow significantly.",
      author: "Michael Asamoah",
      role: "Owner, Tech Solutions",
      avatar: "MA",
    },
    {
      quote: "As a supermarket owner, I needed a system that could handle both front and back-of-house operations. amozTech does it all.",
      author: "Hannah Osei",
      role: "Owner, Fusion Supermarket",
      avatar: "HO",
    },
  ];

  const FadeInSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      
      {/* Stats Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FadeInSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get Started in <span className="gradient-text">3 Simple Steps</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From sign-up to selling in minutes. No technical skills required.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img 
                  src="/images/pos-pic.jpg" 
                  alt="POS System in action" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-background text-lg font-semibold">Ready to grow your business?</p>
                  <p className="text-background/80 text-sm">Join 500+ businesses already using amozTech</p>
                </div>
              </div>
            </FadeInSection>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <FadeInSection key={step.number} delay={0.1 * (index + 1)}>
                  <div className="flex gap-6 p-6 rounded-2xl bg-card shadow-soft hover-lift cursor-default">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-foreground">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
              
              <FadeInSection delay={0.4}>
                <Button asChild size="lg" className="gradient-bg text-primary-foreground rounded-2xl shadow-glow hover:shadow-elevated transition-all duration-300 mt-4">
                  <Link to="/pricing" className="flex items-center gap-2">
                    Get Started Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                All-in-One <span className="gradient-text">Business Solution</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to manage and grow your business in one powerful platform.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FadeInSection key={feature.title} delay={index * 0.1}>
                <div className="group bg-card p-8 rounded-3xl shadow-soft hover-lift cursor-default h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Industries
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built for <span className="gradient-text">Every Business</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Tailored solutions for retail, food service, healthcare, and more.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessTypes.map((type, index) => (
              <FadeInSection key={type.title} delay={index * 0.15}>
                <div className="group relative rounded-3xl overflow-hidden shadow-soft hover-lift cursor-default h-[400px]">
                  <img 
                    src={type.image} 
                    alt={type.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-background mb-2">{type.title}</h3>
                    <p className="text-background/80 text-sm">{type.description}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Smart POS
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  All-In-One Point of Sale <span className="gradient-text">Software</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Turn any device into a powerful Point of Sale. No special hardware needed. Sell quickly and efficiently from laptops, tablets, or phones.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Easy barcode scanning",
                    "Multiple payment options",
                    "Real-time inventory sync",
                    "Customer management",
                    "Discount & tax handling",
                    "Receipt printing",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-elevated">
                  <img 
                    src="/lovable-uploads/smart.png" 
                    alt="Smart POS Software" 
                    className="w-full h-auto"
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">3x</p>
                      <p className="text-sm text-muted-foreground">Faster Checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection className="order-2 lg:order-1">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-elevated">
                  <img 
                    src="/images/inventory-pic.jpg" 
                    alt="Inventory Management" 
                    className="w-full h-[450px] object-cover"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">Real-time</p>
                      <p className="text-sm text-muted-foreground">Stock Updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2} className="order-1 lg:order-2">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                  Inventory
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Smart Inventory <span className="gradient-text">Management</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Keep your inventory always up to date. Perform accurate inventory counts that protect your investment with real-time value information.
                </p>
                <div className="space-y-4">
                  {[
                    "Create and edit products with images",
                    "Bulk import from Excel",
                    "Real-time stock levels per location",
                    "Automatic low-stock alerts",
                    "Category management",
                    "Supplier tracking",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                  Analytics
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Powerful Reports & <span className="gradient-text">Insights</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Make data-driven decisions with comprehensive reports. Track sales, monitor trends, and optimize your business from anywhere.
                </p>
                <div className="space-y-4">
                  {[
                    "Sales & profit reports",
                    "Employee performance tracking",
                    "Product & supplier analytics",
                    "Customer insights",
                    "Custom date filters",
                    "Export to Excel, CSV, PDF",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-elevated">
                  <img 
                    src="/images/report-pic.jpg" 
                    alt="Reports & Analytics" 
                    className="w-full h-[450px] object-cover"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                      <PieChart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">Live</p>
                      <p className="text-sm text-muted-foreground">Dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Loved by <span className="gradient-text">Businesses</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See what our customers are saying about amozTech Solutions.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInSection key={testimonial.author} delay={index * 0.15}>
                <div className="bg-card p-8 rounded-3xl shadow-soft hover-lift cursor-default h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Ready to <span className="gradient-text">Transform</span> Your Business?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Join hundreds of businesses who trust amozTech for their daily operations. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-bg text-primary-foreground px-10 py-7 text-lg rounded-2xl shadow-glow hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                  <Link to="/pricing" className="flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-10 py-7 text-lg rounded-2xl border-2 hover:bg-secondary transition-all duration-300">
                  <Link to="/pricing">See Pricing</Link>
                </Button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
