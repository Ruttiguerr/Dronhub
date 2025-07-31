import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Language selector using a native select element.  Allows the user
 * to change between English and Spanish.  The current language is
 * reflected in the selected option.
 */
const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      value={currentLang}
      onChange={handleChange}
      className="bg-secondary text-primary rounded-md px-2 py-1 text-sm focus:outline-none"
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
    </select>
  );
};

export default LanguageSelector;