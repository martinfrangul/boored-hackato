import "./App.css";
import Filters from "./components/Filters";
import { useState } from "react";

function App() {
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const onGenerateHandler = async () => {
    setError(null);
    setLoading(true);
    setFilteredData([]);

    // SI NO HAY NINGÚN FILTRO ACTIVADO O ESTÁN TODOS LOS FILTROS ACTIVADOS LLAMAR AL ENDPOINT RANDOM

    if (
      Object.values(filters).every((isActive) => !isActive) ||
      Object.values(filters).every((isActive) => isActive)
    ) {
      try {
        const response = await fetch("/api/random");
        if (!response.ok)
          throw new Error("Error en la solicitud: " + response.statusText);
        const data = await response.json();
        setFilteredData([data]);
        return;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    // SI HAY FILTROS ACTIVADOS

    try {
      const activeFilters = Object.keys(filters).filter(
        (filter) => filters[filter]
      );
      const responses = await Promise.all(
        activeFilters.map((filter) =>
          fetch(`/api/filter?type=${filter}`).then((response) => {
            if (!response.ok) {
              throw new Error("Error en la solicitud: " + response.statusText);
            }
            return response.json();
          })
        )
      );

      const combinedData = responses.flat();

      // GENERAR UNA ACIVIDAD RANDOM DEL CONJUNTO DE ACTIVIDADES SELECCIONADAS POR LOS FILTROS

      setFilteredData((prev) => {
        if (combinedData.length > 0) {
          const randomizedData =
            combinedData[Math.floor(Math.random() * combinedData.length)];
          return [randomizedData];
        }
        return prev;
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-96 lg:max-w-screen-lg flex flex-col m-auto justify-start items-center gap-3 h-screen lg:flex-row lg:">
      <div className="flex w-full h-fit lg:w-1/5 justify-start lg:items-start lg:h-full">
        <img src="/logo.png" className="w-32 h-fit p-3" alt="logo-image" />
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:items-center w-full h-5/6">
        <div className="flex flex-col w-full max-h-fit gap-4 lg:h-full items-center lg:w-3/5 lg:justify-center lg:border-r-2 lg:border-dashed lg:border-black">
          <Filters onFiltersChange={onFiltersChange} />
          <div className="flex flex-col h-full lg:h-fit justify-center items-center ">
            <div className="-mb-5 lg:-mb-7 z-10">
              <img
                src="/imageCentral.png"
                className="w-36 lg:w-56"
                alt="motivational-image"
              />
            </div>
            <div className="flex flex-col max-w-60 p-3 lg:w-full bg-[url(./generatorBackground.png)] bg-cover bg-no-repeat bg-center rounded-xl">
              <div className="w-full text-center">
                <h1 className="font-bold font-sans px-10 pt-7">
                  TROBA ALGUNA COSA A FER
                </h1>
              </div>
              <div className="flex justify-center p-5">
                <button
                  onClick={onGenerateHandler}
                  className="btn btn-sm bg-black text-white text-xs px-5"
                >
                  Generar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-1/4 lg:w-2/5 lg:h-full lg:justify-center items-center">
          <div>
            <div className="flex justify-center p-5">
              <h1 className="text-lg font-sans font-bold">Activitat: </h1>
            </div>
            <div>
              <h3 className="text-md text-center min-h-20 px-5 pb-5">
                {loading
                  ? "Cargando..."
                  : error
                    ? error
                    : filteredData.length > 0
                      ? filteredData[0].activity
                      : "No s'han trobat activitats"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
