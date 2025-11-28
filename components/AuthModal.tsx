// ===================================================================================
//   🏷️ PROJECT: QuickLink - Fast & Secure URL Shortener, QR Generator & API
//   👨‍💻 AUTHOR: Deep Dey (Ceo,Dev,Founder)
//   🛡️ Helper: Google Gemini & ChatGPT
//   🌐 WEBSITE: https://qlynk.vercel.app
//   📅 CREATED: 2025
//   🧠 DESCRIPTION:
//       QuickLink is a secure, high-performance web application designed for 
//       shortening URLs, generating QR codes, and providing developers with 
//       easy-to-integrate API services. Built with simplicity, reliability, 
//       and speed in mind by Deep Dey.
//
//   ⚙️ TECHNOLOGY STACK:
//       - HTML, CSS, TypeScript
//       - Node.js / Express (Backend)
//       - Vercel (Deployment)
//       - JSON API Integration
//
//   📩 CONTACT:
//       ✉️ Email: thedeeparise@gmail.com
//       🔗 GitHub: https://github.com/deepdeyiitgn/QuickLink-URL-Shortener
//       🧾 License: All Rights Reserved © 2025 Deep Dey
//       💬 Instagram: https://www.instagram.com/deepdey.official/
//
//   ⚠️ LEGAL NOTICE:
//       This source code is the intellectual property of Deep Dey. 
//       Any unauthorized copying, modification, distribution, or use of 
//       this project in whole or in part without written permission is 
//       strictly prohibited and may result in legal action.
//
// ===================================================================================

// FIX: Removed the Vite client type reference as it was causing a "Cannot find type definition file" error.
// The code already uses `(import.meta as any)` as a workaround for the missing types.
// Imports Start Here
import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { XIcon, LoadingIcon, EyeIcon, EyeSlashIcon, CheckIcon } from './icons/IconComponents';
import { AuthContextType } from '../types';
// Imports End Here

