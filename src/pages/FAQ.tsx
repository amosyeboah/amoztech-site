import { useState } from 'react';
import { Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I get started with amozTech POS?",
          answer: "Getting started is simple! Sign up for a free trial, choose your business type, and follow our guided setup wizard. Our support team will help you configure your system and import your products. You can be up and running in just a few hours."
        },
        {
          question: "What devices are compatible with amozTech?",
          answer: "amozTech works on tablets, smartphones, computers, and dedicated POS terminals. We support iOS, Android, Windows, and web browsers. All you need is an internet connection to sync your data across all devices."
        },
        {
          question: "Can I use my existing hardware?",
          answer: "Yes! amozTech is designed to work with most existing hardware including receipt printers, barcode scanners, cash drawers, and card readers. We'll help you identify compatible devices during setup."
        },
        {
          question: "How long does setup take?",
          answer: "Basic setup can be completed in under 30 minutes. For businesses with extensive inventory or complex requirements, our onboarding specialists can help with a complete setup within 1-2 business days."
        }
      ]
    },
    {
      title: "Pricing & Plans",
      faqs: [
        {
          question: "How much does amozTech cost?",
          answer: "We offer flexible pricing plans starting from $29/month for small businesses. Plans include different features and user limits. Check our pricing page for detailed information on all available plans."
        },
        {
          question: "Is there a free trial?",
          answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial. You can test all functionality and see how amozTech fits your business needs."
        },
        {
          question: "Can I change my plan anytime?",
          answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated. Contact our support team if you need help choosing the right plan."
        },
        {
          question: "Are there any setup fees?",
          answer: "No setup fees! All plans include free setup and onboarding. We also provide free training sessions and ongoing support to ensure your success with amozTech."
        }
      ]
    },
    {
      title: "Features & Functionality",
      faqs: [
        {
          question: "Can I manage inventory across multiple locations?",
          answer: "Yes! amozTech supports multi-location inventory management. Track stock levels, transfer products between locations, and get consolidated reporting across all your stores from a single dashboard."
        },
        {
          question: "Does amozTech work offline?",
          answer: "Yes, amozTech has robust offline functionality. You can continue processing sales, managing inventory, and accessing customer data even without internet. All data syncs automatically when connection is restored."
        },
        {
          question: "What payment methods are supported?",
          answer: "We support all major payment methods including credit/debit cards, contactless payments, mobile wallets (Apple Pay, Google Pay), gift cards, and cash. EMV chip and PIN transactions are fully supported."
        },
        {
          question: "Can I customize receipts and invoices?",
          answer: "Yes! Fully customize your receipts and invoices with your logo, colors, and branding. Add custom fields, promotional messages, and choose from multiple templates. Email and SMS receipts are also available."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "What kind of support do you provide?",
          answer: "We offer 24/7 customer support via phone, email, and live chat. Our support team includes technical specialists and business consultants who can help with both technical issues and business optimization."
        },
        {
          question: "How do I backup my data?",
          answer: "All data is automatically backed up to secure cloud servers in real-time. We maintain multiple backup copies and can restore your data quickly if needed. You can also export your data anytime."
        },
        {
          question: "Is my data secure?",
          answer: "Absolutely! We use bank-level encryption, secure data centers, and comply with PCI DSS standards. All payment data is tokenized and never stored on your devices. Regular security audits ensure your data stays protected."
        },
        {
          question: "Can I integrate with other software?",
          answer: "Yes! amozTech integrates with popular accounting software (QuickBooks, Xero), e-commerce platforms (Shopify, WooCommerce), and marketing tools. Our API allows custom integrations for specific business needs."
        }
      ]
    },
    {
      title: "Account Management",
      faqs: [
        {
          question: "How do I add new users to my account?",
          answer: "Adding users is simple through your admin dashboard. Set up individual user accounts with customized permissions and access levels. Each user gets their own login credentials and activity tracking."
        },
        {
          question: "Can I control what each employee can access?",
          answer: "Yes! Comprehensive user permissions allow you to control access to sales, inventory, reports, settings, and more. Set different permission levels for managers, cashiers, and other staff members."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel anytime from your account settings or by contacting our support team. There are no cancellation fees, and you'll continue to have access until the end of your billing period."
        },
        {
          question: "What happens to my data if I cancel?",
          answer: "Your data remains accessible for 90 days after cancellation, allowing you to export everything you need. We can also help you migrate to another system if required. After 90 days, data is securely deleted."
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.title }))
  );

  const filteredFaqs = allFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions about amozTech POS system, features, pricing, and support.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-4xl mx-auto">
          {searchTerm ? (
            // Show search results
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Search Results ({filteredFaqs.length})
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`search-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left">
                      <div>
                        <div className="font-medium">{faq.question}</div>
                        <div className="text-xs text-primary mt-1">{faq.category}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No FAQs found matching your search.</p>
                </div>
              )}
            </div>
          ) : (
            // Show categorized FAQs
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="bg-muted py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Get instant help from our support team</p>
                <Button variant="outline" className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Call Support</h3>
                <p className="text-sm text-muted-foreground">Speak directly with our experts</p>
                <Button variant="outline" className="w-full">+1 (555) 123-4567</Button>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm text-muted-foreground">Send us your questions anytime</p>
                <Button variant="outline" className="w-full">support@amoztech.com</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;