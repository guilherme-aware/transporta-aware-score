import React, { createContext, useContext, useState, useEffect } from 'react';
import { transportadorasData, Transportadora } from '@/data/transportadoras';

interface AuthContextType {
  loggedInTransportadora: Transportadora | null;
  login: (transportadoraId: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedInTransportadora, setLoggedInTransportadora] = useState<Transportadora | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('loggedInTransportadoraId');
    if (stored) {
      const transportadora = transportadorasData.find(t => t.id === stored);
      if (transportadora) {
        setLoggedInTransportadora(transportadora);
      }
    }
  }, []);

  const login = (transportadoraId: string): boolean => {
    const transportadora = transportadorasData.find(t => t.id === transportadoraId);
    if (transportadora) {
      setLoggedInTransportadora(transportadora);
      localStorage.setItem('loggedInTransportadoraId', transportadoraId);
      return true;
    }
    return false;
  };

  const logout = () => {
    setLoggedInTransportadora(null);
    localStorage.removeItem('loggedInTransportadoraId');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        loggedInTransportadora, 
        login, 
        logout, 
        isAuthenticated: !!loggedInTransportadora 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
