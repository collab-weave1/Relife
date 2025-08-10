import { supabase } from "../lib/SupabaseClient";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setRole(data?.session?.user?.user_metadata?.role || "user");
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
      setRole(session?.user?.user_metadata?.role || "user");
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
