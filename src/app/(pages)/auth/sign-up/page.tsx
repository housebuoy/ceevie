'use client';
import { useForm} from '@tanstack/react-form';
import { z } from 'zod';
import { MdLockPerson } from 'react-icons/md';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; 
        await axios.post('/api/auth/signup', {
          authId: user.uid,
          name: user.displayName || '',
          email: user.email,
          avatar: user.photoURL || ''
        });
        console.log('Signup successful:', userCredential.user);
        router.push('/dashboard/home');
        toast.success(`Welcome ${userCredential.user.email}!`);        
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Signup error:', error.message);
          toast.error(error.message || 'Failed to create account');
        } else {
          console.error('Signup error:', error);
          toast.error('Failed to create account');
        }
      }
    },
  });


  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
        const user = result.user; 
        await axios.post('/api/auth/signup', {
          authId: user.uid,
          name: user.displayName || '',
          email: user.email,
          avatar: user.photoURL || ''
        });
      router.push('/dashboard/home');
      toast.success(`Welcome ${result.user.displayName}`);      
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  };
  
  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user; 
        await axios.post('/api/auth/signup', {
          authId: user.uid,
          name: user.displayName || '',
          email: user.email,
          avatar: user.photoURL || ''
        });
      router.push('/dashboard/home');
      toast.success(`Welcome ${result.user.displayName}`);      
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="flex flex-col relative w-full items-center justify-center min-h-screen bg-[#00091d] font-poppins">
      <div className="absolute top-0 h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] bg-fixed"></div>
      <div className="w-full max-w-md md:max-w-lg px-10 py-10 md:py-5 border border-gray-800 rounded-xl shadow-2xl bg-[#0d0d0d] backdrop-blur-md">
        <MdLockPerson className="text-4xl text-indigo-400 mb-2 mx-auto" />
        <h2 className="text-center text-xl font-semibold text-indigo-400">
          Create your Ceevie Account
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Sign up with your email and password.
        </p>
        <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-2">
          {/* Display Name Field */}

          <form.Field name="displayName"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, { message: "User name is too short" })
                  .max(100, { message: "User name is too long" })
                  .safeParse(value);

                return result.success
                  ? []
                  : result.error.issues.map((i) => i.message);
              },
            }}
          >
            {(field) => (
              <div className="">
                <label htmlFor={field.name} className="text-sm text-white block font-semibold mb-1">
                  User Name
                </label>
                <input
                  name={field.name}
                  type="text"
                  autoComplete='username'
                  placeholder="John Doe"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white/10 text-white rounded border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-red-400 text-xs mt-1">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="email"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .email({ message: "Enter a valid email" })
                  .safeParse(value);

                return result.success
                  ? []
                  : result.error.issues.map((i) => i.message);
              },
            }}
          >
            {(field) => (
              <div className="">
                <label htmlFor={field.name} className="text-sm text-white block font-semibold mb-1">Email Address</label>
                <input
                  name={field.name}
                  autoComplete="email"
                  type="text"
                  placeholder="you@example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white/10 text-white rounded border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-red-400 text-xs mt-1">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>
          
          {/* Password Field */}
          <form.Field
            name="password"
            validators={{
              onChange: ({ value, fieldApi }) => {
                const passwordValue = fieldApi.form.getFieldValue("password");
                const errors = [];

                if (value.length < 6) {
                  errors.push("Password must be at least 6 characters");
                }

                if (value !== passwordValue) {
                  errors.push("Passwords don't match");
                }

                return errors;
              },
            }}
          >
            {(field) => (
              <div className="relative">
                <label className="text-sm text-white block font-semibold mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="•••••••••"
                  value={field.state.value}
                  autoComplete="new-password"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 pr-10 text-sm bg-white/10 text-white rounded border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-white hover:text-indigo-400 cursor-pointer"
                >
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
                {field.state.meta.errors?.[0] && (
                  <p className="text-red-400 text-xs mt-1">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Confirm Password Field */}
          <form.Field
            name="confirmPassword"
            validators={{
            onChange: ({ value, fieldApi }) => {
              const passwordValue = fieldApi.form.getFieldValue("password");
              const errors = [];

              if (value.length < 6) {
                errors.push("Password must be at least 6 characters");
              }

              if (value !== passwordValue) {
                errors.push("Passwords don't match");
              }

              return errors;
            },
          }}
          >
            {(field) => (
              <div>
                <label className="text-sm text-white block font-semibold mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white/10 text-white rounded border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-red-400 text-xs mt-1">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 cursor-pointer"
          >
            {form.state.isSubmitting ? 'Signing up...' : 'Create Account'}
          </button>
        </form>

        <div className="my-4 text-center text-gray-400 text-sm">or</div>

        <div className="flex flex-row gap-3 items-center justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 py-2 px-12 md:px-16  border border-gray-500 rounded text-white hover:bg-white/10 cursor-pointer"
          >
            <FaGoogle /> Google
          </button>

          <button
            onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-2 py-2 px-12 md:px-16 border border-gray-500 rounded text-white hover:bg-white/10 cursor-pointer"
          >
            <FaGithub /> GitHub
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-gray-400">
          Already have an account?{' '}
          <Link href={'/auth/sign-in'} className="text-indigo-400 underline cursor-pointer">Sign in</Link>
        </p>

        <p className="text-center text-xs text-gray-500 mt-2">Powered by Firebase</p>
      </div>
    </div>
  );
}
