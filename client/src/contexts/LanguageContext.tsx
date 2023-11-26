import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext<
  | {
      language: string;
      changeLanguage: (newLanguage: string) => void;
    }
  | undefined
>(undefined);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState("pl");

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
