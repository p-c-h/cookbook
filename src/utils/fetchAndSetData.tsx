export default async function fetchAndSetData<T>(
  url: string,
  stateSetter: React.Dispatch<React.SetStateAction<T>>,
  errorSetter: React.Dispatch<React.SetStateAction<string[]>>,
  language: string
): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        language === "en"
          ? "Network response was not ok"
          : "Odpowiedź nie powiodła się"
      );
    }

    const data: T = await response.json();
    stateSetter(data);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : language === "en"
        ? "Unknown error"
        : "Nieznany błąd";

    errorSetter((prevErrors) => [...prevErrors, message]);
  }
}
