import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Calculator() {
  const [formData, setFormData] = useState({
    a: '',
    b: '',
    operation: 'add'
  });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/calculations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setHistory(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      }
      console.error('Error fetching history:', err);
    }
  }, [handleLogout]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/calculator',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setResult(response.data);
      await fetchHistory();
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        setError(err.response?.data?.error || 'An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getOperationSymbol = (op) => {
    switch (op) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return op;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold mb-4">Calculator</h2>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={formData.a}
                      onChange={(e) =>
                        setFormData({ ...formData, a: e.target.value })
                      }
                      placeholder="First number"
                      className="px-3 py-2 border rounded-md"
                      required
                    />
                    <input
                      type="number"
                      value={formData.b}
                      onChange={(e) =>
                        setFormData({ ...formData, b: e.target.value })
                      }
                      placeholder="Second number"
                      className="px-3 py-2 border rounded-md"
                      required
                    />
                  </div>

                  <select
                    value={formData.operation}
                    onChange={(e) =>
                      setFormData({ ...formData, operation: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="add">Add (+)</option>
                    <option value="subtract">Subtract (-)</option>
                    <option value="multiply">Multiply (×)</option>
                    <option value="divide">Divide (÷)</option>
                  </select>

                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                  >
                    {isLoading ? 'Calculating...' : 'Calculate'}
                  </button>
                </form>

                {result && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-semibold">Result:</h3>
                    <p className="text-2xl font-bold text-indigo-600">
                      {result.result}
                    </p>
                  </div>
                )}

                {history.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-semibold mb-2">History:</h3>
                    <ul className="space-y-2">
                      {history.map((calc) => (
                        <li key={calc.id} className="text-sm">
                          {calc.a} {getOperationSymbol(calc.operation)} {calc.b} ={' '}
                          {calc.result}
                          <span className="text-gray-500 ml-2">
                            ({new Date(calc.created_at).toLocaleString()})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator; 