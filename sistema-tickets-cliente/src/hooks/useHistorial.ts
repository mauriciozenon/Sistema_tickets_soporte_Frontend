import { useEffect, useState } from 'react';
import axios from 'axios';

export const useHistorial = (idTicket: number) => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/tickets/${idTicket}/historial`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHistorial(res.data);
      } catch (err) {
        console.error('Error al obtener historial:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [idTicket]);

  return { historial, loading };
};