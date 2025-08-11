import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/SupabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (id) => {
    if (!id) {
      setProfile(null);
      return null;
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error && error.code !== "PGRST116") {
        console.error("Error loading profile:", error);
      }
      setProfile(data ?? null);
      return data ?? null;
    } catch (err) {
      console.error("loadProfile exception:", err);
      setProfile(null);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      const sess = data?.session ?? null;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user?.id) {
        await loadProfile(sess.user.id);
      }
      setLoading(false);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession ?? null);
      const u = newSession?.user ?? null;
      setUser(u);
      if (u?.id) {
        await loadProfile(u.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) 
      throw error;
    // onAuthStateChange listener will populate profile
    return data;
  };

  const signUp = async ({ email, password, role }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }
      },
    });

    if (error) 
      throw error;
    
    const user = data?.user ?? data?.session?.user ?? null;
    setUser(user);
    
    if (user) {
      setProfile({ role: user.user_metadata?.role ?? role });
    }

    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  const upsertProfile = async ({ id, email, full_name, role }) => {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id,
        email,
        full_name,
        role,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    setProfile(data);
    return data;
  };

  const role = profile?.role ?? user?.user_metadata?.role ?? null;

  return (
    <AuthContext.Provider value={{
      session, user, profile, role, loading,
      signIn, signUp, signOut, upsertProfile, supabase
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
