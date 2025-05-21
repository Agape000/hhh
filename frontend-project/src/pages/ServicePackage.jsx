import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';

export default function ServicePackagePage() {
  const [servicePackages, setServicePackages] = useState([]);
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    PlateNumber: '',      // This will hold car ID now
    PackageNumber: '',    // This will hold package ID now
    ServiceDate: '',
  });
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServicePackages();
    fetchCars();
    fetchPackages();
  }, []);

  const fetchServicePackages = async () => {
    try {
      const res = await axios.get('http://localhost:4444/api/services');
      setServicePackages(res.data);
    } catch {
      setMessage('Failed to load service packages');
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:4444/api/cars');
      setCars(res.data);
    } catch {
      setMessage('Failed to load cars');
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:4444/api/packages');
      setPackages(res.data);
    } catch {
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
      if (editingId) {
        await axios.put(`http://localhost:4444/api/services/${editingId}`, formData);
        setMessage('Service record updated');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:4444/api/services', formData);
        setMessage('Service record created');
      }
      setFormData({ PlateNumber: '', PackageNumber: '', ServiceDate: '' });
      fetchServicePackages();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to save record');
    }
  };

  const handleEdit = (record) => {
    setFormData({
      PlateNumber: record.PlateNumber,   // This must be car ID
      PackageNumber: record.PackageNumber, // package ID
      ServiceDate: record.ServiceDate ? record.ServiceDate.slice(0, 10) : '',
    });
    setEditingId(record.RecordNumber);
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      await axios.delete(`http://localhost:4444/api/service_packages/${id}`);
      setMessage('Service record deleted');
      fetchServicePackages();
      if (editingId === id) {
        setEditingId(null);
        setFormData({ PlateNumber: '', PackageNumber: '', ServiceDate: '' });
      }
    } catch {
      setMessage('Failed to delete record');
    }
  };

  // Helper functions to get plate number and package name by ID
  const getCarById = (id) => cars.find(car => String(car.id) === String(id));
  const getPackageById = (id) => packages.find(pkg => String(pkg.id) === String(id));

  return (
    <>
      <MenuBar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Service Packages</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Service Record' : 'Add New Service Record'}</h3>

          <label className="block mb-2 font-semibold">Select Car (Plate Number)</label>
          <select
            name="PlateNumber"
            value={formData.PlateNumber}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">-- Select Car --</option>
            {cars.map(car => (
              <option key={car.id} value={car.id}>
                {car.PlateNumber} - {car.DriverName}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Select Package</label>
          <select
            name="PackageNumber"
            value={formData.PackageNumber}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">-- Select Package --</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.PackageName} ({parseFloat(pkg.PackagePrice).toFixed(2)}Rwf)
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Service Date</label>
          <input
            type="date"
            name="ServiceDate"
            value={formData.ServiceDate}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className={`w-full p-2 rounded text-white transition ${
              editingId ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingId ? 'Update Record' : 'Add Record'}
          </button>

          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </form>

        {/* Service Packages Table */}
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Record Number</th>
              <th className="border px-4 py-2">Plate Number</th>
              <th className="border px-4 py-2">Package Name</th>
              <th className="border px-4 py-2">Service Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicePackages.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No records found.</td>
              </tr>
            ) : (
              servicePackages.map(record => {
                const car = getCarById(record.PlateNumber);
                const pkg = getPackageById(record.PackageNumber);
                return (
                  <tr key={record.RecordNumber}>
                    <td className="border px-4 py-2">{record.RecordNumber}</td>
                    <td className="border px-4 py-2">{car ? car.PlateNumber : record.PlateNumber}</td>
                    <td className="border px-4 py-2">{pkg ? pkg.PackageName : record.PackageNumber}</td>
                    <td className="border px-4 py-2">{record.ServiceDate ? record.ServiceDate.slice(0, 10) : ''}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.RecordNumber)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
