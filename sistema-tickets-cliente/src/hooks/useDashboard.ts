import { useEffect, useState } from 'react';
import axios from 'axios';

export const useDashboard = () => {
  const [data, setData] = useState({
    porEstado: [],
    porPrioridad: [],
    porFecha: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error('Error al cargar dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { ...data, loading };
};