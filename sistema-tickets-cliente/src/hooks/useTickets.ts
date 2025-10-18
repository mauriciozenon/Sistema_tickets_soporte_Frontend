import { useEffect, useState } from 'react';
import axios from 'axios';

export const useTickets = (filtros: {
  estado?: string;
  prioridad?: string;
  usuarioId?: number;
  fecha?: string;
}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const params = new URLSearchParams();
        if (filtros.estado) params.append('estado', filtros.estado);
        if (filtros.prioridad) params.append('prioridad', filtros.prioridad);
        if (filtros.usuarioId) params.append('usuarioId', filtros.usuarioId.toString());
        if (filtros.fecha) params.append('fecha', filtros.fecha);

        const res = await axios.get(`http://localhost:3000/api/tickets?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setTickets(res.data);
      } catch (error) {
        console.error('Error al obtener tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [filtros]);

  return { tickets, loading };
};