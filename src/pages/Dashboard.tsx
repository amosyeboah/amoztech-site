import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  CreditCard, 
  Receipt, 
  Settings, 
  LogOut, 
  Crown, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Subscription {
  id: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  plan_id: string | null;
  created_at: string;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  payment_date: string | null;
  created_at: string;
  paystack_reference: string;
}

interface Plan {
  id: string;
  name: string;
  amount: number;
  interval: string;
  features: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      setUser(session.user);
      await fetchUserData(session.user.id);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    return () => authSubscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    // Fetch subscription
    const { data: subData, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (subError) {
      console.error('Error fetching subscription:', subError);
    } else if (subData) {
      setSubscription(subData);
      
      // Fetch plan details if subscription exists
      if (subData.plan_id) {
        const { data: planData } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('id', subData.plan_id)
          .maybeSingle();
        
        if (planData) {
          const features = typeof planData.features === 'string' 
            ? JSON.parse(planData.features) 
            : planData.features;
          setPlan({ ...planData, features });
        }
      }
    }

    // Fetch payments
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (paymentError) {
      console.error('Error fetching payments:', paymentError);
    } else {
      setPayments(paymentData || []);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/login');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case 'trial':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Clock className="w-3 h-3 mr-1" />Trial</Badge>;
      case 'expired':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Expired</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return `₵${(amount / 100).toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.email?.split('@')[0] || 'User'}!
              </h1>
              <p className="text-muted-foreground">
                Manage your subscription and account settings
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="mt-4 md:mt-0"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                <span className="hidden sm:inline">Billing History</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Subscription Status Card */}
                <Card className="col-span-full lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Crown className="w-5 h-5 text-primary" />
                          Current Subscription
                        </CardTitle>
                        <CardDescription>Your active plan details</CardDescription>
                      </div>
                      {subscription && getStatusBadge(subscription.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {subscription && plan ? (
                      <div className="space-y-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-foreground">{plan.name}</span>
                          <span className="text-muted-foreground">Plan</span>
                        </div>
                        <div className="text-2xl font-semibold text-primary">
                          {formatAmount(plan.amount)}
                          <span className="text-sm font-normal text-muted-foreground">/{plan.interval}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-medium">{formatDate(subscription.start_date)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">End Date</p>
                            <p className="font-medium">{formatDate(subscription.end_date)}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4">No active subscription</p>
                        <Button onClick={() => navigate('/pricing')}>
                          View Plans
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats Card */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-primary" />
                      Payment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Payments</span>
                        <span className="text-2xl font-bold">{payments.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Successful</span>
                        <span className="text-lg font-semibold text-green-600">
                          {payments.filter(p => p.status === 'success').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Pending</span>
                        <span className="text-lg font-semibold text-yellow-600">
                          {payments.filter(p => p.status === 'pending').length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Plan Features */}
                {plan && (
                  <Card className="col-span-full border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Plan Features</CardTitle>
                      <CardDescription>What's included in your {plan.name} plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Billing History Tab */}
            <TabsContent value="billing">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-primary" />
                    Billing History
                  </CardTitle>
                  <CardDescription>View all your past transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  {payments.length > 0 ? (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Reference</th>
                              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((payment) => (
                              <tr key={payment.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                <td className="py-4 px-2">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    {formatDate(payment.payment_date || payment.created_at)}
                                  </div>
                                </td>
                                <td className="py-4 px-2">
                                  <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {payment.paystack_reference.slice(0, 16)}...
                                  </code>
                                </td>
                                <td className="py-4 px-2 font-medium">
                                  {formatAmount(payment.amount)}
                                </td>
                                <td className="py-4 px-2">
                                  {getPaymentStatusBadge(payment.status)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No payment history yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Email Address</label>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Account ID</label>
                      <p className="font-mono text-xs text-muted-foreground">{user?.id}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Member Since</label>
                      <p className="font-medium">{formatDate(user?.created_at)}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Account Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/reset-password')}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/pricing')}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
