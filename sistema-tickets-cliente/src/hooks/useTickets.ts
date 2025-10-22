import { useEffect, useState } from 'react';
import axios from 'axios';

export const useTickets = (
  filtros: {
    estado?: string;
    prioridad?: string;
    usuarioId?: number;
    fecha?: string;
  },
  page: number,
  limit: number = 10
) => {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const params = new URLSearchParams();
        if (filtros.estado) params.append('estado', filtros.estado);
        if (filtros.prioridad) params.append('prioridad', filtros.prioridad);
        if (filtros.usuarioId) params.append('usuarioId', filtros.usuarioId.toString());
        if (filtros.fecha) params.append('fecha', filtros.fecha);
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const res = await axios.get(`http://localhost:3000/api/tickets?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setTickets(res.data.tickets);
        setTotal(res.data.total);
      } catch (error) {
        console.error('Error al obtener tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [filtros, page, limit]);

  return { tickets, total, loading };
};
