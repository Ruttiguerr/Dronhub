import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Drone } from '@/types/drone';
import { useComparison } from '@/contexts/ComparisonContext';

interface DroneCardProps {
  drone: Drone;
}

/**
 * Card component representing a single drone in the list.  Shows a
 * thumbnail, basic specifications and offers actions to view
 * details or add to comparison.  Responsive styles ensure the
 * layout adapts gracefully across screen sizes.
 */
const DroneCard: React.FC<DroneCardProps> = ({ drone }) => {
  const { t } = useTranslation();
  const { addDrone } = useComparison();

  const handleCompare = () => {
    addDrone(drone);
  };

  const { performance, dimensions } = drone.categories;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
      <Link to={`/drone/${drone.id}`} className="block flex-1">
        <img src={drone.image} alt={drone.name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{drone.name}</h3>
          <p className="text-sm text-gray-600">
            {t('app.topSpeed')}: {performance['topSpeed(km/h)']} km/h
          </p>
          <p className="text-sm text-gray-600">
            {t('app.flightTime')}: {performance['flightTime(min)']} min
          </p>
          <p className="text-sm text-gray-600">
            {t('app.weight')}: {dimensions.weight}
          </p>
          <p className="text-sm text-gray-600">
            ${drone.price}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={handleCompare}
          className="w-full bg-secondary text-primary font-semibold py-2 rounded-md hover:bg-secondary-dark transition-colors"
        >
          {t('app.addToCompare')}
        </button>
      </div>
    </div>
  );
};

export default DroneCard;