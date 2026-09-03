'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import { RoleType, OnboardingStatus, UserStatus } from '@kajlagbe/types';

export interface UserProfileData {
  id: string;
  email: string;
  phone?: string | null;
  status: string;
  onboardingStatus: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string[];
  primaryRole: string;
  profile?: {
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    bio?: string | null;
  } | null;
  customerProfile?: any;
  providerProfile?: any;
  businessProfile?: any;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfileData | null;
  role: string;
  onboardingStatus: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; isUnverified?: boolean }>;
  signInWithGoogle: (redirectTo?: string) => Promise<{ success: boolean; error?: string }>;
  sendPhoneOtp: (phone: string) => Promise<{ success: boolean; phone?: string; error?: string }>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<{ success: boolean; error?: string }>;
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (params: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role: RoleType | string;
    metadata?: Record<string, any>;
  }) => Promise<{ success: boolean; error?: string; session?: Session | null }>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  // Fetch or sync user profile with database
  const fetchProfile = React.useCallback(async (authUser: User) => {
    try {
      const meta = authUser.user_metadata || {};
      const fallbackRole = meta.role || RoleType.CUSTOMER;
      const fallbackName = meta.full_name || meta.name || 'ব্যবহারকারী';
      const [firstName, ...lastNameParts] = fallbackName.split(' ');

      // Query database user record
      const { data: dbUser } = await supabase
        .from('users')
        .select(`
          *,
          profile:user_profiles(*),
          customerProfile:customer_profiles(*),
          providerProfile:provider_profiles(*),
          businessProfile:business_profiles(*)
        `)
        .eq('id', authUser.id)
        .maybeSingle();

      if (dbUser) {
        setProfile({
          id: dbUser.id,
          email: dbUser.email,
          phone: dbUser.phone || authUser.phone || meta.phone || null,
          status: dbUser.status || (authUser.email_confirmed_at ? UserStatus.ACTIVE : UserStatus.PENDING_EMAIL_VERIFICATION),
          onboardingStatus: dbUser.onboardingStatus || meta.onboardingStatus || OnboardingStatus.NOT_STARTED,
          isEmailVerified: dbUser.isEmailVerified || !!authUser.email_confirmed_at,
          isPhoneVerified: dbUser.isPhoneVerified || !!authUser.phone_confirmed_at,
          roles: [fallbackRole],
          primaryRole: fallbackRole,
          profile: dbUser.profile ? {
            firstName: dbUser.profile.firstName,
            lastName: dbUser.profile.lastName,
            avatarUrl: dbUser.profile.avatarUrl || meta.avatar_url || null,
            bio: dbUser.profile.bio || null,
          } : {
            firstName: firstName || 'ব্যবহারকারী',
            lastName: lastNameParts.join(' ') || '',
            avatarUrl: meta.avatar_url || null,
          },
          customerProfile: dbUser.customerProfile,
          providerProfile: dbUser.providerProfile,
          businessProfile: dbUser.businessProfile,
        });
      } else {
        // Recovery / Fallback profile provisioning
        const defaultProfile: UserProfileData = {
          id: authUser.id,
          email: authUser.email || '',
          phone: authUser.phone || meta.phone || null,
          status: authUser.email_confirmed_at ? UserStatus.ACTIVE : UserStatus.PENDING_EMAIL_VERIFICATION,
          onboardingStatus: meta.onboardingStatus || OnboardingStatus.NOT_STARTED,
          isEmailVerified: !!authUser.email_confirmed_at,
          isPhoneVerified: !!authUser.phone_confirmed_at,
          roles: [fallbackRole],
          primaryRole: fallbackRole,
          profile: {
            firstName: firstName || 'ব্যবহারকারী',
            lastName: lastNameParts.join(' ') || '',
            avatarUrl: meta.avatar_url || null,
          },
        };

        setProfile(defaultProfile);
      }
    } catch {
      // Fallback
    }
  }, [supabase]);

  React.useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          if (data.session?.user) {
            await fetchProfile(data.session.user);
          }
        }
      } catch {
        // Handled
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        await fetchProfile(newSession.user);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        const isUnverified = error.message.toLowerCase().includes('email not confirmed');
        let errorBangla = error.message;

        if (error.message.includes('Invalid login credentials')) {
          errorBangla = 'ভুল ইমেইল বা পাসওয়ার্ড প্রদান করেছেন';
        } else if (isUnverified) {
          errorBangla = 'আপনার ইমেইল ঠিকানা এখনো ভেরিফাই করা হয়নি। অনুগ্রহ করে ইনবক্স চেক করুন অথবা নতুন কোড রিকোয়েস্ট করুন।';
        }

        return {
          success: false,
          error: errorBangla,
          isUnverified,
        };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'লগইন ব্যর্থ হয়েছে' };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (redirectToUrl?: string) => {
    setIsLoading(true);
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const target = redirectToUrl || '/dashboard';
      const callbackUrl = `${origin}/auth/callback?redirectTo=${encodeURIComponent(target)}`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account consent',
          },
        },
      });

      if (error) {
        let msg = error.message;
        if (error.message.includes('Unsupported provider') || error.message.includes('provider is not enabled')) {
          msg = 'Supabase-এ Google Provider এনাবল করা নেই। Supabase Dashboard -> Authentication -> Providers -> Google এ গিয়ে Google Client ID & Secret সেটিং সম্পন্ন করুন।';
        }
        return { success: false, error: msg };
      }

      if (data?.url && typeof window !== 'undefined') {
        window.location.href = data.url;
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'গুগল লগইন শুরু করা সম্ভব হয়নি' };
    } finally {
      setIsLoading(false);
    }
  };

  const sendPhoneOtp = async (phone: string) => {
    setIsLoading(true);
    try {
      let normalized = phone.replace(/[\s-]/g, '');
      if (!normalized.startsWith('+880')) {
        if (normalized.startsWith('0')) {
          normalized = '+88' + normalized;
        } else if (normalized.startsWith('880')) {
          normalized = '+' + normalized;
        } else {
          normalized = '+880' + normalized;
        }
      }

      const { error } = await supabase.auth.signInWithOtp({
        phone: normalized,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, phone: normalized };
    } catch (err: any) {
      return { success: false, error: err.message || 'OTP পাঠানো সম্ভব হয়নি' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhoneOtp = async (phone: string, token: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: token.trim(),
        type: 'sms',
      });

      if (error) {
        return { success: false, error: 'ভুল বা মেয়াদোত্তীর্ণ OTP কোড প্রদান করেছেন' };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'OTP যাচাইকরণ ব্যর্থ হয়েছে' };
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kajlagbe-sigma.vercel.app';
      const emailRedirectTo = `${origin}/auth/callback?redirectTo=/dashboard`;

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo,
        },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const signUp = async (params: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role: RoleType | string;
    metadata?: Record<string, any>;
  }) => {
    setIsLoading(true);
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kajlagbe-sigma.vercel.app';
      const emailRedirectTo = `${origin}/auth/callback?redirectTo=/dashboard`;

      const { data, error } = await supabase.auth.signUp({
        email: params.email.trim(),
        password: params.password,
        options: {
          emailRedirectTo,
          data: {
            full_name: params.fullName,
            name: params.fullName,
            phone: params.phone || '',
            role: params.role,
            onboardingStatus: OnboardingStatus.NOT_STARTED,
            ...params.metadata,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message.includes('User already registered')
            ? 'এই ইমেইল দিয়ে ইতিপূর্বে একাউন্ট খোলা হয়েছে'
            : error.message,
        };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user);
      }

      return { success: true, session: data.session };
    } catch (err: any) {
      return { success: false, error: err.message || 'নিবন্ধন ব্যর্থ হয়েছে' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      router.push('/login');
    } catch {
      // Ignored
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kajlagbe-sigma.vercel.app';
      const redirectUrl = `${origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'রিকোয়েস্ট ব্যর্থ হয়েছে' };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'পাসওয়ার্ড আপডেট ব্যর্থ হয়েছে' };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  const role = profile?.primaryRole || (user?.user_metadata?.role as string) || RoleType.CUSTOMER;
  const onboardingStatus = profile?.onboardingStatus || (user?.user_metadata?.onboardingStatus as string) || OnboardingStatus.NOT_STARTED;

  const value: AuthContextType = {
    user,
    session,
    profile,
    role,
    onboardingStatus,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signInWithGoogle,
    sendPhoneOtp,
    verifyPhoneOtp,
    resendVerificationEmail,
    signUp,
    signOut,
    requestPasswordReset,
    updatePassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
