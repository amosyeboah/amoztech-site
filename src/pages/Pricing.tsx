import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const paymentReferenceSchema = z.string().regex(/^[a-zA-Z0-9_-]+$/, 'Invalid payment reference format');

const PricingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Load plans
    supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('amount', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error loading plans:', error);
        } else {
          setPlans(data || []);
        }
      });

    // Check for payment verification
    const verify = searchParams.get('verify');
    const reference = searchParams.get('reference');
    if (verify === 'true' && reference) {
      // Validate reference format before processing
      const validation = paymentReferenceSchema.safeParse(reference);
      if (validation.success) {
        verifyPayment(reference);
      } else {
        toast({
          title: 'Invalid Payment Reference',
          description: 'The payment reference in the URL is invalid.',
          variant: 'destructive',
        });
      }
    }
  }, [searchParams]);

  const verifyPayment = async (reference: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('paystack-verify', {
        body: { reference },
      });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your subscription is now active.',
      });
      
      navigate('/pricing', { replace: true });
    } catch (error: any) {
      toast({
        title: 'Payment Verification Failed',
        description: error.message || 'Please contact support.',
        variant: 'destructive',
      });
    }
  };

  const handleFreeTrial = async (planId: string) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to start your free trial.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    // Validate planId is a valid UUID
    const uuidSchema = z.string().uuid('Invalid plan ID');
    const validation = uuidSchema.safeParse(planId);
    
    if (!validation.success) {
      toast({
        title: 'Error',
        description: 'Invalid plan selection',
        variant: 'destructive',
      });
      return;
    }

    setLoading(`trial-${planId}`);
    try {
      const { data, error } = await supabase.functions.invoke('activate-free-trial', {
        body: { planId },
      });

      if (error) throw error;

      toast({
        title: 'Free Trial Activated!',
        description: 'Enjoy your 1-month free trial. No payment required.',
      });
      
      // Reload to update UI
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to activate free trial',
        variant: 'destructive',
      });
      setLoading(null);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to subscribe.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    // Validate planId is a valid UUID
    const uuidSchema = z.string().uuid('Invalid plan ID');
    const validation = uuidSchema.safeParse(planId);
    
    if (!validation.success) {
      toast({
        title: 'Error',
        description: 'Invalid plan selection',
        variant: 'destructive',
      });
      return;
    }

    setLoading(planId);
    try {
      const { data, error } = await supabase.functions.invoke('paystack-initialize', {
        body: {
          planId,
          email: user.email,
        },
      });

      if (error) throw error;

      // Redirect to Paystack
      window.location.href = data.authorization_url;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to initialize payment',
        variant: 'destructive',
      });
      setLoading(null);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const features = typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features;
              const isPopular = index === 1;
              
              return (
                <div
                  key={plan.id}
                  className={`rounded-lg shadow-lg p-8 flex flex-col relative ${
                    isPopular ? 'bg-primary text-white' : 'bg-white'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <h3 className={`text-2xl font-bold mb-4 ${isPopular ? '' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${isPopular ? '' : 'text-gray-900'}`}>
                      ₵{(plan.amount / 100).toLocaleString()}
                    </span>
                    <span className={isPopular ? 'text-white/80' : 'text-gray-600'}>
                      /{plan.interval}
                    </span>
                  </div>
                  
                  <p className={`mb-6 ${isPopular ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {index === 0 && (
                      <Button
                        className={`w-full ${
                          isPopular ? 'bg-white text-primary hover:bg-white/90' : ''
                        }`}
                        onClick={() => handleFreeTrial(plan.id)}
                        disabled={loading === `trial-${plan.id}` || loading === plan.id}
                      >
                        {loading === `trial-${plan.id}` ? 'Activating...' : 'Start 1-Month Free Trial'}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      className={`w-full ${
                        isPopular ? 'border-white text-white hover:bg-white/10' : ''
                      }`}
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={loading === plan.id || loading === `trial-${plan.id}`}
                    >
                      {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
                    </Button>
                  </div>
                  
                  <ul className="space-y-4 flex-1">
                    {features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2
                          className={`h-6 w-6 mr-3 flex-shrink-0 ${
                            isPopular ? 'text-white' : 'text-green-500'
                          }`}
                        />
                        <span className={isPopular ? '' : 'text-gray-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
