// app/stocks/view/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: number;
  category_name: string;
}

interface Stock {
  id: number;
  stock_name: string;
  category: number;
  category_details?: Category;
  unit: string;
  description?: string;
}

export default function ViewStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [stocksResponse, categoriesResponse] = await Promise.all([
        fetch('http://localhost:8000/api/stocks/'),
        fetch('http://localhost:8000/api/categories/')
      ]);

      const [stocksData, categoriesData] = await Promise.all([
        stocksResponse.json(),
        categoriesResponse.json()
      ]);

      const categoriesMap = categoriesData.reduce((acc: { [key: number]: Category }, category: Category) => {
        acc[category.id] = category;
        return acc;
      }, {});

      const enrichedStocks = stocksData.map((stock: Stock) => ({
        ...stock,
        category_details: categoriesMap[stock.category]
      }));

      setStocks(enrichedStocks);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this stock?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/stocks/${id}/`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setStocks(stocks.filter(stock => stock.id !== id));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Stocks</h2>
            <a
              href="/stocks/add"
              className="px-4 py-2 rounded-md bg-white text-amber-600 hover:bg-gray-50 transition-colors duration-200"
            >
              Add New Stock
            </a>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
              </div>
            ) : stocks.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No stocks found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
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
                    {stocks.map((stock) => (
                      <tr
                        key={stock.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {stock.stock_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {stock.category_details?.category_name || 'Unknown Category'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {stock.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {stock.description || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={`/stocks/edit/${stock.id}`}
                            className="text-amber-600 hover:text-amber-900 mr-4 inline-block"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </a>
                          <button
                            onClick={() => handleDelete(stock.id)}
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