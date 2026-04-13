
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cream font-sans">
     <Navbar />
      <main className="mx-auto w-full py-20">{children}</main>
    </div>
  );
}
