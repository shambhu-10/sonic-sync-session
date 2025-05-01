
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Spinner } from '@/components/ui/spinner';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        // Redirect to dashboard after successful authentication
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error during auth callback:', error);
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Spinner size="lg" />
      <p className="mt-4 text-lg text-muted-foreground">Completing authentication...</p>
    </div>
  );
};

export default AuthCallback;
