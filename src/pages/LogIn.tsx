import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-lg shadow-lg">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">CyberGuard</h1>
          </Link>
          <h2 className="text-xl font-semibold">Log in to your account</h2>
        </div>

        {!isSupabaseConfigured && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Configuration Needed</AlertTitle>
            <AlertDescription>
              Supabase is not configured. Please add your Supabase URL and Anon Key to the <code>.env</code> file.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              disabled={!isSupabaseConfigured}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={!isSupabaseConfigured}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading || !isSupabaseConfigured}>
            {loading ? 'Logging In...' : 'Log In'}
          </Button>
        </form>
        <p className="text-center text-sm text-foreground/60">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
