import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUsuarios';

type Props = {
  children: JSX.Element;
  roles?: string[]; // opcional: ['administrador']
};

export const ProtectedRoute = ({ children, roles }: Props) => {
  const { usuario, token } = useUser();

  if (!token || !usuario) return <Navigate to="/login" />;
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/unauthorized" />;

  return children;
};