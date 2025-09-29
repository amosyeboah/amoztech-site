import { useState } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "How to Choose the Right POS System for Your Business",
      excerpt: "Discover the key factors to consider when selecting a point-of-sale system that will grow with your business and improve customer experience.",
      author: "Sarah Johnson",
      date: "2024-03-15",
      readTime: "5 min read",
      category: "Business Tips",
      image: "/images/pos-pic.jpg"
    },
    {
      id: 2,
      title: "Inventory Management Best Practices for Small Businesses",
      excerpt: "Learn proven strategies to optimize your inventory management, reduce costs, and prevent stockouts that could hurt your bottom line.",
      author: "Michael Chen",
      date: "2024-03-10",
      readTime: "7 min read",
      category: "Inventory",
      image: "/images/inventory-pic.jpg"
    },
    {
      id: 3,
      title: "Digital Payment Trends Shaping Retail in 2024",
      excerpt: "Explore the latest payment technologies and customer preferences that are transforming how businesses accept payments.",
      author: "Emma Rodriguez",
      date: "2024-03-05",
      readTime: "6 min read",
      category: "Payments",
      image: "/images/retail-pos-software.jpg"
    },
    {
      id: 4,
      title: "Restaurant POS Features That Boost Efficiency",
      excerpt: "Discover essential POS features specifically designed for restaurants to streamline operations and enhance customer service.",
      author: "David Kim",
      date: "2024-02-28",
      readTime: "4 min read",
      category: "Restaurant",
      image: "/images/restaurant-management-software.jpg"
    },
    {
      id: 5,
      title: "Pharmacy Management: Compliance and Efficiency",
      excerpt: "Navigate the unique challenges of pharmacy operations with specialized POS solutions that ensure compliance and accuracy.",
      author: "Lisa Thompson",
      date: "2024-02-20",
      readTime: "8 min read",
      category: "Healthcare",
      image: "/images/pharmacy-pos-billing-software.jpg"
    },
    {
      id: 6,
      title: "Data Analytics: Turning Sales Data into Business Insights",
      excerpt: "Learn how to leverage your POS data to make informed business decisions and identify growth opportunities.",
      author: "Robert Wilson",
      date: "2024-02-15",
      readTime: "6 min read",
      category: "Analytics",
      image: "/images/report-pic.jpg"
    }
  ];

  const categories = ['All', 'Business Tips', 'Inventory', 'Payments', 'Restaurant', 'Healthcare', 'Analytics'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Business Insights & <span className="text-primary">Tips</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and best practices for growing your business with the right technology.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-10 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="mt-4 p-0 h-auto font-medium group-hover:text-primary">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest business insights, tips, and updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;