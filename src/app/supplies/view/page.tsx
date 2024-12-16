// app/supplies/view/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Customer {
  id: number;
  customer_name: string;
}

interface Stock {
  id: number;
  stock_name: string;
}

interface Supply {
  id: number;
  customer: number;
  customer_details?: Customer;
  stock: number;
  stock_details?: Stock;
  supply_date: string;
  total_load: number | string;
  unit: string;
  description?: string;
}

export default function ViewSupplies() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [suppliesResponse, customersResponse, stocksResponse] = await Promise.all([
        fetch('http://localhost:8000/api/supplies/'),
        fetch('http://localhost:8000/api/customers/'),
        fetch('http://localhost:8000/api/stocks/')
      ]);

      const [suppliesData, customersData, stocksData] = await Promise.all([
        suppliesResponse.json(),
        customersResponse.json(),
        stocksResponse.json()
      ]);

      const customersMap = customersData.reduce((acc: { [key: number]: Customer }, customer: Customer) => {
        acc[customer.id] = customer;
        return acc;
      }, {});

      const stocksMap = stocksData.reduce((acc: { [key: number]: Stock }, stock: Stock) => {
        acc[stock.id] = stock;
        return acc;
      }, {});

      const enrichedSupplies = suppliesData.map((supply: Supply) => ({
        ...supply,
        customer_details: customersMap[supply.customer],
        stock_details: stocksMap[supply.stock]
      }));

      setSupplies(enrichedSupplies);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this supply?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/supplies/${id}/`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setSupplies(supplies.filter(supply => supply.id !== id));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatNumber = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numValue) ? '0.00' : numValue.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Supplies</h2>
            <a
              href="/supplies/add"
              className="px-4 py-2 rounded-md bg-white text-green-600 hover:bg-gray-50 transition-colors duration-200"
            >
              Add New Supply
            </a>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
              </div>
            ) : supplies.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No supplies found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Supply Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Load
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supplies.map((supply) => (
                      <tr
                        key={supply.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {supply.customer_details?.customer_name || 'Unknown Customer'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {supply.stock_details?.stock_name || 'Unknown Stock'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(supply.supply_date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatNumber(supply.total_load)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {supply.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {supply.description || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={`/supplies/edit/${supply.id}`}
                            className="text-green-600 hover:text-green-900 mr-4 inline-block"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </a>
                          <button
                            onClick={() => handleDelete(supply.id)}
                            className="text-red-600 hover:text-red-900 inline-block"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}