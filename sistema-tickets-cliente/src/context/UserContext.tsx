import { createContext, useState, useEffect } from 'react';

export type Usuario = {
  id: number;
  email: string;
  rol: 'cliente' | 'administrador';
};

type UserContextType = {
  usuario: Usuario | null;
  token: string | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUsuario(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (usuario: Usuario, token: string) => {
    setUsuario(usuario);
    setToken(token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};