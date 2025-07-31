import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Fallback page for unmatched routes.  Guides the user back
 * to the home page.
 */
const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">404</h2>
      <p className="mb-4">Page not found.</p>
      <Link to="/" className="text-primary underline">
        {t('app.home')}
      </Link>
    </div>
  );
};

export default NotFoundPage;