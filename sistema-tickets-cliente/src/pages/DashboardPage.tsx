import { useDashboard } from '../hooks/useDashboard';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const Dashboard = () => {

  const { porEstado, porPrioridad, porFecha, loading } = useDashboard();

  if (loading) return <p>Cargando métricas...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard de Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Tickets por Estado</h3>
          <Pie
            data={{
              labels: porEstado.map((e) => e.estado),
              datasets: [
                {
                  data: porEstado.map((e) => e.cantidad),
                  backgroundColor: ['#f87171', '#60a5fa', '#34d399'],
                },
              ],
            }}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Tickets por Prioridad</h3>
          <Pie
            data={{
              labels: porPrioridad.map((p) => p.prioridad),
              datasets: [
                {
                  data: porPrioridad.map((p) => p.cantidad),
                  backgroundColor: ['#facc15', '#fb923c', '#ef4444'],
                },
              ],
            }}
          />
        </div>

        <div className="col-span-2">
          <h3 className="font-semibold mb-2">Tickets por Día</h3>
          <Bar
            data={{
              labels: porFecha.map((f) => f.fecha),
              datasets: [
                {
                  label: 'Tickets',
                  data: porFecha.map((f) => f.cantidad),
                  backgroundColor: '#3b82f6',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};