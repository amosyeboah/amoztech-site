import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Logged in successfully',
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) throw error;

      toast({
        title: 'Check your email',
        description: 'Password reset link has been sent to your email',
      });

      setShowForgotPassword(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send reset email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              {showForgotPassword ? 'Reset your password' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {showForgotPassword ? (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="font-medium text-primary hover:underline"
                >
                  Back to sign in
                </button>
              ) : (
                <>
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-primary hover:underline">
                    Sign up
                  </Link>
                </>
              )}
            </p>
          </div>

          <form 
            className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" 
            onSubmit={showForgotPassword ? handleForgotPassword : handleLogin}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="you@example.com"
                />
              </div>

              {!showForgotPassword && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading 
                ? (showForgotPassword ? 'Sending...' : 'Signing in...') 
                : (showForgotPassword ? 'Send reset link' : 'Sign in')
              }
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
