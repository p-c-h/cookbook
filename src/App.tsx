import AddRecipe from "./components/AddRecipe";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <AddRecipe />
    </LanguageProvider>
  );
}

export default App;
