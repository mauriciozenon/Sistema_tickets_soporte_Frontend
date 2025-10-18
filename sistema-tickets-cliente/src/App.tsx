import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import Login from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { Tickets } from './pages/TicketsPage'; // ✅
import { NuevoTicket } from './pages/NuevoTicketPage';

<Route
  path="/nuevo-ticket"
  element={
    <ProtectedRoute roles={['cliente']}>
      <Layout>
        <NuevoTicket />
      </Layout>
    </ProtectedRoute>
  }
/>

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['administrador']}>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute roles={['cliente', 'administrador']}>
                <Layout>
                  <Tickets />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;