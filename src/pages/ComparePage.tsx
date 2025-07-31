import React from 'react';
import { useTranslation } from 'react-i18next';
import { useComparison } from '@/contexts/ComparisonContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

/**
 * Page that compares up to three selected drones.  Displays a
 * comparison table and a multi-series bar chart summarising key
 * numeric specifications.  Users can remove individual drones
 * from the comparison.
 */
const ComparePage: React.FC = () => {
  const { t } = useTranslation();
  const { selected, removeDrone, clearAll } = useComparison();

  if (selected.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <p>{t('app.compareEmpty')}</p>
      </div>
    );
  }

  // Prepare metrics for table and chart
  const metrics = [
    { key: 'topSpeed(km/h)', label: t('app.topSpeed') },
    { key: 'flightTime(min)', label: t('app.flightTime') },
    { key: 'flightDistance(km)', label: t('app.flightDistance') },
    { key: 'altitude(m)', label: t('app.altitude') },
    { key: 'weight', label: t('app.weight') },
    { key: 'price', label: 'Price ($)' },
  ];

  // Build chart data: each metric is an object with values per drone
  const chartData = metrics.map((metric) => {
    const entry: Record<string, any> = { metric: metric.label };
    selected.forEach((drone) => {
      // For price property
      if (metric.key === 'price') {
        entry[drone.id] = drone.price;
      } else if (metric.key === 'weight') {
        entry[drone.id] = parseFloat(String(drone.categories.dimensions.weight));
      } else {
        entry[drone.id] = Number(
          (drone.categories.performance as any)[metric.key] ?? 0
        );
      }
    });
    return entry;
  });

  const colors = ['#2563eb', '#14b8a6', '#f97316'];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('app.compare')}</h2>
        <button
          onClick={clearAll}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
        >
          {t('app.clearFilters')}
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-secondary-light">
            <tr>
              <th className="px-2 py-2 border-b"></th>
              {selected.map((drone) => (
                <th
                  key={drone.id}
                  className="px-2 py-2 border-b text-center relative"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{drone.name}</span>
                    <button
                      onClick={() => removeDrone(drone.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      &times;
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.key} className="odd:bg-white">
                <td className="px-2 py-1 font-medium border-b border-gray-200">
                  {metric.label}
                </td>
                {selected.map((drone) => (
                  <td key={drone.id} className="px-2 py-1 text-center border-b border-gray-200">
                    {(() => {
                      if (metric.key === 'price') return `$${drone.price}`;
                      if (metric.key === 'weight') return drone.categories.dimensions.weight;
                      const value = (drone.categories.performance as any)[metric.key];
                      return value;
                    })()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{t('app.chart')}</h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" interval={0} angle={-30} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              {selected.map((drone, index) => (
                <Bar
                  key={drone.id}
                  dataKey={drone.id}
                  fill={colors[index % colors.length]}
                  name={drone.name}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;