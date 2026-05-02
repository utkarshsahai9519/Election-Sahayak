import { useLanguage } from '../context/LanguageContext';

export const useTranslation = () => {
  const { t, language, updateLanguage } = useLanguage();
  return { t, language, updateLanguage };
};
