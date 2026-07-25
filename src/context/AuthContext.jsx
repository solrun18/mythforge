import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

const AuthContext = createContext(null);

const AVATAR_BUCKET = 'avatars';

async function uploadAvatar(userId, file) {
  const ext = file.name.split('.').pop() || 'png';
  const path = `${userId}/avatar.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, { upsert: true, cacheControl: '3600' });
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
  // Cache-bust so a re-uploaded avatar at the same path shows immediately
  // instead of the browser serving its previously-cached image.
  return `${data.publicUrl}?t=${Date.now()}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  const fetchProfile = useCallback(async (userId) => {
    if (!supabase || !userId) return null;
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) return null;
    return data;
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      setUser(session?.user ?? null);
      if (session?.user) setProfile(await fetchProfile(session.user.id));
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (cancelled) return;
      if (event === 'PASSWORD_RECOVERY') {
        setPasswordRecovery(true);
      }
      setUser(session?.user ?? null);
      if (session?.user) {
        setProfile(await fetchProfile(session.user.id));
      } else {
        setProfile(null);
      }
    });

    return () => {
      cancelled = true;
      listener?.subscription?.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = useCallback(async ({ email, password, fullName, aboutMe, avatarFile }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, about_me: aboutMe || null } },
    });
    if (error) return { error };

    // If there's an active session immediately (email confirmation is
    // off), we can also upload the avatar right away. If confirmation is
    // required there's no session yet — the user can add a photo later
    // from their profile once they've confirmed and logged in.
    if (data.session && avatarFile) {
      try {
        const avatarUrl = await uploadAvatar(data.user.id, avatarFile);
        await supabase.from('profiles').update({ avatar_url: avatarUrl }).eq('id', data.user.id);
      } catch {
        // Avatar upload failing shouldn't block account creation — the
        // account and profile row already exist via the DB trigger.
      }
    }

    return { error: null, needsEmailConfirmation: !data.session };
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const updateProfile = useCallback(async ({ fullName, aboutMe, avatarFile }) => {
    if (!user) return { error: new Error('Not logged in') };
    try {
      const updates = { full_name: fullName, about_me: aboutMe || null, updated_at: new Date().toISOString() };
      if (avatarFile) {
        updates.avatar_url = await uploadAvatar(user.id, avatarFile);
      }
      const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
      if (error) return { error };
      setProfile((prev) => ({ ...prev, ...updates }));
      return { error: null };
    } catch (error) {
      return { error };
    }
  }, [user]);

  const changePassword = useCallback(async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (!error) setPasswordRecovery(false);
    return { error };
  }, []);

  const requestPasswordReset = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    return { error };
  }, []);

  const value = {
    isConfigured: isSupabaseConfigured,
    user,
    profile,
    loading,
    passwordRecovery,
    clearPasswordRecovery: () => setPasswordRecovery(false),
    signUp,
    signIn,
    signOut,
    updateProfile,
    changePassword,
    requestPasswordReset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
