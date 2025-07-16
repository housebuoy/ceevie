'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/sign-in'); // redirect to login
    }
  }, [user, loading, router]);

  if (loading) return <div className="text-white text-center flex items-center justify-center h-screen">
    <ScaleLoader color="#fff" height={40} />
  </div>;

  return <>{children}</>;
}
