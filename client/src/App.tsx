import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

type Language = {
  [key: string]: {
    nativeName: string;
  };
};

const lngs: Language = {
  en: { nativeName: "English" },
  pl: { nativeName: "Polski" },
};

function App() {
  const { i18n } = useTranslation();

  return (
    <div>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
      <h1>{t("loading")}</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
