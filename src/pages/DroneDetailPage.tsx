import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchDroneById, fetchDrones } from '@/services/drones';
import type { Drone } from '@/types/drone';
import { useComparison } from '@/contexts/ComparisonContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

/**
 * Page showing the full specifications of a single drone.  It
 * displays a detailed table with all categories and a chart
 * summarising key numeric metrics.  A button allows the user to
 * choose another model to compare with using a dialog.
 */
const DroneDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { addDrone } = useComparison();
  const [drone, setDrone] = useState<Drone | null>(null);
  const [allDrones, setAllDrones] = useState<Drone[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDroneById(id).then((d) => setDrone(d ?? null));
    }
    fetchDrones().then(setAllDrones);
  }, [id]);

  const handleSelectCompare = (d: Drone) => {
    addDrone(d);
    setModalOpen(false);
  };

  // Prepare chart data for numeric metrics
  const chartData = useMemo(() => {
    if (!drone) return [];
    const p = drone.categories.performance;
    const d = drone.categories.dimensions;
    return [
      { metric: t('app.topSpeed'), value: Number(p['topSpeed(km/h)']) },
      { metric: t('app.flightTime'), value: Number(p['flightTime(min)']) },
      { metric: t('app.flightDistance'), value: Number(p['flightDistance(km)']) },
      { metric: t('app.altitude'), value: Number(p['altitude(m)']) },
      { metric: t('app.weight'), value: parseFloat(String(d.weight)) },
      { metric: 'Price', value: drone.price },
    ];
  }, [drone, t]);

  if (!drone) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <p>{t('app.loading')}</p>
      </div>
    );
  }

  // Helper to map spec keys to translation labels
  const translateLabel = (key: string): string => {
    const mapping: Record<string, string> = {
      'topSpeed(km/h)': t('app.topSpeed'),
      'flightTime(min)': t('app.flightTime'),
      'flightDistance(km)': t('app.flightDistance'),
      'altitude(m)': t('app.altitude'),
      camera: t('app.camera'),
      resolution: t('app.resolution'),
      vtxPower: t('app.vtxPower'),
      cellCount: t('app.cellCount'),
      capacity: t('app.capacity'),
      weight: t('app.weight'),
      takeoffWeight: t('app.takeoffWeight'),
      size: t('app.size'),
      wheelbase: t('app.wheelbase'),
    };
    return mapping[key] || key;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Link to="/" className="text-primary hover:underline">&larr; {t('app.home')}</Link>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/2">
          <img src={drone.image} alt={drone.name} className="w-full rounded-md shadow" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold">{drone.name}</h2>
          <p className="text-xl text-secondary font-semibold">${drone.price}</p>
          {/* Specifications table */}
          {Object.entries(drone.categories).map(([categoryKey, specs]) => (
            <div key={categoryKey}>
              <h3 className="text-lg font-semibold mb-1">{t(`app.${categoryKey}`)}</h3>
              <table className="w-full text-sm border">
                <tbody>
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k}>
                      <td className="px-2 py-1 font-medium border-b border-gray-200 w-1/2">
                        {translateLabel(k)}
                      </td>
                      <td className="px-2 py-1 border-b border-gray-200 w-1/2">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div>
          <h3 className="text-lg font-semibold mb-2">{t('app.chart')}</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
      </div>
      {/* Compare with button and custom modal */}
      <button
        className="bg-secondary text-primary py-2 px-4 rounded-md hover:bg-secondary-dark"
        onClick={() => setModalOpen(true)}
      >
        {t('app.compareWith')}
      </button>
      {modalOpen && (
        <div>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setModalOpen(false)}
          />
          {/* Modal content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg max-w-md w-full z-50 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">{t('app.compareWith')}</h3>
            <ul className="space-y-2">
              {allDrones
                .filter((d) => d.id !== drone.id)
                .map((d) => (
                  <li key={d.id} className="flex items-center justify-between">
                    <span>{d.name}</span>
                    <button
                      onClick={() => handleSelectCompare(d)}
                      className="bg-secondary text-primary px-3 py-1 rounded-md hover:bg-secondary-dark"
                    >
                      {t('app.addToCompare')}
                    </button>
                  </li>
                ))}
            </ul>
            <div className="mt-4 text-right">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                {t('app.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DroneDetailPage;