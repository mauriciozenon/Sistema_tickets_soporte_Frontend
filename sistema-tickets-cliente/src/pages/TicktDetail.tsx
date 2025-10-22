import { HistorialTicket } from '../components/HistorialTicket';

export const TicketDetail = ({ id }: { id: number }) => {
  // Mostrar datos del ticket...
  return (
    <div>
      {/* Detalles del ticket */}
      <HistorialTicket idTicket={id} />
    </div>
  );
};