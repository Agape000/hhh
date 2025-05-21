import { useNavigate } from 'react-router-dom';

export default function MenuBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('http://localhost:4444/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    localStorage.removeItem('loggedIn');
    window.location.href = '/'; // full reload
  };

  return (
    <div className="flex items-center justify-between bg-blue-600 text-white px-6 py-3 shadow-md">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <nav className="flex gap-6">
        <button onClick={() => navigate('/CarPage')} className="hover:underline">Car</button>
        <button onClick={() => navigate('/PackagePage')} className="hover:underline">Package</button>
        <button onClick={() => navigate('/ServicePackage')} className="hover:underline">Service Package</button>
        <button onClick={() => navigate('/payments')} className="hover:underline">Payments</button>
        <button onClick={() => navigate('/reports')} className="hover:underline">Reports</button>
        <button onClick={handleLogout} className="hover:underline text-red-300">
          Logout
        </button>
      </nav>
    </div>
  );
}
