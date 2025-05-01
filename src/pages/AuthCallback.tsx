
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('Processing your authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have a hash or query parameters in the URL (OAuth sign-in)
        const hash = window.location.hash;
        const query = window.location.search;
        
        setMessage('Completing authentication...');
        
        if (hash && hash.includes('access_token')) {
          // Handle the hash-based auth (like GitHub)
          const { data, error } = await supabase.auth.exchangeCodeForSession(hash);
          
          if (error) throw error;
          
          console.log("Auth successful with token exchange", !!data.session);
          toast.success('Authentication successful');
          
          // Check for redirect information
          const fromPath = sessionStorage.getItem('authRedirectPath');
          navigate(fromPath || '/dashboard', { replace: true });
          return;
        }
        
        if (query && query.includes('code=')) {
          // Handle the query-based auth (like Google)
          const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          
          if (error) throw error;
          
          console.log("Auth successful with code exchange", !!data.session);
          toast.success('Authentication successful');
          
          // Check for redirect information
          const fromPath = sessionStorage.getItem('authRedirectPath');
          navigate(fromPath || '/dashboard', { replace: true });
          return;
        }
        
        // For non-OAuth auth flows, check if we have a session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (sessionData?.session) {
          navigate('/dashboard', { replace: true });
        } else {
          // No session found, redirect to auth page
          navigate('/auth', { replace: true });
        }
      } catch (error: any) {
        console.error('Error during auth callback:', error);
        toast.error('Authentication failed', {
          description: error.message || 'Please try again'
        });
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Spinner size="lg" className="text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">{message}</p>
      <p className="text-sm text-muted-foreground mt-2">You will be redirected shortly...</p>
    </div>
  );
};

export default AuthCallback;
