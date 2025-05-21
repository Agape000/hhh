import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';

export default function PackagePage() {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    PackageName: '',
    PackageDescription: '',
    PackagePrice: ''
  });
  const [message, setMessage] = useState('');

  // Fetch all packages on mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:4444/api/packages');
      setPackages(res.data);
    } catch (error) {
      setMessage('Failed to load packages');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:4444/api/packages', formData);
      setMessage(res.data.message || 'Package created successfully');
      setFormData({
        PackageName: '',
        PackageDescription: '',
        PackagePrice: ''
      });
      fetchPackages(); // refresh list
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to add package');
    }
  };

  return (
    <>
      <MenuBar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Packages</h2>

        {/* Add Package Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Package</h3>

          <input
            name="PackageName"
            type="text"
            placeholder="Package Name"
            value={formData.PackageName}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />

          <textarea
            name="PackageDescription"
            placeholder="Package Description"
            value={formData.PackageDescription}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            rows={4}
            required
          />

          <input
            name="PackagePrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Package Price"
            value={formData.PackagePrice}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Add Package
          </button>

          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </form>

        {/* Package List */}
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">No packages found.</td>
              </tr>
            ) : (
              packages.map(pkg => (
                <tr key={pkg.id || pkg.PackageName}>
                  <td className="border px-4 py-2">{pkg.PackageName}</td>
                  <td className="border px-4 py-2">{pkg.PackageDescription}</td>
                  <td className="border px-4 py-2">{parseFloat(pkg.PackagePrice).toFixed(2)}Rwf</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
