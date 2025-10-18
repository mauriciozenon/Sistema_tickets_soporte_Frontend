import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUsuarios';

export const Sidebar = () => {
  const { usuario } = useUser();

  const links = usuario?.rol === 'administrador'
    ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/usuarios', label: 'Usuarios' },
        { to: '/tickets', label: 'Tickets' },
      ]
    : [
        { to: '/tickets', label: 'Mis Tickets' },
        { to: '/nuevo-ticket', label: 'Nuevo Ticket' },
      ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 font-bold text-xl border-b">Sistema de Soporte</div>
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};