import { useUser } from '../hooks/useUsuarios';

export const Header = () => {
  const { usuario, logout } = useUser();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <div className="text-lg font-semibold">Bienvenido, {usuario?.email}</div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </header>
  );
};