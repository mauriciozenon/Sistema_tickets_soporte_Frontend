import { useHistorial } from '../hooks/useHistorial';


export const HistorialTicket = ({ idTicket }: { idTicket: number }) => {
  const { historial, loading } = useHistorial(idTicket);

  if (loading) return <p>Cargando historial...</p>;

  if (historial.length === 0) return <p>No hay cambios registrados para este ticket.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Historial de cambios</h3>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2">Fecha</th>
            <th className="p-2">Campo</th>
            <th className="p-2">Anterior</th>
            <th className="p-2">Nuevo</th>
            <th className="p-2">Comentario</th>
            <th className="p-2">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((h: any) => (
            <tr key={h.id_historial} className="border-t">
              <td className="p-2">{new Date(h.fecha_hora).toLocaleString()}</td>
              <td className="p-2">{h.campo_modificado}</td>
              <td className="p-2">{h.valor_anterior}</td>
              <td className="p-2">{h.valor_nuevo}</td>
              <td className="p-2">{h.comentario}</td>
              <td className="p-2">{h.usuario_nombre || 'Sistema'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};