// AuthModal Component Definition Start Here
const AuthModal: React.FC = () => {
  // State and Context Hooks Start Here
  const auth = useContext(AuthContext);
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'signup_success'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const recaptchaWidgetId = useRef<number | null>(null);
  // State and Context Hooks End Here

  // useEffect for Modal Open/Close and Google Sign-In Initialization Start Here
  useEffect(() => {
    if (auth?.isAuthModalOpen) {
      setMode(auth.authModalMode === 'signup' ? 'signup' : 'login');
      setError('');
      setSuccessMessage('');
      setName('');
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setAgree(false);

      if (window.google) {
        window.google.accounts.id.initialize({
          // FIX: Cast `import.meta` to `any` to access `env` because Vite client types are not being loaded correctly.
          client_id: (import.meta as any).env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
        });
        const googleButton = document.getElementById('google-signin-button');
        if (googleButton) {
          window.google.accounts.id.renderButton(googleButton, {
            theme: 'outline',
            size: 'large',
            width: '350',
          });
        }
      }
    }
  }, [auth?.isAuthModalOpen, auth?.authModalMode]);
  // useEffect for Modal Open/Close and Google Sign-In Initialization End Here

  // useEffect for reCAPTCHA Rendering Start Here
  useEffect(() => {
    if (!auth?.isAuthModalOpen) {
      return;
    }

    recaptchaWidgetId.current = null;
    
    const interval = setInterval(() => {
      const recaptchaDiv = document.querySelector('.g-recaptcha');
      if (window.grecaptcha?.render && recaptchaDiv && recaptchaWidgetId.current === null) {
          try {
              const widgetId = window.grecaptcha.render(recaptchaDiv as HTMLElement, {
                // FIX: Cast `import.meta` to `any` to access `env` because Vite client types are not being loaded correctly.
                sitekey: (import.meta as any).env.VITE_RECAPTCHA_SITE_KEY,
              });
              recaptchaWidgetId.current = widgetId;
              clearInterval(interval);
          } catch(e) {
              console.error("reCAPTCHA render error:", e);
              clearInterval(interval);
          }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [auth?.isAuthModalOpen]);
  // useEffect for reCAPTCHA Rendering End Here

  // Null check for Auth Context Start Here
  if (!auth || !auth.isAuthModalOpen) return null;
  // Null check for Auth Context End Here

  const { login, signup, closeAuthModal, sendPasswordResetLink, loginWithGoogle } = auth;

  // handleGoogleSignIn Function Start Here
  const handleGoogleSignIn = async (response: any) => {
    if (!loginWithGoogle) return;
    setIsLoading(true);
    setError('');
    try {
      await loginWithGoogle(response.credential);
      closeAuthModal();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };
  // handleGoogleSignIn Function End Here



// handleSubmit Function Start Here
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    // FIX: Sirf Login aur Signup ke liye reCAPTCHA check karein
    // Forgot password me reCAPTCHA ka box nahi hai, isliye skip karna padega
    let token = '';
    
    if (mode !== 'forgot') {
        token = recaptchaWidgetId.current !== null ? window.grecaptcha.getResponse(recaptchaWidgetId.current) : '';
        
        if (!token) {
          setError('Please complete the reCAPTCHA verification.');
          setIsLoading(false);
          return;
        }
    }

    if (mode === 'signup' && !agree) {
      setError('Please agree to all the terms and policies before continuing.');
      setIsLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const message = await signup(name, email, password, token);
        setSuccessMessage(message);
        setMode('signup_success');
      } else if (mode === 'login') {
        await login(email, password, token);
        closeAuthModal();
      } else if (mode === 'forgot') {
        // Yahan bina token ke request jayegi
        await sendPasswordResetLink(email);
        setSuccessMessage('Password reset link sent! Please check your email.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      // Error aane par captcha reset karein (sirf agar widget exist karta ho)
      if (recaptchaWidgetId.current !== null && mode !== 'forgot') {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }
    } finally {
      setIsLoading(false);
    }
  };
  // handleSubmit Function End Here
  // handleSubmit Function End Here

  // renderContent Function Start Here
  const renderContent = () => {
    // Signup Success View Start Here
    if (mode === 'signup_success') {
      return (
        <div className="text-center">
          <CheckIcon className="h-12 w-12 text-green-400 mx-auto mb-4 animate-check-pop" />
          <h2 className="text-2xl font-bold text-center text-white mb-2">Almost there!</h2>
          <p className="text-center text-gray-300 mb-6">{successMessage}</p>
          <button
            type="button"
            onClick={closeAuthModal}
            className="w-full rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark shadow-[0_0_10px_#00e5ff] hover:bg-brand-primary/80"
          >
            Close
          </button>
        </div>
      );
    }
    // Signup Success View End Here

    // Forgot Password View Start Here
    if (mode === 'forgot') {
      return (
        <>
          <h2 className="text-2xl font-bold text-center text-white mb-2">Reset Password</h2>
          <p className="text-center text-gray-400 mb-6">
            Enter your email to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-forgot" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email-forgot"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/30 rounded-md border-white/20 text-white focus:ring-brand-primary"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            {successMessage && <p className="text-green-400 text-sm text-center">{successMessage}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark shadow-[0_0_10px_#00e5ff] hover:bg-brand-primary/80 disabled:opacity-50 transition-all"
            >
              {isLoading ? <LoadingIcon className="animate-spin h-5 w-5" /> : 'Send Reset Link'}
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-sm text-gray-400 hover:text-brand-primary mt-2"
            >
              Back to Sign In
            </button>
          </form>
        </>
      );
    }
    // Forgot Password View End Here

    // Login/Signup View Start Here
    return (
      <>
        <div className="flex border-b border-white/20 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`w-1/2 py-3 text-lg font-semibold transition-colors ${
              mode === 'login' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-500'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`w-1/2 py-3 text-lg font-semibold transition-colors ${
              mode === 'signup' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div id="google-signin-button" className="mb-4 flex justify-center"></div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">Or</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2">
          {mode === 'signup' ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p className="text-center text-gray-400 mb-6">
          {mode === 'signup'
            ? 'Get 7-day links by creating an account.'
            : 'Sign in to access your benefits.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black/30 rounded-md border-white/20 text-white focus:ring-brand-primary"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/30 rounded-md border-white/20 text-white focus:ring-brand-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/30 rounded-md border-white/20 text-white focus:ring-brand-primary pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div
            className="flex justify-center mb-2"
          >
            <div className="g-recaptcha"></div>
          </div>

          {mode === 'signup' && (
            <div className="flex items-start text-gray-400 text-sm">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mr-2 mt-1 accent-brand-primary cursor-pointer"
                required
              />
              <label htmlFor="agree">
                I agree to the{' '}
                <a href="/legal" target="_blank" className="text-brand-primary hover:underline">Legal</a>,{' '}
                <a href="/terms" target="_blank" className="text-brand-primary hover:underline">Terms</a>,{' '}
                <a href="/privacy" target="_blank" className="text-brand-primary hover:underline">Privacy</a>, and{' '}
                <a href="/cancellation" target="_blank" className="text-brand-primary hover:underline">Cancellation</a>{' '}
                policies.
              </label>
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-sm text-gray-400 hover:text-brand-primary focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark shadow-[0_0_10px_#00e5ff] hover:bg-brand-primary/80 disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <LoadingIcon className="animate-spin h-5 w-5" />
            ) : mode === 'signup' ? (
              'Sign Up'
            ) : (
              'Sign In'
            )}
          </button>

          <p className="text-[11px] text-gray-500 text-center mt-2">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" className="text-brand-primary hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" target="_blank" className="text-brand-primary hover:underline">
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </form>
      </>
    );
    // Login/Signup View End Here
  };
  // renderContent Function End Here

  // Component Render Start Here
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md glass-card rounded-2xl p-8 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeAuthModal} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <XIcon className="h-6 w-6" />
        </button>
        {renderContent()}
      </div>
    </div>
  );
  // Component Render End Here
};
// AuthModal Component Definition End Here

// Default Export Start Here
export default AuthModal;
// Default Export End Here
