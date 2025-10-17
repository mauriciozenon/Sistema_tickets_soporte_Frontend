import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};