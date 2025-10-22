import { useState } from 'react';
import { useUser } from '../hooks/useUsuarios';
import { useTickets } from '../hooks/useTickets';

export const Tickets = () => {
  const { usuario } = useUser();
  const [estado, setEstado] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [fecha, setFecha] = useState('');
  const [page, setPage] = useState(1);

  const { tickets, total, loading } = useTickets(
    { estado, prioridad, usuarioId: usuario?.id, fecha },
    page
  );

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Listado de Tickets</h2>

      <div className="flex gap-4 mb-4">
        <select value={estado} onChange={(e) => setEstado(e.target.value)} className="border p-2 rounded">
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="trabajando">Trabajando</option>
          <option value="cerrado">Cerrado</option>
        </select>

        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} className="border p-2 rounded">
          <option value="">Todas las prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {loading ? (
        <p>Cargando tickets...</p>
      ) : (
        <>
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Título</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Prioridad</th>
                <th className="p-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket: any) => (
                <tr key={ticket.id} className="border-t">
                  <td className="p-2">{ticket.id}</td>
                  <td className="p-2">{ticket.titulo}</td>
                  <td className="p-2">{ticket.estado}</td>
                  <td className="p-2">{ticket.prioridad}</td>
                  <td className="p-2">{ticket.fecha_creacion}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};