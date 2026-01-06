import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ThreadUser {
  id: string;
  username: string;
}

interface ThreadAuthContextType {
  user: ThreadUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const ThreadAuthContext = createContext<ThreadAuthContextType | undefined>(undefined);

export const ThreadAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ThreadUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          username: session.user.user_metadata?.username || "Anonymous",
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          username: session.user.user_metadata?.username || "Anonymous",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (username: string, password: string) => {
    const email = `${username}@threads.local`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    
    if (error) throw error;
    
    if (data.user) {
      // Create entries in both tables
      await (supabase as any).from("threads_users").insert({
        id: data.user.id,
        username,
        password_hash: "managed_by_auth",
      });
      
      await (supabase as any).from("threads_user_profiles").insert({
        user_id: data.user.id,
        display_name: username,
      });
    }
  };

  const login = async (username: string, password: string) => {
    const email = `${username}@threads.local`;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <ThreadAuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </ThreadAuthContext.Provider>
  );
};

export const useThreadAuth = () => {
  const context = useContext(ThreadAuthContext);
  if (context === undefined) {
    throw new Error("useThreadAuth must be used within a ThreadAuthProvider");
  }
  return context;
};
