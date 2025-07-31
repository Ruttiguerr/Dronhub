import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import App from '@/App';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import HomePage from '@/pages/HomePage';
import DroneDetailPage from '@/pages/DroneDetailPage';
import ComparePage from '@/pages/ComparePage';
import NotFoundPage from '@/pages/NotFoundPage';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ComparisonProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}> {/* Root layout wraps pages */}
              <Route index element={<HomePage />} />
              <Route path="drone/:id" element={<DroneDetailPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ComparisonProvider>
    </I18nextProvider>
  </React.StrictMode>
);