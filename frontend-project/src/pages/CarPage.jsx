import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';

export default function CarPage() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    PlateNumber: '',
    CarType: '',
    CarSize: '',
    DriverName: '',
    PhoneNumber: ''
  });
  const [message, setMessage] = useState('');

  // Fetch all cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:4444/api/cars');
      setCars(res.data);
    } catch (error) {
      setMessage('Failed to load cars');
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
      const res = await axios.post('http://localhost:4444/api/cars', formData);
      setMessage(res.data.message);
      setFormData({
        PlateNumber: '',
        CarType: '',
        CarSize: '',
        DriverName: '',
        PhoneNumber: ''
      });
      fetchCars(); // refresh the list
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to add car');
    }
  };

  return (
    <>
      <MenuBar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Cars</h2>

        {/* Add Car Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Car</h3>

          <input
            name="PlateNumber"
            type="text"
            placeholder="Plate Number"
            value={formData.PlateNumber}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="CarType"
            type="text"
            placeholder="Car Type"
            value={formData.CarType}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="CarSize"
            type="text"
            placeholder="Car Size"
            value={formData.CarSize}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="DriverName"
            type="text"
            placeholder="Driver Name"
            value={formData.DriverName}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="PhoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Add Car
          </button>

          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </form>

        {/* Car List */}
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Plate Number</th>
              <th className="border px-4 py-2">Car Type</th>
              <th className="border px-4 py-2">Car Size</th>
              <th className="border px-4 py-2">Driver Name</th>
              <th className="border px-4 py-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No cars found.</td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car.PlateNumber}>
                  <td className="border px-4 py-2">{car.PlateNumber}</td>
                  <td className="border px-4 py-2">{car.CarType}</td>
                  <td className="border px-4 py-2">{car.CarSize}</td>
                  <td className="border px-4 py-2">{car.DriverName}</td>
                  <td className="border px-4 py-2">{car.PhoneNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
