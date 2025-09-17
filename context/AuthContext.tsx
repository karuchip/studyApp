"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  loginUser: User | null;
  session: Session | null;
  setLoginUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setLoginUser(data.session.user);
        setSession(data.session);
      }
    };

    initAuth();

    // セッション変化を監視して context を更新
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoginUser(session?.user || null);
      setSession(session || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loginUser, session, setLoginUser, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
