import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUsuarios';

export const NuevoTicket = () => {
  const { usuario, token } = useUser();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [categoria, setCategoria] = useState('general');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !descripcion) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/api/tickets',
        {
          titulo,
          descripcion,
          prioridad,
          categoria,
          usuarioId: usuario?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/tickets');
    } catch (err) {
      console.error('Error al crear ticket:', err);
      setError('No se pudo crear el ticket');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Nuevo Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} className="w-full border p-2 rounded">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full border p-2 rounded">
          <option value="general">General</option>
          <option value="tecnica">Técnica</option>
          <option value="facturacion">Facturación</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Ticket
        </button>
      </form>
    </div>
  );
};