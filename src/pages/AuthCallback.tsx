
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
        // Check if we have a hash in the URL (OAuth sign-in)
        const hash = window.location.hash;
        const query = window.location.search;
        
        if (hash || query) {
          setMessage('Completing authentication...');
          
          // Process the OAuth callback
          // For newer Supabase versions
          const { data, error } = hash 
            ? await supabase.auth.exchangeCodeForSession(hash)
            : await supabase.auth.getSession();
          
          if (error) {
            throw error;
          }
          
          // Successfully retrieved session from URL
          toast.success('Authentication successful');
          
          // Check for redirect information
          const fromPath = sessionStorage.getItem('authRedirectPath');
          if (fromPath) {
            sessionStorage.removeItem('authRedirectPath');
            navigate(fromPath, { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
          return;
        }
        
        // For non-OAuth auth flows, check if we have a session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
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
      <Spinner size="lg" />
      <p className="mt-4 text-lg text-muted-foreground">{message}</p>
    </div>
  );
};

export default AuthCallback;
