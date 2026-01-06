import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  avatar_type: 'initials' | 'image' | 'kawaii' | 'emoji';
  avatar_emoji: string | null;
  avatar_kawaii: string | null;
  xp: number;
  papers_solved: number;
  is_public: boolean;
  email: string | null;
  created_at: string;
  updated_at: string;
}

interface DiscussionAuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, email?: string) => Promise<{ username: string; password: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isAuthenticated: boolean;
}

const DiscussionAuthContext = createContext<DiscussionAuthContextType | undefined>(undefined);

export const DiscussionAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!error && data) {
      setProfile(data as UserProfile);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUsernameAvailable = async (username: string): Promise<boolean> => {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username.toLowerCase())
      .maybeSingle();
    
    return !data;
  };

  const signup = async (username: string, password: string, email?: string) => {
    const normalizedUsername = username.toLowerCase().trim();
    
    // Check username availability
    const isAvailable = await checkUsernameAvailable(normalizedUsername);
    if (!isAvailable) {
      throw new Error("Username is already taken");
    }

    // Use a generated email if not provided
    const authEmail = email || `${normalizedUsername}@discussions.local`;
    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signUp({
      email: authEmail,
      password,
      options: {
        data: { username: normalizedUsername },
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error("Signup failed");

    return { username: normalizedUsername, password };
  };

  const login = async (username: string, password: string) => {
    const normalizedUsername = username.toLowerCase().trim();
    const email = `${normalizedUsername}@discussions.local`;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Invalid username or password");
      }
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <DiscussionAuthContext.Provider 
      value={{ 
        user, 
        session, 
        profile, 
        loading, 
        login, 
        signup, 
        logout, 
        refreshProfile,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </DiscussionAuthContext.Provider>
  );
};

export const useDiscussionAuth = () => {
  const context = useContext(DiscussionAuthContext);
  if (context === undefined) {
    throw new Error("useDiscussionAuth must be used within a DiscussionAuthProvider");
  }
  return context;
};
